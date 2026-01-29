import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
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
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@infrastructure/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '@infrastructure/auth/guards/permissions.guard';
import { Permissions } from '@infrastructure/auth/decorators/permissions.decorator';
import { CreateOwnerUseCase } from '../../application/use-cases/create-owner.use-case';
import { GetOwnerUseCase } from '../../application/use-cases/get-owner.use-case';
import { ListOwnersUseCase } from '../../application/use-cases/list-owners.use-case';
import { UpdateOwnerUseCase } from '../../application/use-cases/update-owner.use-case';
import { DeleteOwnerUseCase } from '../../application/use-cases/delete-owner.use-case';
import { CreateOwnerDto } from '../../application/dto/create-owner.dto';
import { UpdateOwnerDto } from '../../application/dto/update-owner.dto';
import { OwnerQueryDto } from '../../application/dto/owner-query.dto';
import {
  OwnerResponseDto,
  PaginatedOwnerResponseDto,
} from '../../application/dto/owner-response.dto';

@ApiTags('Owners')
@ApiBearerAuth('JWT-auth')
@ApiSecurity('tenant-id')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller({
  path: 'owners',
  version: '1',
})
export class OwnersController {
  constructor(
    private readonly createOwnerUseCase: CreateOwnerUseCase,
    private readonly getOwnerUseCase: GetOwnerUseCase,
    private readonly listOwnersUseCase: ListOwnersUseCase,
    private readonly updateOwnerUseCase: UpdateOwnerUseCase,
    private readonly deleteOwnerUseCase: DeleteOwnerUseCase,
  ) {}

  @Post()
  @Permissions('Owner:create')
  @ApiOperation({ summary: 'Create a new owner' })
  @ApiResponse({
    status: 201,
    description: 'Owner created successfully',
    type: OwnerResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 409, description: 'Email or Tax ID already exists' })
  async create(@Body() createOwnerDto: CreateOwnerDto): Promise<OwnerResponseDto> {
    return this.createOwnerUseCase.execute(createOwnerDto);
  }

  @Get()
  @Permissions('Owner:read')
  @ApiOperation({ summary: 'List owners with filters and pagination' })
  @ApiResponse({
    status: 200,
    description: 'Owners list',
    type: PaginatedOwnerResponseDto,
  })
  async findAll(@Query() query: OwnerQueryDto): Promise<PaginatedOwnerResponseDto> {
    return this.listOwnersUseCase.execute(query);
  }

  @Get(':id')
  @Permissions('Owner:read')
  @ApiOperation({ summary: 'Get owner by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Owner found',
    type: OwnerResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Owner not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<OwnerResponseDto> {
    return this.getOwnerUseCase.execute(id);
  }

  @Put(':id')
  @Permissions('Owner:update')
  @ApiOperation({ summary: 'Update owner' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Owner updated',
    type: OwnerResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Owner not found' })
  @ApiResponse({ status: 409, description: 'Email or Tax ID already exists' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOwnerDto: UpdateOwnerDto,
  ): Promise<OwnerResponseDto> {
    return this.updateOwnerUseCase.execute(id, updateOwnerDto);
  }

  @Delete(':id')
  @Permissions('Owner:delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete owner' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 204, description: 'Owner deleted' })
  @ApiResponse({ status: 404, description: 'Owner not found' })
  @ApiResponse({ status: 409, description: 'Cannot delete owner with properties' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.deleteOwnerUseCase.execute(id);
  }
}
