import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { IAuthenticatedUser } from '../auth.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: IAuthenticatedUser = request.user;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    // Check if user has 'manage:all' permission (super permission)
    if (user.role.permissions.includes('manage:all')) {
      return true;
    }

    // Check if user has any of the required permissions
    const hasPermission = requiredPermissions.some((permission) => {
      // Direct permission match
      if (user.role.permissions.includes(permission)) {
        return true;
      }

      // Check for 'manage' wildcard permission
      // If required permission is 'Property:read', check for 'Property:manage'
      const [subject, action] = permission.split(':');
      if (subject && action && user.role.permissions.includes(`${subject}:manage`)) {
        return true;
      }

      return false;
    });

    if (!hasPermission) {
      throw new ForbiddenException(
        `Access denied. Required permissions: ${requiredPermissions.join(', ')}`,
      );
    }

    return true;
  }
}
