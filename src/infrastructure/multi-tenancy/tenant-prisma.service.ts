import { Injectable, OnModuleDestroy, Logger, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '../database/prisma/generated/tenant';
import { TenantContextService, ITenant } from './tenant-context.service';

interface IPrismaClientOptions {
  datasources: {
    db: {
      url: string;
    };
  };
  log?: Array<{ emit: string; level: string }>;
}

@Injectable({ scope: Scope.DEFAULT })
export class TenantPrismaService implements OnModuleDestroy {
  private readonly logger = new Logger(TenantPrismaService.name);
  private readonly clients = new Map<string, PrismaClient>();
  private readonly clientLastUsed = new Map<string, number>();
  private readonly maxIdleTime = 30 * 60 * 1000; // 30 minutes
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor(
    private readonly configService: ConfigService,
    private readonly tenantContext: TenantContextService,
  ) {
    // Start cleanup interval
    this.cleanupInterval = setInterval(() => this.cleanupIdleClients(), 60 * 1000);
  }

  async onModuleDestroy(): Promise<void> {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }

    // Disconnect all clients
    const disconnectPromises = Array.from(this.clients.values()).map((client) =>
      client.$disconnect(),
    );
    await Promise.all(disconnectPromises);
    this.clients.clear();
    this.clientLastUsed.clear();
  }

  async getClient(tenant?: ITenant): Promise<PrismaClient> {
    const currentTenant = tenant || this.tenantContext.getTenantOrFail();
    const clientKey = currentTenant.slug;

    // Check if client exists
    let client = this.clients.get(clientKey);

    if (!client) {
      client = await this.createClient(currentTenant);
      this.clients.set(clientKey, client);
    }

    // Update last used timestamp
    this.clientLastUsed.set(clientKey, Date.now());

    return client;
  }

  private async createClient(tenant: ITenant): Promise<PrismaClient> {
    const databaseUrl = this.buildDatabaseUrl(tenant);

    this.logger.log(`Creating Prisma client for tenant: ${tenant.slug}`);

    const options: IPrismaClientOptions = {
      datasources: {
        db: {
          url: databaseUrl,
        },
      },
    };

    if (process.env.NODE_ENV === 'development') {
      options.log = [
        { emit: 'event', level: 'query' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ];
    }

    const client = new PrismaClient(options);

    // Connect the client
    await client.$connect();

    this.logger.log(`Connected to tenant database: ${tenant.databaseName}`);

    return client;
  }

  private buildDatabaseUrl(tenant: ITenant): string {
    const host = tenant.databaseHost || this.configService.get('database.host', 'localhost');
    const port = this.configService.get('database.port', 5432);
    const user = this.configService.get('database.user', 'postgres');
    const password = this.configService.get('database.password', 'postgres');

    return `postgresql://${user}:${password}@${host}:${port}/${tenant.databaseName}?schema=public`;
  }

  private async cleanupIdleClients(): Promise<void> {
    const now = Date.now();

    for (const [clientKey, lastUsed] of this.clientLastUsed.entries()) {
      if (now - lastUsed > this.maxIdleTime) {
        const client = this.clients.get(clientKey);
        if (client) {
          this.logger.log(`Disconnecting idle client: ${clientKey}`);
          try {
            await client.$disconnect();
          } catch (error) {
            this.logger.error(`Error disconnecting client ${clientKey}:`, error);
          }
          this.clients.delete(clientKey);
          this.clientLastUsed.delete(clientKey);
        }
      }
    }
  }

  async disconnectTenant(slug: string): Promise<void> {
    const client = this.clients.get(slug);
    if (client) {
      await client.$disconnect();
      this.clients.delete(slug);
      this.clientLastUsed.delete(slug);
    }
  }

  getActiveConnectionsCount(): number {
    return this.clients.size;
  }
}
