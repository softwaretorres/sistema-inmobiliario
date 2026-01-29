import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Query,
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
import { CreateTransactionUseCase } from '../../application/use-cases/create-transaction.use-case';
import { GetTransactionUseCase } from '../../application/use-cases/get-transaction.use-case';
import { ListTransactionsUseCase } from '../../application/use-cases/list-transactions.use-case';
import { UpdateTransactionUseCase } from '../../application/use-cases/update-transaction.use-case';
import { CreateTransactionDto } from '../../application/dto/create-transaction.dto';
import { UpdateTransactionDto } from '../../application/dto/update-transaction.dto';
import { TransactionQueryDto } from '../../application/dto/transaction-query.dto';
import {
  TransactionResponseDto,
  PaginatedTransactionResponseDto,
} from '../../application/dto/transaction-response.dto';

@ApiTags('Transactions')
@ApiBearerAuth('JWT-auth')
@ApiSecurity('tenant-id')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller({
  path: 'transactions',
  version: '1',
})
export class TransactionsController {
  constructor(
    private readonly createTransactionUseCase: CreateTransactionUseCase,
    private readonly getTransactionUseCase: GetTransactionUseCase,
    private readonly listTransactionsUseCase: ListTransactionsUseCase,
    private readonly updateTransactionUseCase: UpdateTransactionUseCase,
  ) {}

  @Post()
  @Permissions('Transaction:create')
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiResponse({
    status: 201,
    description: 'Transaction created successfully',
    type: TransactionResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  @ApiResponse({ status: 409, description: 'Transaction code already exists' })
  async create(@Body() dto: CreateTransactionDto): Promise<TransactionResponseDto> {
    return this.createTransactionUseCase.execute(dto);
  }

  @Get()
  @Permissions('Transaction:read')
  @ApiOperation({ summary: 'List transactions with filters and pagination' })
  @ApiResponse({
    status: 200,
    description: 'Transactions list',
    type: PaginatedTransactionResponseDto,
  })
  async findAll(@Query() query: TransactionQueryDto): Promise<PaginatedTransactionResponseDto> {
    return this.listTransactionsUseCase.execute(query);
  }

  @Get(':id')
  @Permissions('Transaction:read')
  @ApiOperation({ summary: 'Get transaction by ID' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Transaction found',
    type: TransactionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<TransactionResponseDto> {
    return this.getTransactionUseCase.execute(id);
  }

  @Get('code/:code')
  @Permissions('Transaction:read')
  @ApiOperation({ summary: 'Get transaction by code' })
  @ApiParam({ name: 'code', type: 'string' })
  @ApiResponse({
    status: 200,
    description: 'Transaction found',
    type: TransactionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  async findByCode(@Param('code') code: string): Promise<TransactionResponseDto> {
    return this.getTransactionUseCase.executeByCode(code);
  }

  @Put(':id')
  @Permissions('Transaction:update')
  @ApiOperation({ summary: 'Update transaction' })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  @ApiResponse({
    status: 200,
    description: 'Transaction updated',
    type: TransactionResponseDto,
  })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateTransactionDto,
  ): Promise<TransactionResponseDto> {
    return this.updateTransactionUseCase.execute(id, dto);
  }
}
