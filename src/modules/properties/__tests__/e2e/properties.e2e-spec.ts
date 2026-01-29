import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../../app.module';
import { PropertyType, OperationType, PropertyStatus } from '@core/domain/entities/property.entity';

describe('PropertiesController (e2e)', () => {
  let app: INestApplication;
  let authToken: string;
  let createdPropertyId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    app.setGlobalPrefix('api');
    app.enableVersioning();

    await app.init();

    // Login to get auth token (assuming test credentials exist)
    // In real tests, you'd set up a test database with seeded users
    // For this example, we'll mock the auth
    authToken = 'test-jwt-token';
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /api/v1/properties', () => {
    const validCreateDto = {
      code: `PROP-TEST-${Date.now()}`,
      title: 'Test Property E2E',
      description: 'A test property for E2E testing',
      type: PropertyType.APARTMENT,
      operationType: OperationType.SALE,
      address: {
        street: 'Test Street 123',
        neighborhood: 'Test Neighborhood',
        city: 'Ciudad de México',
        state: 'CDMX',
        country: 'MX',
        zipCode: '01000',
      },
      salePrice: 5000000,
      currency: 'MXN',
      characteristics: {
        bedrooms: 3,
        bathrooms: 2,
        parkingSpaces: 2,
        totalArea: 150,
        builtArea: 120,
      },
      amenities: { pool: true, gym: true },
      features: { airConditioning: true },
      ownerId: '123e4567-e89b-12d3-a456-426614174000',
      agentId: '123e4567-e89b-12d3-a456-426614174001',
    };

    it('should create a property', async () => {
      const response = await request(app.getHttpServer())
        .post('/api/v1/properties')
        .set('Authorization', `Bearer ${authToken}`)
        .set('X-Tenant-ID', 'test-tenant')
        .send(validCreateDto)
        .expect(201);

      expect(response.body.data).toBeDefined();
      expect(response.body.data.code).toBe(validCreateDto.code);
      expect(response.body.data.title).toBe(validCreateDto.title);
      expect(response.body.data.type).toBe(validCreateDto.type);
      expect(response.body.data.status).toBe(PropertyStatus.DRAFT);

      createdPropertyId = response.body.data.id;
    });

    it('should fail with invalid data', async () => {
      const invalidDto = {
        title: 'No code property',
        // missing required fields
      };

      await request(app.getHttpServer())
        .post('/api/v1/properties')
        .set('Authorization', `Bearer ${authToken}`)
        .set('X-Tenant-ID', 'test-tenant')
        .send(invalidDto)
        .expect(400);
    });

    it('should fail without auth token', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/properties')
        .set('X-Tenant-ID', 'test-tenant')
        .send(validCreateDto)
        .expect(401);
    });

    it('should fail without tenant ID', async () => {
      await request(app.getHttpServer())
        .post('/api/v1/properties')
        .set('Authorization', `Bearer ${authToken}`)
        .send(validCreateDto)
        .expect(400);
    });
  });

  describe('GET /api/v1/properties', () => {
    it('should list properties with pagination', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/v1/properties')
        .set('Authorization', `Bearer ${authToken}`)
        .set('X-Tenant-ID', 'test-tenant')
        .query({ page: 1, limit: 10 })
        .expect(200);

      expect(response.body.data).toBeDefined();
      expect(Array.isArray(response.body.data.data)).toBe(true);
      expect(response.body.data.meta).toBeDefined();
      expect(response.body.data.meta.page).toBe(1);
      expect(response.body.data.meta.limit).toBe(10);
    });

    it('should filter properties by type', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/v1/properties')
        .set('Authorization', `Bearer ${authToken}`)
        .set('X-Tenant-ID', 'test-tenant')
        .query({ type: PropertyType.APARTMENT })
        .expect(200);

      expect(response.body.data).toBeDefined();
      if (response.body.data.data.length > 0) {
        response.body.data.data.forEach((property: any) => {
          expect(property.type).toBe(PropertyType.APARTMENT);
        });
      }
    });

    it('should filter properties by city', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/v1/properties')
        .set('Authorization', `Bearer ${authToken}`)
        .set('X-Tenant-ID', 'test-tenant')
        .query({ city: 'Ciudad de México' })
        .expect(200);

      expect(response.body.data).toBeDefined();
    });

    it('should search properties', async () => {
      const response = await request(app.getHttpServer())
        .get('/api/v1/properties')
        .set('Authorization', `Bearer ${authToken}`)
        .set('X-Tenant-ID', 'test-tenant')
        .query({ search: 'test' })
        .expect(200);

      expect(response.body.data).toBeDefined();
    });
  });

  describe('GET /api/v1/properties/:id', () => {
    it('should get a property by ID', async () => {
      if (!createdPropertyId) {
        return;
      }

      const response = await request(app.getHttpServer())
        .get(`/api/v1/properties/${createdPropertyId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .set('X-Tenant-ID', 'test-tenant')
        .expect(200);

      expect(response.body.data).toBeDefined();
      expect(response.body.data.id).toBe(createdPropertyId);
    });

    it('should return 404 for non-existent property', async () => {
      const nonExistentId = '123e4567-e89b-12d3-a456-426614174999';

      await request(app.getHttpServer())
        .get(`/api/v1/properties/${nonExistentId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .set('X-Tenant-ID', 'test-tenant')
        .expect(404);
    });

    it('should return 400 for invalid UUID', async () => {
      await request(app.getHttpServer())
        .get('/api/v1/properties/invalid-uuid')
        .set('Authorization', `Bearer ${authToken}`)
        .set('X-Tenant-ID', 'test-tenant')
        .expect(400);
    });
  });

  describe('PUT /api/v1/properties/:id', () => {
    const updateDto = {
      title: 'Updated Test Property',
      description: 'Updated description',
      salePrice: 5500000,
    };

    it('should update a property', async () => {
      if (!createdPropertyId) {
        return;
      }

      const response = await request(app.getHttpServer())
        .put(`/api/v1/properties/${createdPropertyId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .set('X-Tenant-ID', 'test-tenant')
        .send(updateDto)
        .expect(200);

      expect(response.body.data).toBeDefined();
      expect(response.body.data.title).toBe(updateDto.title);
      expect(response.body.data.description).toBe(updateDto.description);
    });

    it('should return 404 for non-existent property', async () => {
      const nonExistentId = '123e4567-e89b-12d3-a456-426614174999';

      await request(app.getHttpServer())
        .put(`/api/v1/properties/${nonExistentId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .set('X-Tenant-ID', 'test-tenant')
        .send(updateDto)
        .expect(404);
    });
  });

  describe('PATCH /api/v1/properties/:id/publish', () => {
    it('should fail to publish property without images', async () => {
      if (!createdPropertyId) {
        return;
      }

      // Properties require at least one image to be published
      await request(app.getHttpServer())
        .patch(`/api/v1/properties/${createdPropertyId}/publish`)
        .set('Authorization', `Bearer ${authToken}`)
        .set('X-Tenant-ID', 'test-tenant')
        .expect(400);
    });
  });

  describe('DELETE /api/v1/properties/:id', () => {
    it('should delete a property', async () => {
      if (!createdPropertyId) {
        return;
      }

      await request(app.getHttpServer())
        .delete(`/api/v1/properties/${createdPropertyId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .set('X-Tenant-ID', 'test-tenant')
        .expect(204);

      // Verify it's deleted
      await request(app.getHttpServer())
        .get(`/api/v1/properties/${createdPropertyId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .set('X-Tenant-ID', 'test-tenant')
        .expect(404);
    });

    it('should return 404 for non-existent property', async () => {
      const nonExistentId = '123e4567-e89b-12d3-a456-426614174999';

      await request(app.getHttpServer())
        .delete(`/api/v1/properties/${nonExistentId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .set('X-Tenant-ID', 'test-tenant')
        .expect(404);
    });
  });
});
