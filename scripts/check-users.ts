import { PrismaClient } from '../src/infrastructure/database/prisma/generated/tenant';

async function checkUsers() {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: 'postgresql://postgres:postgres@localhost:5432/inmobiliaria_tenant_demo?schema=public'
      }
    }
  });

  try {
    const users = await prisma.user.findMany({
      include: {
        role: {
          include: {
            permissions: {
              include: {
                permission: true
              }
            }
          }
        }
      }
    });

    console.log('\n=== USERS IN DATABASE ===\n');
    users.forEach((user: any) => {
      console.log(`Email: ${user.email}`);
      console.log(`Name: ${user.firstName} ${user.lastName}`);
      console.log(`Status: ${user.status}`);
      console.log(`Role: ${user.role.name} (${user.role.displayName})`);
      console.log(`Permissions:`);
      user.role.permissions.forEach((rp: any) => {
        console.log(`  - ${rp.permission.subject}:${rp.permission.action}`);
      });
      console.log('---\n');
    });

  } catch (error) {
    console.error('Error querying users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkUsers();
