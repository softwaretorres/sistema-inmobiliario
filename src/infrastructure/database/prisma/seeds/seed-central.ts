/**
 * Seed script for Central Database
 * Creates initial tenants and super admin users
 */

import { PrismaClient as CentralPrismaClient } from '../generated/central';
import * as bcrypt from 'bcrypt';

const prisma = new CentralPrismaClient();

async function main(): Promise<void> {
  console.log('🌱 Seeding central database...');

  // Create demo tenant
  const demoTenant = await prisma.tenant.upsert({
    where: { slug: 'demo-inmobiliaria' },
    update: {},
    create: {
      name: 'Inmobiliaria Demo',
      slug: 'demo-inmobiliaria',
      email: 'admin@demo-inmobiliaria.com',
      phone: '+52 55 1234 5678',
      status: 'ACTIVE',
      databaseName: 'inmobiliaria_tenant_demo',
      databaseHost: process.env.DATABASE_HOST || 'localhost',
      plan: 'PROFESSIONAL',
      maxUsers: 10,
      maxProperties: 200,
      primaryColor: '#1976D2',
      settings: {
        timezone: 'America/Mexico_City',
        currency: 'MXN',
        language: 'es',
        branding: {
          primaryColor: '#1976D2',
          secondaryColor: '#FF9800',
        },
      },
      address: 'Av. Reforma 123, Col. Centro',
      city: 'Ciudad de México',
      state: 'CDMX',
      country: 'MX',
    },
  });

  console.log(`✅ Created demo tenant: ${demoTenant.name}`);

  // Create super admin user (for central management)
  const hashedPassword = await bcrypt.hash('SuperAdmin123!', 12);

  const superAdmin = await prisma.superAdmin.upsert({
    where: { email: 'superadmin@inmobiliaria.com' },
    update: {},
    create: {
      email: 'superadmin@inmobiliaria.com',
      password: hashedPassword,
      firstName: 'Super',
      lastName: 'Admin',
      status: 'ACTIVE',
    },
  });

  console.log(`✅ Created super admin: ${superAdmin.email}`);

  // Create tenant-superadmin association
  await prisma.tenantSuperAdmin.upsert({
    where: {
      tenantId_superAdminId: {
        tenantId: demoTenant.id,
        superAdminId: superAdmin.id,
      },
    },
    update: {},
    create: {
      tenantId: demoTenant.id,
      superAdminId: superAdmin.id,
      role: 'owner',
    },
  });

  console.log('✅ Created tenant-superadmin association');

  console.log('');
  console.log('🎉 Central database seeding completed!');
  console.log('');
  console.log('📋 Summary:');
  console.log(`   - Demo Tenant: ${demoTenant.slug}`);
  console.log(`   - Super Admin: ${superAdmin.email}`);
  console.log('');
  console.log('🔑 Credentials:');
  console.log('   Super Admin: superadmin@inmobiliaria.com / SuperAdmin123!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
