import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TenantContextService } from '@infrastructure/multi-tenancy/tenant-context.service';

export interface ITenantRequest extends Request {
  tenantId?: string;
  tenantSlug?: string;
}

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  constructor(private readonly tenantContext: TenantContextService) {}

  async use(req: ITenantRequest, res: Response, next: NextFunction): Promise<void> {
    const tenantSlug = req.headers['x-tenant-id'] as string;

    if (!tenantSlug) {
      throw new UnauthorizedException('X-Tenant-ID header is required');
    }

    // Validate tenant exists and is active
    const tenant = await this.tenantContext.validateTenant(tenantSlug);

    if (!tenant) {
      throw new UnauthorizedException('Invalid or inactive tenant');
    }

    // Set tenant in request
    req.tenantId = tenant.id;
    req.tenantSlug = tenant.slug;

    // Run the rest of the request in the tenant context
    this.tenantContext.run(tenant, () => {
      next();
    });
  }
}
