import { Injectable, Logger, ConflictException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '@infrastructure/database/prisma.service';
import { TenantContextService } from './tenant-context.service';
import { execSync } from 'child_process';
import * as path from 'path';

export interface ICreateTenantDto {
  name: string;
  slug: string;
  email?: string;
  phone?: string;
  plan?: 'BASIC' | 'PROFESSIONAL' | 'ENTERPRISE';
}

export interface ITenantDetails {
  id: string;
  name: string;
  slug: string;
  databaseName: string;
  status: string;
  plan: string;
  email?: string;
  phone?: string;
  maxUsers: number;
  maxProperties: number;
  createdAt: Date;
}

@Injectable()
export class TenantService {
  private readonly logger = new Logger(TenantService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly tenantContext: TenantContextService,
  ) {}

  async createTenant(data: ICreateTenantDto): Promise<ITenantDetails> {
    // Check if slug already exists
    const existing = await this.prisma.tenant.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      throw new ConflictException(`Tenant with slug "${data.slug}" already exists`);
    }

    // Generate database name
    const databaseName = `${this.configService.get('database.namePrefix', 'inmobiliaria_tenant_')}${data.slug.replace(/-/g, '_')}`;

    // Create tenant record
    const tenant = await this.prisma.tenant.create({
      data: {
        name: data.name,
        slug: data.slug,
        databaseName,
        databaseHost: this.configService.get('database.host', 'localhost'),
        email: data.email,
        phone: data.phone,
        plan: data.plan || 'BASIC',
        maxUsers: this.getPlanLimits(data.plan || 'BASIC').maxUsers,
        maxProperties: this.getPlanLimits(data.plan || 'BASIC').maxProperties,
      },
    });

    // Create the tenant database
    await this.createTenantDatabase(databaseName);

    // Run migrations on the new database
    await this.runTenantMigrations(tenant.databaseName);

    // Seed initial data (roles, permissions, admin user)
    await this.seedTenantData(tenant);

    this.logger.log(`Tenant created successfully: ${data.slug}`);

    return {
      id: tenant.id,
      name: tenant.name,
      slug: tenant.slug,
      databaseName: tenant.databaseName,
      status: tenant.status,
      plan: tenant.plan,
      email: tenant.email || undefined,
      phone: tenant.phone || undefined,
      maxUsers: tenant.maxUsers,
      maxProperties: tenant.maxProperties,
      createdAt: tenant.createdAt,
    };
  }

  async getTenant(slug: string): Promise<ITenantDetails | null> {
    const tenant = await this.prisma.tenant.findUnique({
      where: { slug },
    });

    if (!tenant) {
      return null;
    }

    return {
      id: tenant.id,
      name: tenant.name,
      slug: tenant.slug,
      databaseName: tenant.databaseName,
      status: tenant.status,
      plan: tenant.plan,
      email: tenant.email || undefined,
      phone: tenant.phone || undefined,
      maxUsers: tenant.maxUsers,
      maxProperties: tenant.maxProperties,
      createdAt: tenant.createdAt,
    };
  }

  async listTenants(params: {
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<{ tenants: ITenantDetails[]; total: number }> {
    const { page = 1, limit = 10, status } = params;
    const skip = (page - 1) * limit;

    const where = status ? { status: status as 'ACTIVE' | 'SUSPENDED' | 'INACTIVE' } : {};

    const [tenants, total] = await Promise.all([
      this.prisma.tenant.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.tenant.count({ where }),
    ]);

    return {
      tenants: tenants.map((t) => ({
        id: t.id,
        name: t.name,
        slug: t.slug,
        databaseName: t.databaseName,
        status: t.status,
        plan: t.plan,
        email: t.email || undefined,
        phone: t.phone || undefined,
        maxUsers: t.maxUsers,
        maxProperties: t.maxProperties,
        createdAt: t.createdAt,
      })),
      total,
    };
  }

  async suspendTenant(slug: string): Promise<void> {
    const tenant = await this.prisma.tenant.findUnique({
      where: { slug },
    });

    if (!tenant) {
      throw new NotFoundException(`Tenant "${slug}" not found`);
    }

    await this.prisma.tenant.update({
      where: { slug },
      data: { status: 'SUSPENDED' },
    });

    // Clear tenant cache
    this.tenantContext.clearCache(slug);

    this.logger.log(`Tenant suspended: ${slug}`);
  }

  async activateTenant(slug: string): Promise<void> {
    const tenant = await this.prisma.tenant.findUnique({
      where: { slug },
    });

    if (!tenant) {
      throw new NotFoundException(`Tenant "${slug}" not found`);
    }

    await this.prisma.tenant.update({
      where: { slug },
      data: { status: 'ACTIVE' },
    });

    // Clear tenant cache
    this.tenantContext.clearCache(slug);

    this.logger.log(`Tenant activated: ${slug}`);
  }

  private getPlanLimits(plan: string): { maxUsers: number; maxProperties: number } {
    const limits: Record<string, { maxUsers: number; maxProperties: number }> = {
      BASIC: { maxUsers: 5, maxProperties: 100 },
      PROFESSIONAL: { maxUsers: 20, maxProperties: 500 },
      ENTERPRISE: { maxUsers: 100, maxProperties: 5000 },
      CUSTOM: { maxUsers: 1000, maxProperties: 50000 },
    };

    return limits[plan] || limits.BASIC;
  }

  private async createTenantDatabase(databaseName: string): Promise<void> {
    const host = this.configService.get('database.host', 'localhost');
    const port = this.configService.get('database.port', 5432);
    const user = this.configService.get('database.user', 'postgres');
    const password = this.configService.get('database.password', 'postgres');

    try {
      // Use psql to create database
      const command = `PGPASSWORD=${password} psql -h ${host} -p ${port} -U ${user} -c "CREATE DATABASE ${databaseName};"`;
      execSync(command, { stdio: 'pipe' });

      // Create extensions
      const extensionsCommand = `PGPASSWORD=${password} psql -h ${host} -p ${port} -U ${user} -d ${databaseName} -c "CREATE EXTENSION IF NOT EXISTS \\"uuid-ossp\\"; CREATE EXTENSION IF NOT EXISTS \\"pg_trgm\\";"`;
      execSync(extensionsCommand, { stdio: 'pipe' });

      this.logger.log(`Database created: ${databaseName}`);
    } catch (error) {
      this.logger.error(`Error creating database ${databaseName}:`, error);
      throw error;
    }
  }

  private async runTenantMigrations(databaseName: string): Promise<void> {
    const host = this.configService.get('database.host', 'localhost');
    const port = this.configService.get('database.port', 5432);
    const user = this.configService.get('database.user', 'postgres');
    const password = this.configService.get('database.password', 'postgres');

    const databaseUrl = `postgresql://${user}:${password}@${host}:${port}/${databaseName}?schema=public`;
    const schemaPath = path.resolve(
      __dirname,
      '../database/prisma/schema.prisma',
    );

    try {
      // Run Prisma migrations
      execSync(`npx prisma migrate deploy --schema=${schemaPath}`, {
        stdio: 'pipe',
        env: {
          ...process.env,
          DATABASE_URL: databaseUrl,
        },
      });

      this.logger.log(`Migrations completed for: ${databaseName}`);
    } catch (error) {
      this.logger.error(`Error running migrations for ${databaseName}:`, error);
      throw error;
    }
  }

  private async seedTenantData(tenant: { id: string; slug: string; databaseName: string }): Promise<void> {
    // This will be implemented to seed initial roles, permissions, and admin user
    // For now, we'll log that seeding is needed
    this.logger.log(`Seeding initial data for tenant: ${tenant.slug}`);
    // TODO: Implement seeding logic
  }
}
