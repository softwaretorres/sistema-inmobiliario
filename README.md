# Sistema Inmobiliario Multi-tenant

Sistema de gestión inmobiliaria empresarial con arquitectura multi-tenant, desarrollado con NestJS siguiendo Clean Architecture y Domain-Driven Design (DDD).

## Características Principales

- **Multi-tenancy**: Cada inmobiliaria opera como un tenant independiente con su propia base de datos
- **Clean Architecture**: Separación clara de responsabilidades (Domain, Application, Infrastructure, Presentation)
- **Domain-Driven Design**: Entidades ricas, Value Objects, Domain Events
- **RBAC**: Sistema de roles y permisos granular con CASL
- **API REST**: Documentada con OpenAPI/Swagger
- **Testing**: Cobertura con tests unitarios, integración y E2E

## Stack Tecnológico

| Categoría | Tecnología |
|-----------|------------|
| Framework | NestJS 10.x |
| Lenguaje | TypeScript 5.x |
| Base de Datos | PostgreSQL 16 |
| ORM | Prisma 5.x |
| Cache/Queue | Redis + Bull |
| Autenticación | JWT + Passport |
| Autorización | CASL |
| Documentación | Swagger/OpenAPI |
| Testing | Jest + Supertest |
| Contenedores | Docker + Docker Compose |

## Requisitos Previos

- Node.js 20.x o superior
- Docker y Docker Compose
- PostgreSQL 16 (o usar Docker)
- Redis 7 (o usar Docker)

## Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd inmobiliaria
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
```

Editar `.env` con tus valores:

```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=postgres
DATABASE_NAME_PREFIX=inmobiliaria_
CENTRAL_DATABASE_URL=postgresql://postgres:postgres@localhost:5432/inmobiliaria_central

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=your-super-secret-key-change-in-production
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your-refresh-secret-key
JWT_REFRESH_EXPIRES_IN=7d

# Encryption
ENCRYPTION_KEY=32-character-encryption-key-here

# Application
NODE_ENV=development
PORT=3000
API_PREFIX=api
API_VERSION=1
```

### 4. Iniciar servicios con Docker

```bash
# Iniciar PostgreSQL y Redis
docker-compose up -d postgres redis

# Iniciar herramientas de administración (opcional)
docker-compose --profile tools up -d
```

### 5. Generar cliente Prisma y ejecutar migraciones

```bash
# Generar cliente Prisma para ambos schemas
npm run prisma:generate

# Ejecutar migraciones en la base de datos central
npm run prisma:migrate:central

# Para crear la base de datos de un tenant
npm run prisma:migrate:tenant -- --name=tenant_slug
```

### 6. Ejecutar seeders (datos de prueba)

```bash
# Ejecutar todos los seeders
npm run prisma:seed

# O ejecutar por separado
npm run prisma:seed central    # Solo base de datos central
npm run prisma:seed tenant     # Solo base de datos de tenant
```

**Credenciales de prueba creadas:**

| Rol | Email | Password |
|-----|-------|----------|
| Super Admin | superadmin@inmobiliaria.com | SuperAdmin123! |
| Admin Tenant | admin@demo-inmobiliaria.com | Admin123! |
| Agente 1 | agente1@demo-inmobiliaria.com | Agent123! |
| Agente 2 | agente2@demo-inmobiliaria.com | Agent123! |

### 7. Iniciar la aplicación

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

## Scripts Disponibles

```bash
# Desarrollo
npm run start:dev       # Iniciar en modo desarrollo con hot-reload
npm run start:debug     # Iniciar en modo debug

# Build
npm run build           # Compilar para producción

# Testing
npm run test            # Tests unitarios
npm run test:watch      # Tests en modo watch
npm run test:cov        # Tests con cobertura
npm run test:e2e        # Tests E2E
npm run test:integration # Tests de integración

# Linting
npm run lint            # Ejecutar ESLint
npm run lint:fix        # Corregir errores de lint
npm run format          # Formatear código con Prettier

# Prisma
npm run prisma:generate         # Generar cliente Prisma
npm run prisma:generate:central # Generar cliente para BD central
npm run prisma:migrate:dev      # Crear/aplicar migraciones (dev)
npm run prisma:migrate:central  # Migrar BD central
npm run prisma:migrate:deploy   # Aplicar migraciones (prod)
npm run prisma:studio           # Abrir Prisma Studio
npm run prisma:seed             # Ejecutar seeders

# Docker
npm run docker:up      # Iniciar contenedores
npm run docker:down    # Detener contenedores
npm run docker:logs    # Ver logs
```

## Estructura del Proyecto

```
src/
├── config/                     # Configuración centralizada
│   └── configuration.ts
│
├── core/                       # Capa de Dominio
│   └── domain/
│       ├── entities/           # Entidades de dominio
│       ├── value-objects/      # Value Objects
│       ├── events/             # Eventos de dominio
│       └── exceptions/         # Excepciones de dominio
│
├── infrastructure/             # Capa de Infraestructura
│   ├── auth/                   # Autenticación y autorización
│   │   ├── strategies/         # Passport strategies
│   │   ├── guards/             # Auth guards
│   │   └── decorators/         # Custom decorators
│   ├── database/               # Configuración de BD
│   │   └── prisma/             # Schemas y cliente Prisma
│   └── multi-tenancy/          # Sistema multi-tenant
│
├── modules/                    # Feature Modules
│   ├── properties/             # Módulo de Propiedades
│   │   ├── application/        # Capa de aplicación
│   │   │   ├── dto/            # Data Transfer Objects
│   │   │   ├── interfaces/     # Interfaces/Contracts
│   │   │   ├── mappers/        # Entity <-> DTO mappers
│   │   │   └── use-cases/      # Casos de uso
│   │   ├── infrastructure/     # Implementaciones
│   │   │   └── repositories/   # Repositorios Prisma
│   │   ├── presentation/       # Controllers
│   │   └── __tests__/          # Tests del módulo
│   ├── owners/                 # Módulo de Propietarios
│   ├── clients/                # Módulo de Clientes
│   ├── transactions/           # Módulo de Transacciones
│   └── users/                  # Módulo de Usuarios
│
├── presentation/               # Capa de Presentación global
│   ├── controllers/            # Controllers globales
│   ├── filters/                # Exception filters
│   ├── interceptors/           # Interceptors
│   └── middlewares/            # Middlewares
│
├── shared/                     # Utilidades compartidas
│   ├── constants/
│   ├── helpers/
│   └── types/
│
├── app.module.ts               # Módulo principal
└── main.ts                     # Bootstrap
```

## API Documentation

Una vez iniciada la aplicación, la documentación de la API está disponible en:

- **Swagger UI**: http://localhost:3000/api/docs
- **OpenAPI JSON**: http://localhost:3000/api/docs-json

### Headers Requeridos

| Header | Descripción |
|--------|-------------|
| `Authorization` | `Bearer <jwt_token>` |
| `X-Tenant-ID` | Slug del tenant |

### Endpoints Principales

#### Autenticación
- `POST /api/v1/auth/login` - Iniciar sesión
- `POST /api/v1/auth/refresh` - Renovar token
- `POST /api/v1/auth/logout` - Cerrar sesión
- `GET /api/v1/auth/me` - Obtener usuario actual

#### Propiedades
- `GET /api/v1/properties` - Listar propiedades
- `POST /api/v1/properties` - Crear propiedad
- `GET /api/v1/properties/:id` - Obtener propiedad
- `PUT /api/v1/properties/:id` - Actualizar propiedad
- `DELETE /api/v1/properties/:id` - Eliminar propiedad
- `PATCH /api/v1/properties/:id/publish` - Publicar propiedad
- `PATCH /api/v1/properties/:id/unpublish` - Despublicar propiedad

## Multi-tenancy

El sistema utiliza una estrategia de **base de datos por tenant**:

1. **Base de datos central**: Gestiona tenants, super admins y auditoría global
2. **Base de datos por tenant**: Cada inmobiliaria tiene su propia BD aislada

### Crear un nuevo tenant

```typescript
// Vía API (Super Admin)
POST /api/v1/tenants
{
  "name": "Inmobiliaria ABC",
  "slug": "inmobiliaria-abc",
  "plan": "PROFESSIONAL"
}
```

### Acceder a un tenant

Incluir el header `X-Tenant-ID` con el slug del tenant:

```bash
curl -H "X-Tenant-ID: inmobiliaria-abc" \
     -H "Authorization: Bearer <token>" \
     http://localhost:3000/api/v1/properties
```

## Testing

### Tests Unitarios

```bash
npm run test

# Con cobertura
npm run test:cov

# En modo watch
npm run test:watch
```

### Tests de Integración

```bash
npm run test:integration
```

### Tests E2E

```bash
# Asegúrate de tener la BD de testing lista
npm run test:e2e
```

## Docker

### Desarrollo

```bash
# Iniciar todo el stack
docker-compose up -d

# Ver logs
docker-compose logs -f app

# Detener
docker-compose down
```

### Producción

```bash
# Build de la imagen
docker build -t inmobiliaria:latest -f docker/Dockerfile .

# Ejecutar
docker run -p 3000:3000 --env-file .env.production inmobiliaria:latest
```

## Arquitectura

### Clean Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Presentation Layer                       │
│              (Controllers, Middlewares, Filters)             │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Application Layer                        │
│              (Use Cases, DTOs, Mappers, Interfaces)          │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                       Domain Layer                           │
│         (Entities, Value Objects, Domain Events)             │
└─────────────────────────────────────────────────────────────┘
                              ▲
                              │
┌─────────────────────────────┴───────────────────────────────┐
│                   Infrastructure Layer                       │
│        (Repositories, External Services, Database)           │
└─────────────────────────────────────────────────────────────┘
```

### Flujo de una Request

```
Request → Middleware → Guard → Controller → Use Case → Repository → Database
                                    ↓
                              Domain Entity
                                    ↓
                                 Mapper
                                    ↓
Response ← Interceptor ← Controller ← DTO
```

## Patrones Implementados

- **Repository Pattern**: Abstracción de acceso a datos
- **Factory Pattern**: Creación de entidades de dominio
- **Strategy Pattern**: Integraciones externas intercambiables
- **Observer Pattern**: Eventos de dominio
- **Dependency Injection**: Inversión de control con NestJS DI

## Seguridad

- **JWT Authentication**: Tokens de acceso y refresh
- **Password Hashing**: bcrypt con salt rounds configurables
- **Rate Limiting**: Protección contra ataques de fuerza bruta
- **CORS**: Configuración de orígenes permitidos
- **Helmet**: Headers de seguridad HTTP
- **Input Validation**: class-validator con whitelist
- **SQL Injection Protection**: Queries parametrizadas con Prisma

## Contribución

1. Fork el repositorio
2. Crear rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'feat: agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

### Convenciones de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Documentación
- `style:` Formateo, sin cambios de código
- `refactor:` Refactorización
- `test:` Tests
- `chore:` Mantenimiento

## Licencia

Propietario - Todos los derechos reservados

## Soporte

Para soporte técnico, contactar a: soporte@ejemplo.com
