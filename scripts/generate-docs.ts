/**
 * Script para generar documentación del proyecto en formato Word
 * Ejecutar con: npx ts-node scripts/generate-docs.ts
 */

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  TableOfContents,
  StyleLevel,
  PageBreak,
  ImageRun,
} from 'docx';
import * as fs from 'fs';
import * as path from 'path';

// Estilos de colores
const COLORS = {
  primary: '1976D2',
  secondary: 'FF9800',
  text: '333333',
  lightGray: 'F5F5F5',
  border: 'DDDDDD',
};

// Función para crear título de sección
function createHeading(text: string, level: (typeof HeadingLevel)[keyof typeof HeadingLevel]): Paragraph {
  return new Paragraph({
    text,
    heading: level,
    spacing: { before: 400, after: 200 },
  });
}

// Función para crear párrafo normal
function createParagraph(text: string, options?: { bold?: boolean; italic?: boolean }): Paragraph {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        bold: options?.bold,
        italics: options?.italic,
        size: 24,
      }),
    ],
    spacing: { after: 200 },
  });
}

// Función para crear lista con viñetas
function createBulletList(items: string[]): Paragraph[] {
  return items.map(
    (item) =>
      new Paragraph({
        children: [new TextRun({ text: item, size: 24 })],
        bullet: { level: 0 },
        spacing: { after: 100 },
      }),
  );
}

// Función para crear tabla
function createTable(headers: string[], rows: string[][]): Table {
  const headerCells = headers.map(
    (header) =>
      new TableCell({
        children: [
          new Paragraph({
            children: [new TextRun({ text: header, bold: true, size: 22, color: 'FFFFFF' })],
            alignment: AlignmentType.CENTER,
          }),
        ],
        shading: { fill: COLORS.primary },
      }),
  );

  const dataRows = rows.map(
    (row, rowIndex) =>
      new TableRow({
        children: row.map(
          (cell) =>
            new TableCell({
              children: [
                new Paragraph({
                  children: [new TextRun({ text: cell, size: 22 })],
                }),
              ],
              shading: { fill: rowIndex % 2 === 0 ? 'FFFFFF' : COLORS.lightGray },
            }),
        ),
      }),
  );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [new TableRow({ children: headerCells }), ...dataRows],
  });
}

// Función para crear bloque de código
function createCodeBlock(code: string): Paragraph[] {
  const lines = code.split('\n');
  return lines.map(
    (line) =>
      new Paragraph({
        children: [
          new TextRun({
            text: line || ' ',
            font: 'Consolas',
            size: 20,
          }),
        ],
        shading: { fill: 'F8F8F8' },
        spacing: { after: 0 },
      }),
  );
}

async function generateDocument(): Promise<void> {
  console.log('📄 Generando documentación del proyecto...');

  const doc = new Document({
    creator: 'Sistema Inmobiliario',
    title: 'Documentación de Arquitectura - Sistema Inmobiliario Multi-tenant',
    description: 'Documentación técnica completa del sistema inmobiliario',
    styles: {
      default: {
        document: {
          run: {
            font: 'Calibri',
            size: 24,
          },
        },
        heading1: {
          run: {
            font: 'Calibri',
            size: 36,
            bold: true,
            color: COLORS.primary,
          },
          paragraph: {
            spacing: { before: 400, after: 200 },
          },
        },
        heading2: {
          run: {
            font: 'Calibri',
            size: 32,
            bold: true,
            color: COLORS.primary,
          },
          paragraph: {
            spacing: { before: 300, after: 150 },
          },
        },
        heading3: {
          run: {
            font: 'Calibri',
            size: 28,
            bold: true,
            color: COLORS.text,
          },
          paragraph: {
            spacing: { before: 200, after: 100 },
          },
        },
      },
    },
    sections: [
      {
        properties: {},
        children: [
          // ==========================================
          // PORTADA
          // ==========================================
          new Paragraph({
            children: [new TextRun({ text: '' })],
            spacing: { after: 2000 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'SISTEMA INMOBILIARIO',
                bold: true,
                size: 72,
                color: COLORS.primary,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'MULTI-TENANT',
                bold: true,
                size: 56,
                color: COLORS.secondary,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Documentación de Arquitectura',
                size: 36,
                color: COLORS.text,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 2000 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Versión 1.0',
                size: 28,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: new Date().toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                }),
                size: 28,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 1000 },
          }),
          new Paragraph({
            children: [new PageBreak()],
          }),

          // ==========================================
          // TABLA DE CONTENIDOS
          // ==========================================
          createHeading('Tabla de Contenidos', HeadingLevel.HEADING_1),
          new TableOfContents('Contenido', {
            hyperlink: true,
            headingStyleRange: '1-3',
          }),
          new Paragraph({
            children: [new PageBreak()],
          }),

          // ==========================================
          // 1. INTRODUCCIÓN
          // ==========================================
          createHeading('1. Introducción', HeadingLevel.HEADING_1),

          createHeading('1.1 Propósito del Documento', HeadingLevel.HEADING_2),
          createParagraph(
            'Este documento describe la arquitectura técnica del Sistema Inmobiliario Multi-tenant, una plataforma empresarial diseñada para gestionar operaciones de múltiples agencias inmobiliarias de manera independiente y segura.',
          ),

          createHeading('1.2 Alcance', HeadingLevel.HEADING_2),
          createParagraph('El sistema proporciona las siguientes capacidades principales:'),
          ...createBulletList([
            'Gestión completa de propiedades inmobiliarias (venta y renta)',
            'Administración de propietarios y clientes',
            'Seguimiento de transacciones comerciales',
            'Sistema de roles y permisos granular',
            'Aislamiento completo de datos entre inmobiliarias (tenants)',
            'API REST documentada para integraciones',
          ]),

          createHeading('1.3 Audiencia', HeadingLevel.HEADING_2),
          createParagraph('Este documento está dirigido a:'),
          ...createBulletList([
            'Arquitectos de software',
            'Desarrolladores backend y frontend',
            'DevOps e ingenieros de infraestructura',
            'Líderes técnicos y gerentes de proyecto',
            'Auditores de seguridad',
          ]),

          new Paragraph({ children: [new PageBreak()] }),

          // ==========================================
          // 2. VISIÓN GENERAL DE LA ARQUITECTURA
          // ==========================================
          createHeading('2. Visión General de la Arquitectura', HeadingLevel.HEADING_1),

          createHeading('2.1 Principios Arquitectónicos', HeadingLevel.HEADING_2),
          createParagraph(
            'La arquitectura del sistema se basa en los siguientes principios fundamentales:',
          ),

          createHeading('2.1.1 Clean Architecture', HeadingLevel.HEADING_3),
          createParagraph(
            'Implementamos Clean Architecture para mantener una separación clara de responsabilidades y facilitar el testing y mantenimiento del código. Las capas están organizadas de la siguiente manera:',
          ),
          ...createBulletList([
            'Domain Layer: Entidades de negocio, Value Objects y reglas de dominio',
            'Application Layer: Casos de uso, DTOs, interfaces y mappers',
            'Infrastructure Layer: Implementaciones concretas (repositorios, servicios externos)',
            'Presentation Layer: Controllers, middlewares, filtros e interceptores',
          ]),

          createHeading('2.1.2 Domain-Driven Design (DDD)', HeadingLevel.HEADING_3),
          createParagraph(
            'Aplicamos conceptos de DDD para modelar el dominio del negocio inmobiliario:',
          ),
          ...createBulletList([
            'Entidades con identidad única y ciclo de vida',
            'Value Objects para conceptos sin identidad (direcciones, montos)',
            'Aggregates para mantener consistencia transaccional',
            'Domain Events para comunicación desacoplada',
            'Repositories para abstracción de persistencia',
          ]),

          createHeading('2.1.3 SOLID Principles', HeadingLevel.HEADING_3),
          ...createBulletList([
            'Single Responsibility: Cada clase tiene una única razón para cambiar',
            'Open/Closed: Abierto para extensión, cerrado para modificación',
            'Liskov Substitution: Las subclases pueden sustituir a sus clases base',
            'Interface Segregation: Interfaces específicas mejor que una general',
            'Dependency Inversion: Dependemos de abstracciones, no de concreciones',
          ]),

          new Paragraph({ children: [new PageBreak()] }),

          // ==========================================
          // 3. STACK TECNOLÓGICO
          // ==========================================
          createHeading('3. Stack Tecnológico', HeadingLevel.HEADING_1),

          createHeading('3.1 Backend', HeadingLevel.HEADING_2),
          createTable(
            ['Tecnología', 'Versión', 'Propósito'],
            [
              ['NestJS', '10.x', 'Framework principal del backend'],
              ['TypeScript', '5.x', 'Lenguaje de programación tipado'],
              ['Prisma', '5.x', 'ORM para acceso a base de datos'],
              ['PostgreSQL', '16', 'Base de datos relacional'],
              ['Redis', '7.x', 'Cache y gestión de sesiones'],
              ['Bull', '4.x', 'Cola de trabajos en background'],
              ['Passport', '0.7.x', 'Autenticación'],
              ['CASL', '6.x', 'Autorización granular'],
              ['Winston', '3.x', 'Logging estructurado'],
            ],
          ),

          createHeading('3.2 Infraestructura', HeadingLevel.HEADING_2),
          createTable(
            ['Tecnología', 'Propósito'],
            [
              ['Docker', 'Containerización de servicios'],
              ['Docker Compose', 'Orquestación local de contenedores'],
              ['GitHub Actions', 'CI/CD Pipeline'],
              ['Nginx', 'Reverse proxy y load balancer'],
            ],
          ),

          createHeading('3.3 Testing', HeadingLevel.HEADING_2),
          createTable(
            ['Herramienta', 'Tipo de Test'],
            [
              ['Jest', 'Tests unitarios y de integración'],
              ['Supertest', 'Tests E2E de API'],
              ['Prisma Mock', 'Mocking de base de datos'],
            ],
          ),

          new Paragraph({ children: [new PageBreak()] }),

          // ==========================================
          // 4. ARQUITECTURA MULTI-TENANT
          // ==========================================
          createHeading('4. Arquitectura Multi-Tenant', HeadingLevel.HEADING_1),

          createHeading('4.1 Estrategia de Aislamiento', HeadingLevel.HEADING_2),
          createParagraph(
            'El sistema implementa una estrategia de "Base de Datos por Tenant", donde cada inmobiliaria tiene su propia base de datos completamente aislada. Esta estrategia ofrece:',
          ),
          ...createBulletList([
            'Máximo aislamiento de datos entre tenants',
            'Cumplimiento regulatorio simplificado',
            'Backup y restauración independientes',
            'Escalamiento horizontal por tenant',
            'Personalización de esquema si es necesario',
          ]),

          createHeading('4.2 Arquitectura de Bases de Datos', HeadingLevel.HEADING_2),
          createParagraph('El sistema utiliza dos tipos de bases de datos:'),

          createHeading('4.2.1 Base de Datos Central', HeadingLevel.HEADING_3),
          createParagraph(
            'Almacena información global del sistema y gestión de tenants:',
          ),
          ...createBulletList([
            'Registro de tenants (inmobiliarias)',
            'Planes de suscripción',
            'Super administradores del sistema',
            'Configuración global',
            'Logs de auditoría global',
          ]),

          createHeading('4.2.2 Base de Datos por Tenant', HeadingLevel.HEADING_3),
          createParagraph('Cada tenant tiene su base de datos dedicada que contiene:'),
          ...createBulletList([
            'Usuarios y roles del tenant',
            'Propiedades inmobiliarias',
            'Propietarios',
            'Clientes/Leads',
            'Transacciones',
            'Configuración específica del tenant',
          ]),

          createHeading('4.3 Resolución de Tenant', HeadingLevel.HEADING_2),
          createParagraph(
            'El tenant se identifica mediante el header HTTP "X-Tenant-ID" que contiene el slug único de la inmobiliaria. El middleware de resolución:',
          ),
          ...createBulletList([
            'Extrae el tenant ID del header de la request',
            'Valida que el tenant existe y está activo',
            'Establece la conexión a la base de datos correcta',
            'Inyecta el contexto del tenant en el request',
          ]),

          new Paragraph({ children: [new PageBreak()] }),

          // ==========================================
          // 5. ESTRUCTURA DEL PROYECTO
          // ==========================================
          createHeading('5. Estructura del Proyecto', HeadingLevel.HEADING_1),

          createHeading('5.1 Organización de Directorios', HeadingLevel.HEADING_2),
          ...createCodeBlock(`src/
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
│   │   ├── strategies/         # Passport strategies (JWT)
│   │   ├── guards/             # Auth guards
│   │   └── decorators/         # Custom decorators
│   ├── database/               # Configuración de BD
│   │   └── prisma/             # Schemas y cliente Prisma
│   ├── cache/                  # Sistema de caché (Redis)
│   ├── logging/                # Sistema de logging (Winston)
│   └── multi-tenancy/          # Sistema multi-tenant
│
├── modules/                    # Feature Modules
│   ├── properties/             # Módulo de Propiedades
│   ├── owners/                 # Módulo de Propietarios
│   ├── clients/                # Módulo de Clientes
│   ├── transactions/           # Módulo de Transacciones
│   └── users/                  # Módulo de Usuarios
│
├── presentation/               # Capa de Presentación global
│   ├── controllers/            # Controllers globales (health)
│   ├── filters/                # Exception filters
│   ├── interceptors/           # Interceptors
│   └── middlewares/            # Middlewares
│
├── shared/                     # Utilidades compartidas
│   ├── constants/              # Constantes globales
│   ├── helpers/                # Funciones de utilidad
│   └── types/                  # Tipos TypeScript compartidos
│
├── app.module.ts               # Módulo principal
└── main.ts                     # Bootstrap de la aplicación`),

          new Paragraph({ children: [new PageBreak()] }),

          // ==========================================
          // 6. MÓDULOS DE NEGOCIO
          // ==========================================
          createHeading('6. Módulos de Negocio', HeadingLevel.HEADING_1),

          createHeading('6.1 Estructura de un Módulo', HeadingLevel.HEADING_2),
          createParagraph(
            'Cada módulo de negocio sigue la misma estructura basada en Clean Architecture:',
          ),
          ...createCodeBlock(`module-name/
├── application/                # Capa de Aplicación
│   ├── dto/                    # Data Transfer Objects
│   │   ├── create-entity.dto.ts
│   │   ├── update-entity.dto.ts
│   │   ├── entity-query.dto.ts
│   │   └── entity-response.dto.ts
│   ├── interfaces/             # Contratos/Interfaces
│   │   └── entity.repository.interface.ts
│   ├── mappers/                # Transformadores Entity <-> DTO
│   │   └── entity.mapper.ts
│   └── use-cases/              # Casos de Uso
│       ├── create-entity.use-case.ts
│       ├── get-entity.use-case.ts
│       ├── list-entities.use-case.ts
│       ├── update-entity.use-case.ts
│       └── delete-entity.use-case.ts
│
├── infrastructure/             # Capa de Infraestructura
│   └── repositories/           # Implementaciones de repositorios
│       └── entity.repository.ts
│
├── presentation/               # Capa de Presentación
│   └── controllers/
│       └── entity.controller.ts
│
├── __tests__/                  # Tests del módulo
│   ├── unit/
│   └── integration/
│
└── module-name.module.ts       # Definición del módulo NestJS`),

          createHeading('6.2 Módulo de Propiedades', HeadingLevel.HEADING_2),
          createParagraph(
            'Gestiona el inventario de propiedades inmobiliarias con las siguientes características:',
          ),
          createTable(
            ['Atributo', 'Descripción'],
            [
              ['Tipos', 'Casa, Departamento, Terreno, Oficina, Local, Bodega'],
              ['Operaciones', 'Venta, Renta, Ambas'],
              ['Estados', 'Borrador, Disponible, Reservada, Vendida, Rentada'],
              ['Relaciones', 'Propietario, Agente asignado, Imágenes'],
            ],
          ),

          createHeading('6.3 Módulo de Propietarios', HeadingLevel.HEADING_2),
          createParagraph(
            'Administra la información de los dueños de las propiedades:',
          ),
          createTable(
            ['Atributo', 'Descripción'],
            [
              ['Tipos', 'Individual (persona física), Empresa (persona moral)'],
              ['Datos', 'Información de contacto, documentación fiscal'],
              ['Relaciones', 'Propiedades asociadas'],
            ],
          ),

          createHeading('6.4 Módulo de Clientes', HeadingLevel.HEADING_2),
          createParagraph(
            'Gestiona leads y clientes potenciales con seguimiento de embudo:',
          ),
          createTable(
            ['Estado', 'Descripción'],
            [
              ['NEW', 'Lead recién capturado'],
              ['CONTACTED', 'Primer contacto realizado'],
              ['QUALIFIED', 'Lead calificado con interés confirmado'],
              ['SHOWING', 'En proceso de mostrar propiedades'],
              ['NEGOTIATING', 'En negociación activa'],
              ['WON', 'Cliente que cerró transacción'],
              ['LOST', 'Lead perdido'],
            ],
          ),

          createHeading('6.5 Módulo de Transacciones', HeadingLevel.HEADING_2),
          createParagraph('Registra y da seguimiento a operaciones de venta y renta:'),
          createTable(
            ['Atributo', 'Descripción'],
            [
              ['Tipos', 'Venta, Renta'],
              ['Estados', 'Pendiente, En proceso, Completada, Cancelada'],
              ['Datos', 'Montos, comisiones, fechas, documentación'],
              ['Relaciones', 'Propiedad, Cliente, Agente'],
            ],
          ),

          createHeading('6.6 Módulo de Usuarios', HeadingLevel.HEADING_2),
          createParagraph('Administra usuarios del sistema dentro de cada tenant:'),
          createTable(
            ['Funcionalidad', 'Descripción'],
            [
              ['Autenticación', 'Login con email/password, JWT tokens'],
              ['Roles', 'Admin, Gerente, Agente, Asistente (personalizables)'],
              ['Permisos', 'CRUD granular por entidad'],
              ['Estados', 'Activo, Inactivo, Suspendido'],
            ],
          ),

          new Paragraph({ children: [new PageBreak()] }),

          // ==========================================
          // 7. SISTEMA DE AUTENTICACIÓN Y AUTORIZACIÓN
          // ==========================================
          createHeading('7. Sistema de Autenticación y Autorización', HeadingLevel.HEADING_1),

          createHeading('7.1 Autenticación JWT', HeadingLevel.HEADING_2),
          createParagraph(
            'El sistema utiliza JSON Web Tokens (JWT) para autenticación stateless:',
          ),

          createHeading('7.1.1 Access Token', HeadingLevel.HEADING_3),
          ...createBulletList([
            'Duración corta (15 minutos por defecto)',
            'Contiene: userId, email, tenantId, roleId',
            'Firmado con algoritmo HS256',
            'Enviado en header Authorization: Bearer <token>',
          ]),

          createHeading('7.1.2 Refresh Token', HeadingLevel.HEADING_3),
          ...createBulletList([
            'Duración larga (7 días por defecto)',
            'Almacenado de forma segura (HttpOnly cookie o storage seguro)',
            'Permite renovar access tokens sin re-autenticación',
            'Revocable en caso de logout o compromiso',
          ]),

          createHeading('7.2 Sistema RBAC con CASL', HeadingLevel.HEADING_2),
          createParagraph(
            'Implementamos Role-Based Access Control usando la librería CASL para autorización granular:',
          ),

          createHeading('7.2.1 Estructura de Permisos', HeadingLevel.HEADING_3),
          createTable(
            ['Componente', 'Descripción', 'Ejemplo'],
            [
              ['Action', 'Acción a realizar', 'create, read, update, delete, manage'],
              ['Subject', 'Recurso sobre el que actúa', 'Property, Client, Transaction'],
              ['Conditions', 'Restricciones opcionales', 'Solo propiedades asignadas'],
            ],
          ),

          createHeading('7.2.2 Roles Predefinidos', HeadingLevel.HEADING_3),
          createTable(
            ['Rol', 'Descripción', 'Permisos'],
            [
              ['Admin', 'Acceso completo', 'manage:all'],
              ['Gerente', 'Gestión operativa', 'manage:Property,Client,Transaction; read:User'],
              ['Agente', 'Operaciones propias', 'CRUD propiedades y clientes asignados'],
              ['Asistente', 'Solo lectura + clientes', 'read:all; create/update:Client'],
            ],
          ),

          createHeading('7.3 Flujo de Autenticación', HeadingLevel.HEADING_2),
          ...createCodeBlock(`1. Usuario envía credenciales (POST /auth/login)
2. Sistema valida credenciales contra BD del tenant
3. Si válidas, genera access_token y refresh_token
4. Cliente almacena tokens de forma segura
5. En cada request, cliente envía:
   - Header: Authorization: Bearer <access_token>
   - Header: X-Tenant-ID: <tenant_slug>
6. Guards validan token y permisos
7. Si access_token expira, usar refresh_token para renovar`),

          new Paragraph({ children: [new PageBreak()] }),

          // ==========================================
          // 8. API REST
          // ==========================================
          createHeading('8. API REST', HeadingLevel.HEADING_1),

          createHeading('8.1 Convenciones de la API', HeadingLevel.HEADING_2),
          createParagraph('La API sigue las convenciones REST estándar:'),

          createTable(
            ['Método', 'Ruta', 'Acción'],
            [
              ['GET', '/entities', 'Listar recursos (paginado)'],
              ['GET', '/entities/:id', 'Obtener un recurso'],
              ['POST', '/entities', 'Crear nuevo recurso'],
              ['PUT', '/entities/:id', 'Actualizar recurso completo'],
              ['PATCH', '/entities/:id', 'Actualizar parcialmente'],
              ['DELETE', '/entities/:id', 'Eliminar recurso'],
            ],
          ),

          createHeading('8.2 Formato de Respuesta', HeadingLevel.HEADING_2),
          createParagraph('Todas las respuestas siguen un formato consistente:'),

          createHeading('8.2.1 Respuesta Exitosa', HeadingLevel.HEADING_3),
          ...createCodeBlock(`{
  "success": true,
  "data": { ... },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z"
  }
}`),

          createHeading('8.2.2 Respuesta con Paginación', HeadingLevel.HEADING_3),
          ...createCodeBlock(`{
  "success": true,
  "data": [ ... ],
  "meta": {
    "total": 150,
    "page": 1,
    "limit": 20,
    "totalPages": 8
  }
}`),

          createHeading('8.2.3 Respuesta de Error', HeadingLevel.HEADING_3),
          ...createCodeBlock(`{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Error de validación",
    "details": [
      { "field": "email", "message": "Email inválido" }
    ]
  }
}`),

          createHeading('8.3 Códigos de Estado HTTP', HeadingLevel.HEADING_2),
          createTable(
            ['Código', 'Significado', 'Uso'],
            [
              ['200', 'OK', 'Request exitosa'],
              ['201', 'Created', 'Recurso creado'],
              ['204', 'No Content', 'Eliminación exitosa'],
              ['400', 'Bad Request', 'Error de validación'],
              ['401', 'Unauthorized', 'No autenticado'],
              ['403', 'Forbidden', 'Sin permisos'],
              ['404', 'Not Found', 'Recurso no encontrado'],
              ['409', 'Conflict', 'Conflicto (duplicado)'],
              ['429', 'Too Many Requests', 'Rate limit excedido'],
              ['500', 'Server Error', 'Error interno'],
            ],
          ),

          createHeading('8.4 Headers Requeridos', HeadingLevel.HEADING_2),
          createTable(
            ['Header', 'Requerido', 'Descripción'],
            [
              ['Authorization', 'Sí*', 'Bearer token JWT'],
              ['X-Tenant-ID', 'Sí', 'Slug del tenant'],
              ['Content-Type', 'Sí (POST/PUT)', 'application/json'],
              ['Accept-Language', 'No', 'Idioma preferido (es, en)'],
            ],
          ),
          createParagraph('* Excepto endpoints públicos como /auth/login'),

          new Paragraph({ children: [new PageBreak()] }),

          // ==========================================
          // 9. PATRONES DE DISEÑO IMPLEMENTADOS
          // ==========================================
          createHeading('9. Patrones de Diseño Implementados', HeadingLevel.HEADING_1),

          createHeading('9.1 Repository Pattern', HeadingLevel.HEADING_2),
          createParagraph(
            'Abstrae el acceso a datos proporcionando una interfaz consistente independiente de la fuente de datos:',
          ),
          ...createBulletList([
            'Interface define el contrato (IPropertyRepository)',
            'Implementación concreta usa Prisma (PropertyRepository)',
            'Facilita testing con mocks',
            'Permite cambiar ORM sin afectar lógica de negocio',
          ]),

          createHeading('9.2 Use Case Pattern', HeadingLevel.HEADING_2),
          createParagraph(
            'Cada operación de negocio se encapsula en un caso de uso independiente:',
          ),
          ...createBulletList([
            'Un caso de uso = una operación de negocio',
            'Recibe dependencias por inyección',
            'Contiene la lógica de orquestación',
            'Facilita testing unitario aislado',
          ]),

          createHeading('9.3 Mapper Pattern', HeadingLevel.HEADING_2),
          createParagraph(
            'Transforma datos entre capas (Entity <-> DTO):',
          ),
          ...createBulletList([
            'Aísla la representación interna de la externa',
            'Centraliza la lógica de transformación',
            'Permite versionar la API sin cambiar el dominio',
          ]),

          createHeading('9.4 Dependency Injection', HeadingLevel.HEADING_2),
          createParagraph(
            'NestJS proporciona un contenedor de IoC robusto:',
          ),
          ...createBulletList([
            'Servicios registrados como providers en módulos',
            'Inyección por constructor',
            'Scopes: Singleton, Request, Transient',
            'Facilita testing y desacoplamiento',
          ]),

          createHeading('9.5 Factory Pattern', HeadingLevel.HEADING_2),
          createParagraph(
            'Usado para crear instancias de entidades de dominio con validación:',
          ),
          ...createBulletList([
            'Valida invariantes al crear entidades',
            'Encapsula lógica de creación compleja',
            'Garantiza que las entidades siempre estén en estado válido',
          ]),

          new Paragraph({ children: [new PageBreak()] }),

          // ==========================================
          // 10. SEGURIDAD
          // ==========================================
          createHeading('10. Seguridad', HeadingLevel.HEADING_1),

          createHeading('10.1 Medidas Implementadas', HeadingLevel.HEADING_2),

          createHeading('10.1.1 Autenticación', HeadingLevel.HEADING_3),
          ...createBulletList([
            'JWT con firma HS256 y secreto robusto',
            'Tokens de corta duración (15 min)',
            'Refresh tokens con rotación',
            'Hashing de passwords con bcrypt (12 rounds)',
          ]),

          createHeading('10.1.2 Autorización', HeadingLevel.HEADING_3),
          ...createBulletList([
            'RBAC granular con CASL',
            'Validación en Guards de NestJS',
            'Principio de mínimo privilegio',
            'Aislamiento completo entre tenants',
          ]),

          createHeading('10.1.3 Protección de API', HeadingLevel.HEADING_3),
          ...createBulletList([
            'Rate limiting por IP y usuario',
            'Validación de input con class-validator',
            'Sanitización automática (whitelist)',
            'CORS configurado por origen',
            'Helmet para headers de seguridad',
          ]),

          createHeading('10.1.4 Base de Datos', HeadingLevel.HEADING_3),
          ...createBulletList([
            'Queries parametrizadas (Prisma previene SQL injection)',
            'Conexiones SSL en producción',
            'Aislamiento por base de datos (multi-tenant)',
            'Encriptación de datos sensibles en reposo',
          ]),

          createHeading('10.2 Consideraciones OWASP', HeadingLevel.HEADING_2),
          createTable(
            ['Vulnerabilidad', 'Mitigación'],
            [
              ['Injection', 'Prisma ORM con queries parametrizadas'],
              ['Broken Auth', 'JWT + bcrypt + tokens seguros'],
              ['Sensitive Data', 'Encriptación + no logs de datos sensibles'],
              ['XXE', 'No procesamos XML'],
              ['Broken Access', 'RBAC + validación en cada endpoint'],
              ['Misconfiguration', 'Configuración centralizada + env vars'],
              ['XSS', 'Validación de input + Content-Type headers'],
              ['Deserialization', 'class-validator + transformación segura'],
              ['Components', 'Dependencias auditadas + actualizaciones'],
              ['Logging', 'Winston con logs estructurados + auditoría'],
            ],
          ),

          new Paragraph({ children: [new PageBreak()] }),

          // ==========================================
          // 11. TESTING
          // ==========================================
          createHeading('11. Testing', HeadingLevel.HEADING_1),

          createHeading('11.1 Estrategia de Testing', HeadingLevel.HEADING_2),
          createParagraph('El proyecto implementa una pirámide de testing completa:'),

          createTable(
            ['Nivel', 'Herramienta', 'Propósito', 'Cobertura Objetivo'],
            [
              ['Unitario', 'Jest', 'Lógica de negocio aislada', '80%+'],
              ['Integración', 'Jest + Prisma', 'Interacción entre componentes', '60%+'],
              ['E2E', 'Supertest', 'Flujos completos de API', 'Flujos críticos'],
            ],
          ),

          createHeading('11.2 Tests Unitarios', HeadingLevel.HEADING_2),
          createParagraph('Prueban casos de uso y lógica de dominio de forma aislada:'),
          ...createBulletList([
            'Mocks de repositorios y servicios externos',
            'Verificación de comportamiento esperado',
            'Casos de éxito y error',
            'Sin dependencias de BD o servicios externos',
          ]),

          createHeading('11.3 Tests de Integración', HeadingLevel.HEADING_2),
          createParagraph('Verifican la integración entre capas:'),
          ...createBulletList([
            'Base de datos de testing real o containerizada',
            'Pruebas de repositorios contra BD',
            'Verificación de transacciones',
            'Testing de módulos completos',
          ]),

          createHeading('11.4 Tests E2E', HeadingLevel.HEADING_2),
          createParagraph('Prueban flujos completos desde el endpoint:'),
          ...createBulletList([
            'Request HTTP real a la aplicación',
            'Verificación de respuestas completas',
            'Testing de autenticación y autorización',
            'Flujos de negocio end-to-end',
          ]),

          createHeading('11.5 Comandos de Testing', HeadingLevel.HEADING_2),
          ...createCodeBlock(`# Tests unitarios
npm run test

# Tests con cobertura
npm run test:cov

# Tests en modo watch
npm run test:watch

# Tests de integración
npm run test:integration

# Tests E2E
npm run test:e2e`),

          new Paragraph({ children: [new PageBreak()] }),

          // ==========================================
          // 12. DEPLOYMENT Y CI/CD
          // ==========================================
          createHeading('12. Deployment y CI/CD', HeadingLevel.HEADING_1),

          createHeading('12.1 Pipeline de CI', HeadingLevel.HEADING_2),
          createParagraph(
            'GitHub Actions ejecuta el siguiente pipeline en cada push/PR:',
          ),
          ...createBulletList([
            'Lint: Verificación de código con ESLint',
            'Build: Compilación TypeScript',
            'Unit Tests: Ejecución de tests unitarios',
            'Integration Tests: Tests con base de datos',
            'E2E Tests: Tests end-to-end',
            'Security Scan: Auditoría de dependencias',
            'Docker Build: Construcción de imagen',
          ]),

          createHeading('12.2 Containerización', HeadingLevel.HEADING_2),
          createParagraph('La aplicación se distribuye como contenedor Docker:'),
          ...createCodeBlock(`# Dockerfile multi-stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
EXPOSE 3000
CMD ["node", "dist/main.js"]`),

          createHeading('12.3 Ambientes', HeadingLevel.HEADING_2),
          createTable(
            ['Ambiente', 'Propósito', 'Trigger'],
            [
              ['Development', 'Desarrollo local', 'docker-compose up'],
              ['Staging', 'QA y pruebas', 'Push a develop'],
              ['Production', 'Producción', 'Tag release'],
            ],
          ),

          new Paragraph({ children: [new PageBreak()] }),

          // ==========================================
          // 13. MODELO DE DATOS
          // ==========================================
          createHeading('13. Modelo de Datos', HeadingLevel.HEADING_1),

          createHeading('13.1 Esquema Central', HeadingLevel.HEADING_2),
          createTable(
            ['Tabla', 'Descripción'],
            [
              ['Tenant', 'Inmobiliarias registradas'],
              ['SubscriptionPlan', 'Planes de suscripción'],
              ['SuperAdmin', 'Administradores del sistema'],
              ['TenantAdmin', 'Admins asociados a tenants'],
              ['AuditLog', 'Log de auditoría global'],
            ],
          ),

          createHeading('13.2 Esquema por Tenant', HeadingLevel.HEADING_2),
          createTable(
            ['Tabla', 'Descripción'],
            [
              ['User', 'Usuarios del tenant'],
              ['Role', 'Roles personalizables'],
              ['Permission', 'Permisos granulares'],
              ['RolePermission', 'Relación roles-permisos'],
              ['Property', 'Propiedades inmobiliarias'],
              ['PropertyImage', 'Imágenes de propiedades'],
              ['Owner', 'Propietarios'],
              ['Client', 'Clientes/Leads'],
              ['Transaction', 'Transacciones'],
              ['Setting', 'Configuración del tenant'],
            ],
          ),

          createHeading('13.3 Relaciones Principales', HeadingLevel.HEADING_2),
          ...createCodeBlock(`Property
├── Owner (N:1) - Cada propiedad tiene un propietario
├── User/Agent (N:1) - Agente asignado
└── PropertyImage (1:N) - Múltiples imágenes

Transaction
├── Property (N:1) - Propiedad de la transacción
├── Client (N:1) - Cliente comprador/inquilino
└── User/Agent (N:1) - Agente que cerró

Client
└── User/Agent (N:1) - Agente asignado

User
└── Role (N:1) - Rol del usuario`),

          new Paragraph({ children: [new PageBreak()] }),

          // ==========================================
          // 14. CONFIGURACIÓN Y VARIABLES DE ENTORNO
          // ==========================================
          createHeading('14. Configuración y Variables de Entorno', HeadingLevel.HEADING_1),

          createHeading('14.1 Variables Requeridas', HeadingLevel.HEADING_2),
          createTable(
            ['Variable', 'Descripción', 'Ejemplo'],
            [
              ['NODE_ENV', 'Ambiente de ejecución', 'development | production'],
              ['PORT', 'Puerto de la aplicación', '3000'],
              ['DATABASE_HOST', 'Host de PostgreSQL', 'localhost'],
              ['DATABASE_PORT', 'Puerto de PostgreSQL', '5432'],
              ['DATABASE_USER', 'Usuario de BD', 'postgres'],
              ['DATABASE_PASSWORD', 'Password de BD', '********'],
              ['CENTRAL_DATABASE_URL', 'URL BD central', 'postgresql://...'],
              ['REDIS_HOST', 'Host de Redis', 'localhost'],
              ['REDIS_PORT', 'Puerto de Redis', '6379'],
              ['JWT_SECRET', 'Secreto para JWT', '32+ caracteres aleatorios'],
              ['JWT_EXPIRES_IN', 'Expiración access token', '15m'],
              ['JWT_REFRESH_SECRET', 'Secreto refresh token', '32+ caracteres'],
              ['JWT_REFRESH_EXPIRES_IN', 'Expiración refresh', '7d'],
              ['ENCRYPTION_KEY', 'Clave de encriptación', '32 caracteres'],
            ],
          ),

          createHeading('14.2 Configuración por Ambiente', HeadingLevel.HEADING_2),
          createParagraph('Los archivos de configuración se cargan según el ambiente:'),
          ...createBulletList([
            '.env - Configuración local (no versionado)',
            '.env.example - Template de configuración',
            '.env.test - Configuración para tests',
            '.env.production - Producción (en servidor o secrets)',
          ]),

          new Paragraph({ children: [new PageBreak()] }),

          // ==========================================
          // 15. GLOSARIO
          // ==========================================
          createHeading('15. Glosario', HeadingLevel.HEADING_1),

          createTable(
            ['Término', 'Definición'],
            [
              ['Tenant', 'Inquilino/cliente del sistema (una inmobiliaria)'],
              ['Multi-tenant', 'Arquitectura que soporta múltiples clientes aislados'],
              ['Clean Architecture', 'Patrón de arquitectura con capas independientes'],
              ['DDD', 'Domain-Driven Design - diseño guiado por el dominio'],
              ['DTO', 'Data Transfer Object - objeto para transferir datos'],
              ['Use Case', 'Caso de uso - operación de negocio encapsulada'],
              ['Repository', 'Patrón que abstrae el acceso a datos'],
              ['JWT', 'JSON Web Token - token de autenticación'],
              ['RBAC', 'Role-Based Access Control - control de acceso por roles'],
              ['CASL', 'Librería de autorización para JavaScript'],
              ['ORM', 'Object-Relational Mapping - mapeo objeto-relacional'],
              ['Prisma', 'ORM moderno para Node.js/TypeScript'],
              ['Guard', 'Componente NestJS para validar requests'],
              ['Middleware', 'Función que procesa requests antes del handler'],
              ['Interceptor', 'Componente que transforma request/response'],
            ],
          ),

          new Paragraph({ children: [new PageBreak()] }),

          // ==========================================
          // 16. REFERENCIAS
          // ==========================================
          createHeading('16. Referencias', HeadingLevel.HEADING_1),

          createHeading('16.1 Documentación Oficial', HeadingLevel.HEADING_2),
          ...createBulletList([
            'NestJS: https://docs.nestjs.com',
            'Prisma: https://www.prisma.io/docs',
            'TypeScript: https://www.typescriptlang.org/docs',
            'CASL: https://casl.js.org',
            'Jest: https://jestjs.io/docs',
          ]),

          createHeading('16.2 Recursos de Arquitectura', HeadingLevel.HEADING_2),
          ...createBulletList([
            'Clean Architecture - Robert C. Martin',
            'Domain-Driven Design - Eric Evans',
            'Patterns of Enterprise Application Architecture - Martin Fowler',
          ]),

          // ==========================================
          // FIN DEL DOCUMENTO
          // ==========================================
          new Paragraph({
            children: [new TextRun({ text: '' })],
            spacing: { before: 1000 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '— Fin del documento —',
                italics: true,
                color: COLORS.text,
              }),
            ],
            alignment: AlignmentType.CENTER,
          }),
        ],
      },
    ],
  });

  // Generar el archivo
  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join(process.cwd(), 'docs', 'Arquitectura-Sistema-Inmobiliario.docx');

  // Crear directorio si no existe
  const docsDir = path.dirname(outputPath);
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, buffer);

  console.log('');
  console.log('✅ Documentación generada exitosamente!');
  console.log(`📄 Archivo: ${outputPath}`);
  console.log('');
}

generateDocument().catch(console.error);
