-- Initial database setup for multi-tenancy
-- This script runs when the PostgreSQL container is first created

-- Create central database (already created by POSTGRES_DB env var)
-- Grant privileges

-- Create a template database for new tenants
CREATE DATABASE inmobiliaria_tenant_template;

-- Grant all privileges to postgres user
GRANT ALL PRIVILEGES ON DATABASE inmobiliaria_central TO postgres;
GRANT ALL PRIVILEGES ON DATABASE inmobiliaria_tenant_template TO postgres;

-- Create extension for UUID generation (in each database)
\c inmobiliaria_central
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

\c inmobiliaria_tenant_template
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Log completion
SELECT 'Database initialization completed' AS status;
