/**
 * Main seed entry point
 * Coordinates seeding of central and tenant databases
 */

import { execSync } from 'child_process';
import * as path from 'path';

const seedsDir = __dirname;

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const target = args[0] || 'all';

  console.log('🚀 Starting database seeding...');
  console.log('');

  try {
    switch (target) {
      case 'central':
        console.log('📦 Seeding central database only...');
        execSync(`npx ts-node ${path.join(seedsDir, 'seed-central.ts')}`, {
          stdio: 'inherit',
          cwd: process.cwd(),
        });
        break;

      case 'tenant':
        console.log('📦 Seeding tenant database only...');
        execSync(`npx ts-node ${path.join(seedsDir, 'seed-tenant.ts')}`, {
          stdio: 'inherit',
          cwd: process.cwd(),
        });
        break;

      case 'all':
      default:
        console.log('📦 Seeding all databases...');
        console.log('');

        console.log('═══════════════════════════════════════');
        console.log('  CENTRAL DATABASE');
        console.log('═══════════════════════════════════════');
        execSync(`npx ts-node ${path.join(seedsDir, 'seed-central.ts')}`, {
          stdio: 'inherit',
          cwd: process.cwd(),
        });

        console.log('');
        console.log('═══════════════════════════════════════');
        console.log('  TENANT DATABASE (Demo)');
        console.log('═══════════════════════════════════════');
        execSync(`npx ts-node ${path.join(seedsDir, 'seed-tenant.ts')}`, {
          stdio: 'inherit',
          cwd: process.cwd(),
        });
        break;
    }

    console.log('');
    console.log('═══════════════════════════════════════');
    console.log('  ✅ ALL SEEDING COMPLETED SUCCESSFULLY');
    console.log('═══════════════════════════════════════');
    console.log('');
    console.log('Usage:');
    console.log('  npm run prisma:seed           # Seed all databases');
    console.log('  npm run prisma:seed central   # Seed central database only');
    console.log('  npm run prisma:seed tenant    # Seed tenant database only');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

main();
