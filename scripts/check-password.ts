import { PrismaClient } from '../src/infrastructure/database/prisma/generated/tenant';
import * as bcrypt from 'bcrypt';

async function checkPassword() {
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: 'postgresql://postgres:postgres@localhost:5432/inmobiliaria_tenant_demo?schema=public'
      }
    }
  });

  try {
    const user = await prisma.user.findUnique({
      where: { email: 'admin@demo-inmobiliaria.com' }
    });

    if (user) {
      console.log('User found:', user.email);
      console.log('Hashed password:', user.password);

      const isMatch = await bcrypt.compare('Admin123!', user.password);
      console.log('\nPassword "Admin123!" matches:', isMatch);

      const isMatch2 = await bcrypt.compare('admin123', user.password);
      console.log('Password "admin123" matches:', isMatch2);
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkPassword();
