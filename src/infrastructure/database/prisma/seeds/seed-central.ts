/**
 * Seed script for Central Database
 * Creates initial tenants and super admin users
 */

import { PrismaClient as CentralPrismaClient } from '../generated/central';
import * as bcrypt from 'bcrypt';

const prisma = new CentralPrismaClient();

async function main(): Promise<void> {
  console.log('🌱 Seeding central database...');

  // Create default subscription plans
  const plans = await Promise.all([
    prisma.subscriptionPlan.upsert({
      where: { code: 'FREE' },
      update: {},
      create: {
        code: 'FREE',
        name: 'Plan Gratuito',
        description: 'Plan básico para comenzar',
        price: 0,
        currency: 'MXN',
        billingCycle: 'MONTHLY',
        features: {
          maxUsers: 2,
          maxProperties: 20,
          maxClients: 50,
          apiAccess: false,
          customBranding: false,
          analyticsBasic: true,
          analyticsAdvanced: false,
          support: 'email',
        },
        limits: {
          users: 2,
          properties: 20,
          clients: 50,
          storage: 500, // MB
        },
        isActive: true,
        sortOrder: 1,
      },
    }),
    prisma.subscriptionPlan.upsert({
      where: { code: 'PROFESSIONAL' },
      update: {},
      create: {
        code: 'PROFESSIONAL',
        name: 'Plan Profesional',
        description: 'Para inmobiliarias en crecimiento',
        price: 999,
        currency: 'MXN',
        billingCycle: 'MONTHLY',
        features: {
          maxUsers: 10,
          maxProperties: 200,
          maxClients: 500,
          apiAccess: true,
          customBranding: true,
          analyticsBasic: true,
          analyticsAdvanced: true,
          support: 'priority',
        },
        limits: {
          users: 10,
          properties: 200,
          clients: 500,
          storage: 5000, // MB
        },
        isActive: true,
        sortOrder: 2,
      },
    }),
    prisma.subscriptionPlan.upsert({
      where: { code: 'ENTERPRISE' },
      update: {},
      create: {
        code: 'ENTERPRISE',
        name: 'Plan Empresarial',
        description: 'Solución completa para grandes inmobiliarias',
        price: 2999,
        currency: 'MXN',
        billingCycle: 'MONTHLY',
        features: {
          maxUsers: -1, // Unlimited
          maxProperties: -1,
          maxClients: -1,
          apiAccess: true,
          customBranding: true,
          analyticsBasic: true,
          analyticsAdvanced: true,
          support: 'dedicated',
          whiteLabel: true,
          multiLocation: true,
        },
        limits: {
          users: -1,
          properties: -1,
          clients: -1,
          storage: 50000, // MB
        },
        isActive: true,
        sortOrder: 3,
      },
    }),
  ]);

  console.log(`✅ Created ${plans.length} subscription plans`);

  // Get professional plan for demo tenant
  const professionalPlan = plans.find((p) => p.code === 'PROFESSIONAL');

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
      planId: professionalPlan?.id,
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
      zipCode: '06000',
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

  // Create tenant admin association
  await prisma.tenantAdmin.upsert({
    where: {
      tenantId_email: {
        tenantId: demoTenant.id,
        email: 'admin@demo-inmobiliaria.com',
      },
    },
    update: {},
    create: {
      tenantId: demoTenant.id,
      email: 'admin@demo-inmobiliaria.com',
      firstName: 'Admin',
      lastName: 'Demo',
      isOwner: true,
    },
  });

  console.log('✅ Created tenant admin association');

  console.log('');
  console.log('🎉 Central database seeding completed!');
  console.log('');
  console.log('📋 Summary:');
  console.log(`   - Subscription Plans: ${plans.length}`);
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
