import { Injectable, Scope, Logger } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { PrismaService } from '@infrastructure/database/prisma.service';

export interface ITenant {
  id: string;
  name: string;
  slug: string;
  databaseName: string;
  databaseHost: string;
  status: string;
  plan: string;
  settings?: Record<string, unknown>;
}

interface ITenantContext {
  tenant: ITenant;
}

@Injectable({ scope: Scope.DEFAULT })
export class TenantContextService {
  private readonly logger = new Logger(TenantContextService.name);
  private readonly asyncLocalStorage = new AsyncLocalStorage<ITenantContext>();
  private readonly tenantCache = new Map<string, ITenant>();
  private readonly cacheTTL = 5 * 60 * 1000; // 5 minutes
  private readonly cacheTimestamps = new Map<string, number>();

  constructor(private readonly prisma: PrismaService) {}

  async validateTenant(slug: string): Promise<ITenant | null> {
    // Check cache first
    const cached = this.getCachedTenant(slug);
    if (cached) {
      return cached;
    }

    try {
      const tenant = await this.prisma.tenant.findUnique({
        where: { slug },
        select: {
          id: true,
          name: true,
          slug: true,
          databaseName: true,
          databaseHost: true,
          status: true,
          plan: true,
          settings: true,
        },
      });

      if (!tenant || tenant.status !== 'ACTIVE') {
        return null;
      }

      const tenantData: ITenant = {
        id: tenant.id,
        name: tenant.name,
        slug: tenant.slug,
        databaseName: tenant.databaseName,
        databaseHost: tenant.databaseHost,
        status: tenant.status,
        plan: tenant.plan,
        settings: tenant.settings as Record<string, unknown> | undefined,
      };

      // Cache the tenant
      this.cacheTenant(slug, tenantData);

      return tenantData;
    } catch (error) {
      this.logger.error(`Error validating tenant ${slug}:`, error);
      return null;
    }
  }

  setTenant(tenant: ITenant): void {
    const store = this.asyncLocalStorage.getStore();
    if (store) {
      store.tenant = tenant;
    }
  }

  getTenant(): ITenant | null {
    const store = this.asyncLocalStorage.getStore();
    return store?.tenant || null;
  }

  getTenantOrFail(): ITenant {
    const tenant = this.getTenant();
    if (!tenant) {
      throw new Error('Tenant context not set');
    }
    return tenant;
  }

  run<T>(tenant: ITenant, callback: () => T): T {
    return this.asyncLocalStorage.run({ tenant }, callback);
  }

  async runAsync<T>(tenant: ITenant, callback: () => Promise<T>): Promise<T> {
    return this.asyncLocalStorage.run({ tenant }, callback);
  }

  private getCachedTenant(slug: string): ITenant | null {
    const timestamp = this.cacheTimestamps.get(slug);
    if (!timestamp || Date.now() - timestamp > this.cacheTTL) {
      this.tenantCache.delete(slug);
      this.cacheTimestamps.delete(slug);
      return null;
    }
    return this.tenantCache.get(slug) || null;
  }

  private cacheTenant(slug: string, tenant: ITenant): void {
    this.tenantCache.set(slug, tenant);
    this.cacheTimestamps.set(slug, Date.now());
  }

  clearCache(slug?: string): void {
    if (slug) {
      this.tenantCache.delete(slug);
      this.cacheTimestamps.delete(slug);
    } else {
      this.tenantCache.clear();
      this.cacheTimestamps.clear();
    }
  }
}
