import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';
import { TenantPrismaService } from '@infrastructure/multi-tenancy/tenant-prisma.service';

export interface IAuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    tenantId?: string;
  };
}

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(
    @Inject(TenantPrismaService)
    private readonly prismaService: TenantPrismaService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<IAuthenticatedRequest>();
    const { method, url, body, user, ip, headers } = request;

    // Only audit mutating operations
    if (!['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
      return next.handle();
    }

    // Extract entity info from URL
    const entityInfo = this.extractEntityInfo(url);

    return next.handle().pipe(
      tap({
        next: async (response) => {
          try {
            await this.createAuditLog({
              userId: user?.id,
              action: this.mapMethodToAction(method),
              entity: entityInfo.entity,
              entityId: entityInfo.entityId || (response as Record<string, unknown>)?.id?.toString(),
              oldValues: method === 'PUT' || method === 'PATCH' ? body : null,
              newValues: response,
              ipAddress: ip,
              userAgent: headers['user-agent'],
            });
          } catch (error) {
            // Don't fail the request if audit logging fails
            console.error('Failed to create audit log:', error);
          }
        },
      }),
    );
  }

  private extractEntityInfo(url: string): { entity: string; entityId?: string } {
    // Parse URL like /api/v1/properties/123
    const parts = url.split('/').filter(Boolean);
    const entityIndex = parts.findIndex(
      (p) => !['api', 'v1', 'v2'].includes(p) && !p.match(/^\d+$/),
    );

    return {
      entity: parts[entityIndex] || 'unknown',
      entityId: parts[entityIndex + 1],
    };
  }

  private mapMethodToAction(method: string): string {
    const actionMap: Record<string, string> = {
      POST: 'CREATE',
      PUT: 'UPDATE',
      PATCH: 'UPDATE',
      DELETE: 'DELETE',
    };
    return actionMap[method] || 'UNKNOWN';
  }

  private async createAuditLog(data: {
    userId?: string;
    action: string;
    entity: string;
    entityId?: string;
    oldValues?: unknown;
    newValues?: unknown;
    ipAddress?: string;
    userAgent?: string;
  }): Promise<void> {
    const prisma = await this.prismaService.getClient();
    await prisma.activityLog.create({
      data: {
        userId: data.userId,
        action: data.action,
        entity: data.entity,
        entityId: data.entityId,
        oldValues: data.oldValues ? JSON.parse(JSON.stringify(data.oldValues)) : null,
        newValues: data.newValues ? JSON.parse(JSON.stringify(data.newValues)) : null,
        ipAddress: data.ipAddress,
        userAgent: data.userAgent,
      },
    });
  }
}
