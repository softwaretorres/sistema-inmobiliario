import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Body,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiSecurity,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@infrastructure/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '@infrastructure/auth/guards/permissions.guard';
import { Permissions } from '@infrastructure/auth/decorators/permissions.decorator';
import { CurrentUser } from '@infrastructure/auth/decorators/current-user.decorator';
import { CreatePropertyUseCase } from '../../application/use-cases/create-property.use-case';
import { GetPropertyUseCase } from '../../application/use-cases/get-property.use-case';
import { ListPropertiesUseCase } from '../../application/use-cases/list-properties.use-case';
import { UpdatePropertyUseCase } from '../../application/use-cases/update-property.use-case';
import { DeletePropertyUseCase } from '../../application/use-cases/delete-property.use-case';
import {
  PublishPropertyUseCase,
  UnpublishPropertyUseCase,
} from '../../application/use-cases/publish-property.use-case';
import { CreatePropertyDto } from '../../application/dto/create-property.dto';
import { UpdatePropertyDto } from '../../application/dto/update-property.dto';
import { PropertyQueryDto } from '../../application/dto/property-query.dto';
import {
  PropertyResponseDto,
  PaginatedPropertyResponseDto,
} from '../../application/dto/property-response.dto';

interface ICurrentUser {
  id: string;
  email: string;
  tenantId: string;
  role: {
    name: string;
    permissions: string[];
  };
}

@ApiTags('Properties')
@ApiBearerAuth('JWT-auth')
@ApiSecurity('tenant-id')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller({
  path: 'properties',
  version: '1',
})
export class PropertiesController {
  constructor(
    private readonly createPropertyUseCase: CreatePropertyUseCase,
    private readonly getPropertyUseCase: GetPropertyUseCase,
    private readonly listPropertiesUseCase: ListPropertiesUseCase,
    private readonly updatePropertyUseCase: UpdatePropertyUseCase,
    private readonly deletePropertyUseCase: DeletePropertyUseCase,
    private readonly publishPropertyUseCase: PublishPropertyUseCase,
    private readonly unpublishPropertyUseCase: UnpublishPropertyUseCase,
  ) {}

  @Post()
  @Permissions('Property:create')
  @ApiOperation({ summary: 'Create a new property' })
  @ApiResponse({
    status: 201,
    description: 'Property created successfully',
    type: PropertyResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 409, description: 'Property code already exists' })
  async create(
    @Body() createPropertyDto: CreatePropertyDto,
    @CurrentUser() user: ICurrentUser,
  ): Promise<PropertyResponseDto> {
    // Override agentId with current user if not admin
    const dto = { ...createPropertyDto };
    if (user.role.name !== 'ADMIN' && user.role.name !== 'SUPER_ADMIN') {
      dto.agentId = user.id;
    }

    return this.createPropertyUseCase.execute(dto);
  }

  @Get()
  @Permissions('Property:read')
  @ApiOperation({ summary: 'List properties with filters and pagination' })
  @ApiResponse({
    status: 200,
    description: 'Properties list',
    type: PaginatedPropertyResponseDto,
  })
  async findAll(@Query() query: PropertyQueryDto): Promise<PaginatedPropertyResponseDto> {
    return this.listPropertiesUseCase.execute(query);
  }

  @Get(':id')
  @Permissions('Property:read')
  @ApiOperation({ summary: 'Get property by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Property found',
    type: PropertyResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Property not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<PropertyResponseDto> {
    return this.getPropertyUseCase.execute(id);
  }

  @Get('code/:code')
  @Permissions('Property:read')
  @ApiOperation({ summary: 'Get property by code' })
  @ApiParam({ name: 'code', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Property found',
    type: PropertyResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Property not found' })
  async findByCode(@Param('code') code: string): Promise<PropertyResponseDto> {
    return this.getPropertyUseCase.executeByCode(code);
  }

  @Get('slug/:slug')
  @Permissions('Property:read')
  @ApiOperation({ summary: 'Get property by slug (for public pages)' })
  @ApiParam({ name: 'slug', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Property found',
    type: PropertyResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Property not found' })
  async findBySlug(@Param('slug') slug: string): Promise<PropertyResponseDto> {
    return this.getPropertyUseCase.executeBySlug(slug);
  }

  @Put(':id')
  @Permissions('Property:update')
  @ApiOperation({ summary: 'Update property' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Property updated',
    type: PropertyResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Property not found' })
  @ApiResponse({ status: 409, description: 'Slug already exists' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ): Promise<PropertyResponseDto> {
    return this.updatePropertyUseCase.execute(id, updatePropertyDto);
  }

  @Delete(':id')
  @Permissions('Property:delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete property' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 204, description: 'Property deleted' })
  @ApiResponse({ status: 404, description: 'Property not found' })
  @ApiResponse({ status: 409, description: 'Cannot delete sold/rented property' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.deletePropertyUseCase.execute(id);
  }

  @Patch(':id/publish')
  @Permissions('Property:update')
  @ApiOperation({ summary: 'Publish property' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiQuery({ name: 'slug', required: false, type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Property published',
    type: PropertyResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Property not found' })
  @ApiResponse({ status: 400, description: 'Property must have at least one image' })
  @ApiResponse({ status: 409, description: 'Slug already exists' })
  async publish(
    @Param('id', ParseUUIDPipe) id: string,
    @Query('slug') slug?: string,
  ): Promise<PropertyResponseDto> {
    return this.publishPropertyUseCase.execute(id, slug);
  }

  @Patch(':id/unpublish')
  @Permissions('Property:update')
  @ApiOperation({ summary: 'Unpublish property' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Property unpublished',
    type: PropertyResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Property not found' })
  async unpublish(@Param('id', ParseUUIDPipe) id: string): Promise<PropertyResponseDto> {
    return this.unpublishPropertyUseCase.execute(id);
  }
}
