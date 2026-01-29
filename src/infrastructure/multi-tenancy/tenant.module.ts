import { Global, Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantContextService } from './tenant-context.service';
import { TenantPrismaService } from './tenant-prisma.service';

@Global()
@Module({
  providers: [TenantService, TenantContextService, TenantPrismaService],
  exports: [TenantService, TenantContextService, TenantPrismaService],
})
export class TenantModule {}
