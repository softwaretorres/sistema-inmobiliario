/**
 * Seed script for Tenant Database
 * Creates roles, permissions, and sample data for a tenant
 */

import { PrismaClient } from '../generated/tenant';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Permission definitions
const PERMISSIONS = [
  // Properties
  { action: 'create', subject: 'Property', description: 'Crear propiedades' },
  { action: 'read', subject: 'Property', description: 'Ver propiedades' },
  { action: 'update', subject: 'Property', description: 'Editar propiedades' },
  { action: 'delete', subject: 'Property', description: 'Eliminar propiedades' },
  { action: 'manage', subject: 'Property', description: 'Gestión completa de propiedades' },

  // Owners
  { action: 'create', subject: 'Owner', description: 'Crear propietarios' },
  { action: 'read', subject: 'Owner', description: 'Ver propietarios' },
  { action: 'update', subject: 'Owner', description: 'Editar propietarios' },
  { action: 'delete', subject: 'Owner', description: 'Eliminar propietarios' },
  { action: 'manage', subject: 'Owner', description: 'Gestión completa de propietarios' },

  // Clients
  { action: 'create', subject: 'Client', description: 'Crear clientes' },
  { action: 'read', subject: 'Client', description: 'Ver clientes' },
  { action: 'update', subject: 'Client', description: 'Editar clientes' },
  { action: 'delete', subject: 'Client', description: 'Eliminar clientes' },
  { action: 'manage', subject: 'Client', description: 'Gestión completa de clientes' },

  // Transactions
  { action: 'create', subject: 'Transaction', description: 'Crear transacciones' },
  { action: 'read', subject: 'Transaction', description: 'Ver transacciones' },
  { action: 'update', subject: 'Transaction', description: 'Editar transacciones' },
  { action: 'delete', subject: 'Transaction', description: 'Eliminar transacciones' },
  { action: 'manage', subject: 'Transaction', description: 'Gestión completa de transacciones' },

  // Users
  { action: 'create', subject: 'User', description: 'Crear usuarios' },
  { action: 'read', subject: 'User', description: 'Ver usuarios' },
  { action: 'update', subject: 'User', description: 'Editar usuarios' },
  { action: 'delete', subject: 'User', description: 'Eliminar usuarios' },
  { action: 'manage', subject: 'User', description: 'Gestión completa de usuarios' },

  // Roles
  { action: 'create', subject: 'Role', description: 'Crear roles' },
  { action: 'read', subject: 'Role', description: 'Ver roles' },
  { action: 'update', subject: 'Role', description: 'Editar roles' },
  { action: 'delete', subject: 'Role', description: 'Eliminar roles' },
  { action: 'manage', subject: 'Role', description: 'Gestión completa de roles' },

  // Settings
  { action: 'read', subject: 'Setting', description: 'Ver configuración' },
  { action: 'update', subject: 'Setting', description: 'Editar configuración' },
  { action: 'manage', subject: 'Setting', description: 'Gestión completa de configuración' },

  // Reports
  { action: 'read', subject: 'Report', description: 'Ver reportes' },
  { action: 'export', subject: 'Report', description: 'Exportar reportes' },

  // Audit
  { action: 'read', subject: 'AuditLog', description: 'Ver logs de auditoría' },
];

// Role definitions with their permissions
const ROLES = [
  {
    name: 'admin',
    displayName: 'Administrador',
    description: 'Acceso completo al sistema',
    isSystem: true,
    permissions: ['manage:Property', 'manage:Owner', 'manage:Client', 'manage:Transaction', 'manage:User', 'manage:Role', 'manage:Setting', 'read:Report', 'export:Report', 'read:AuditLog'],
  },
  {
    name: 'manager',
    displayName: 'Gerente',
    description: 'Gestión de operaciones y equipo',
    isSystem: true,
    permissions: ['manage:Property', 'manage:Owner', 'manage:Client', 'manage:Transaction', 'read:User', 'read:Role', 'read:Setting', 'read:Report', 'export:Report'],
  },
  {
    name: 'agent',
    displayName: 'Agente',
    description: 'Gestión de propiedades y clientes asignados',
    isSystem: true,
    permissions: ['create:Property', 'read:Property', 'update:Property', 'create:Owner', 'read:Owner', 'update:Owner', 'create:Client', 'read:Client', 'update:Client', 'create:Transaction', 'read:Transaction', 'update:Transaction', 'read:Report'],
  },
  {
    name: 'assistant',
    displayName: 'Asistente',
    description: 'Soporte administrativo básico',
    isSystem: true,
    permissions: ['read:Property', 'read:Owner', 'read:Client', 'read:Transaction', 'create:Client', 'update:Client'],
  },
];

async function main(): Promise<void> {
  console.log('🌱 Seeding tenant database...');

  // Create permissions
  console.log('Creating permissions...');
  const createdPermissions = await Promise.all(
    PERMISSIONS.map((perm) =>
      prisma.permission.upsert({
        where: {
          action_subject: {
            action: perm.action,
            subject: perm.subject,
          },
        },
        update: { description: perm.description },
        create: perm,
      }),
    ),
  );
  console.log(`✅ Created ${createdPermissions.length} permissions`);

  // Create roles with permissions
  console.log('Creating roles...');
  for (const roleData of ROLES) {
    const role = await prisma.role.upsert({
      where: { name: roleData.name },
      update: {
        displayName: roleData.displayName,
        description: roleData.description,
      },
      create: {
        name: roleData.name,
        displayName: roleData.displayName,
        description: roleData.description,
        isSystem: roleData.isSystem,
      },
    });

    // Assign permissions to role
    for (const permKey of roleData.permissions) {
      const [action, subject] = permKey.split(':');
      const permission = createdPermissions.find(
        (p) => p.action === action && p.subject === subject,
      );

      if (permission) {
        await prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: role.id,
              permissionId: permission.id,
            },
          },
          update: {},
          create: {
            roleId: role.id,
            permissionId: permission.id,
          },
        });
      }
    }

    console.log(`   ✅ Role: ${roleData.displayName}`);
  }

  // Get admin role
  const adminRole = await prisma.role.findUnique({ where: { name: 'admin' } });
  const agentRole = await prisma.role.findUnique({ where: { name: 'agent' } });

  if (!adminRole || !agentRole) {
    throw new Error('Required roles not found');
  }

  // Create admin user
  console.log('Creating users...');
  const adminPassword = await bcrypt.hash('Admin123!', 12);
  const agentPassword = await bcrypt.hash('Agent123!', 12);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@demo-inmobiliaria.com' },
    update: {},
    create: {
      email: 'admin@demo-inmobiliaria.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'Demo',
      phone: '+52 55 1234 5678',
      status: 'ACTIVE',
      roleId: adminRole.id,
    },
  });

  const agent1 = await prisma.user.upsert({
    where: { email: 'agente1@demo-inmobiliaria.com' },
    update: {},
    create: {
      email: 'agente1@demo-inmobiliaria.com',
      password: agentPassword,
      firstName: 'Juan',
      lastName: 'Pérez',
      phone: '+52 55 2345 6789',
      status: 'ACTIVE',
      roleId: agentRole.id,
    },
  });

  const agent2 = await prisma.user.upsert({
    where: { email: 'agente2@demo-inmobiliaria.com' },
    update: {},
    create: {
      email: 'agente2@demo-inmobiliaria.com',
      password: agentPassword,
      firstName: 'María',
      lastName: 'García',
      phone: '+52 55 3456 7890',
      status: 'ACTIVE',
      roleId: agentRole.id,
    },
  });

  console.log(`✅ Created ${3} users`);

  // Create sample owners
  console.log('Creating sample owners...');
  const owner1 = await prisma.owner.upsert({
    where: { id: '11111111-1111-1111-1111-111111111111' },
    update: {},
    create: {
      id: '11111111-1111-1111-1111-111111111111',
      type: 'INDIVIDUAL',
      firstName: 'Carlos',
      lastName: 'Rodríguez',
      email: 'carlos.rodriguez@email.com',
      phone: '+52 55 4567 8901',
      city: 'Ciudad de México',
      state: 'CDMX',
      country: 'MX',
    },
  });

  const owner2 = await prisma.owner.upsert({
    where: { id: '22222222-2222-2222-2222-222222222222' },
    update: {},
    create: {
      id: '22222222-2222-2222-2222-222222222222',
      type: 'COMPANY',
      companyName: 'Desarrollos Inmobiliarios SA',
      legalName: 'Desarrollos Inmobiliarios SA de CV',
      taxId: 'DIM201234ABC',
      email: 'contacto@desarrollos.com',
      phone: '+52 55 5678 9012',
      city: 'Ciudad de México',
      state: 'CDMX',
      country: 'MX',
    },
  });

  console.log(`✅ Created 2 sample owners`);

  // Create sample properties
  console.log('Creating sample properties...');
  await prisma.property.upsert({
    where: { code: 'PROP-2024-0001' },
    update: {},
    create: {
      code: 'PROP-2024-0001',
      title: 'Casa en Polanco con jardín',
      description: 'Hermosa casa de 3 niveles con acabados de lujo, jardín amplio y alberca.',
      type: 'HOUSE',
      status: 'AVAILABLE',
      operationType: 'SALE',
      salePrice: 12500000,
      currency: 'MXN',
      address: 'Av. Presidente Masaryk 456',
      neighborhood: 'Polanco',
      city: 'Ciudad de México',
      state: 'CDMX',
      country: 'MX',
      zipCode: '11560',
      bedrooms: 4,
      bathrooms: 3.5,
      parkingSpaces: 3,
      totalArea: 450,
      builtArea: 350,
      lotArea: 450,
      yearBuilt: 2018,
      amenities: { pool: true, garden: true, gym: false, security: true },
      features: { airConditioning: true, heating: true, fireplace: true },
      ownerId: owner1.id,
      agentId: agent1.id,
      slug: 'casa-polanco-jardin',
    },
  });

  await prisma.property.upsert({
    where: { code: 'PROP-2024-0002' },
    update: {},
    create: {
      code: 'PROP-2024-0002',
      title: 'Departamento en Santa Fe',
      description: 'Moderno departamento con vista panorámica en torre de lujo.',
      type: 'APARTMENT',
      status: 'AVAILABLE',
      operationType: 'BOTH',
      salePrice: 6800000,
      rentPrice: 35000,
      currency: 'MXN',
      address: 'Av. Santa Fe 123',
      neighborhood: 'Santa Fe',
      city: 'Ciudad de México',
      state: 'CDMX',
      country: 'MX',
      zipCode: '01210',
      bedrooms: 2,
      bathrooms: 2,
      parkingSpaces: 2,
      totalArea: 120,
      builtArea: 120,
      yearBuilt: 2022,
      amenities: { gym: true, pool: true, rooftop: true, businessCenter: true },
      features: { airConditioning: true, floorToWindowCeiling: true },
      ownerId: owner2.id,
      agentId: agent2.id,
      slug: 'departamento-santa-fe',
    },
  });

  await prisma.property.upsert({
    where: { code: 'PROP-2024-0003' },
    update: {},
    create: {
      code: 'PROP-2024-0003',
      title: 'Oficina en Reforma',
      description: 'Oficina corporativa en edificio AAA sobre Paseo de la Reforma.',
      type: 'OFFICE',
      status: 'AVAILABLE',
      operationType: 'RENT',
      rentPrice: 85000,
      currency: 'MXN',
      address: 'Paseo de la Reforma 505',
      neighborhood: 'Cuauhtémoc',
      city: 'Ciudad de México',
      state: 'CDMX',
      country: 'MX',
      zipCode: '06500',
      parkingSpaces: 5,
      totalArea: 200,
      builtArea: 200,
      floors: 1,
      amenities: { lobby: true, security: true, cafeteria: true },
      features: { airConditioning: true, raisedFloor: true, fiberOptic: true },
      ownerId: owner2.id,
      agentId: agent1.id,
      slug: 'oficina-reforma',
    },
  });

  console.log(`✅ Created 3 sample properties`);

  // Create sample clients
  console.log('Creating sample clients...');
  await prisma.client.upsert({
    where: { id: '33333333-3333-3333-3333-333333333333' },
    update: {},
    create: {
      id: '33333333-3333-3333-3333-333333333333',
      firstName: 'Ana',
      lastName: 'Martínez',
      email: 'ana.martinez@email.com',
      phone: '+52 55 6789 0123',
      source: 'website',
      status: 'QUALIFIED',
      budget: 8000000,
      preferences: {
        type: ['HOUSE', 'APARTMENT'],
        locations: ['Polanco', 'Santa Fe', 'Condesa'],
        minBedrooms: 2,
        features: ['garden', 'parking'],
      },
      assignedToId: agent1.id,
    },
  });

  await prisma.client.upsert({
    where: { id: '44444444-4444-4444-4444-444444444444' },
    update: {},
    create: {
      id: '44444444-4444-4444-4444-444444444444',
      firstName: 'Roberto',
      lastName: 'Sánchez',
      email: 'roberto.sanchez@empresa.com',
      phone: '+52 55 7890 1234',
      source: 'referral',
      sourceDetail: 'Referido por Carlos Rodríguez',
      status: 'SHOWING',
      budget: 100000,
      preferences: {
        type: ['OFFICE'],
        locations: ['Reforma', 'Polanco', 'Santa Fe'],
        minArea: 150,
        features: ['parking', 'security'],
      },
      assignedToId: agent2.id,
      notes: 'Busca oficina para empresa de tecnología, 15-20 empleados.',
    },
  });

  console.log(`✅ Created 2 sample clients`);

  // Create default settings
  console.log('Creating default settings...');
  const defaultSettings = [
    {
      key: 'company.name',
      value: '"Inmobiliaria Demo"',
      group: 'general',
    },
    {
      key: 'company.currency',
      value: '"MXN"',
      group: 'general',
    },
    {
      key: 'company.timezone',
      value: '"America/Mexico_City"',
      group: 'general',
    },
    {
      key: 'notifications.email.enabled',
      value: 'true',
      group: 'notifications',
    },
    {
      key: 'notifications.email.newLead',
      value: 'true',
      group: 'notifications',
    },
    {
      key: 'notifications.email.newTransaction',
      value: 'true',
      group: 'notifications',
    },
    {
      key: 'commission.default.sale',
      value: '5',
      group: 'transactions',
    },
    {
      key: 'commission.default.rent',
      value: '100',
      group: 'transactions',
    },
  ];

  for (const setting of defaultSettings) {
    await prisma.setting.upsert({
      where: { key: setting.key },
      update: { value: JSON.parse(setting.value) },
      create: {
        key: setting.key,
        value: JSON.parse(setting.value),
        group: setting.group,
      },
    });
  }

  console.log(`✅ Created ${defaultSettings.length} default settings`);

  console.log('');
  console.log('🎉 Tenant database seeding completed!');
  console.log('');
  console.log('📋 Summary:');
  console.log(`   - Permissions: ${createdPermissions.length}`);
  console.log(`   - Roles: ${ROLES.length}`);
  console.log(`   - Users: 3`);
  console.log(`   - Owners: 2`);
  console.log(`   - Properties: 3`);
  console.log(`   - Clients: 2`);
  console.log(`   - Settings: ${defaultSettings.length}`);
  console.log('');
  console.log('🔑 Credentials:');
  console.log('   Admin: admin@demo-inmobiliaria.com / Admin123!');
  console.log('   Agent 1: agente1@demo-inmobiliaria.com / Agent123!');
  console.log('   Agent 2: agente2@demo-inmobiliaria.com / Agent123!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
