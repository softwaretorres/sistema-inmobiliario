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
import { CreateClientUseCase } from '../../application/use-cases/create-client.use-case';
import { GetClientUseCase } from '../../application/use-cases/get-client.use-case';
import { ListClientsUseCase } from '../../application/use-cases/list-clients.use-case';
import { UpdateClientUseCase } from '../../application/use-cases/update-client.use-case';
import { DeleteClientUseCase } from '../../application/use-cases/delete-client.use-case';
import { CreateClientDto } from '../../application/dto/create-client.dto';
import { UpdateClientDto } from '../../application/dto/update-client.dto';
import { ClientQueryDto } from '../../application/dto/client-query.dto';
import {
  ClientResponseDto,
  PaginatedClientResponseDto,
} from '../../application/dto/client-response.dto';

@ApiTags('Clients')
@ApiBearerAuth('JWT-auth')
@ApiSecurity('tenant-id')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller({
  path: 'clients',
  version: '1',
})
export class ClientsController {
  constructor(
    private readonly createClientUseCase: CreateClientUseCase,
    private readonly getClientUseCase: GetClientUseCase,
    private readonly listClientsUseCase: ListClientsUseCase,
    private readonly updateClientUseCase: UpdateClientUseCase,
    private readonly deleteClientUseCase: DeleteClientUseCase,
  ) {}

  @Post()
  @Permissions('Client:create')
  @ApiOperation({ summary: 'Create a new client/lead' })
  @ApiResponse({
    status: 201,
    description: 'Client created successfully',
    type: ClientResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  async create(@Body() createClientDto: CreateClientDto): Promise<ClientResponseDto> {
    return this.createClientUseCase.execute(createClientDto);
  }

  @Get()
  @Permissions('Client:read')
  @ApiOperation({ summary: 'List clients with filters and pagination' })
  @ApiResponse({
    status: 200,
    description: 'Clients list',
    type: PaginatedClientResponseDto,
  })
  async findAll(@Query() query: ClientQueryDto): Promise<PaginatedClientResponseDto> {
    return this.listClientsUseCase.execute(query);
  }

  @Get(':id')
  @Permissions('Client:read')
  @ApiOperation({ summary: 'Get client by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Client found',
    type: ClientResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Client not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ClientResponseDto> {
    return this.getClientUseCase.execute(id);
  }

  @Put(':id')
  @Permissions('Client:update')
  @ApiOperation({ summary: 'Update client' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Client updated',
    type: ClientResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Client not found' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<ClientResponseDto> {
    return this.updateClientUseCase.execute(id, updateClientDto);
  }

  @Delete(':id')
  @Permissions('Client:delete')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete client' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({ status: 204, description: 'Client deleted' })
  @ApiResponse({ status: 404, description: 'Client not found' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.deleteClientUseCase.execute(id);
  }
}
