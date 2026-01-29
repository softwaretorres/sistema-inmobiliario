import { Injectable } from '@nestjs/common';
import { IClientData } from '../interfaces/client.repository.interface';
import { ClientResponseDto, ClientListItemDto } from '../dto/client-response.dto';
import { ClientStatus } from '../dto/create-client.dto';

@Injectable()
export class ClientMapper {
  toResponse(client: IClientData): ClientResponseDto {
    return {
      id: client.id,
      firstName: client.firstName,
      lastName: client.lastName,
      fullName: `${client.firstName} ${client.lastName}`,
      email: client.email,
      phone: client.phone,
      alternatePhone: client.alternatePhone ?? undefined,
      source: client.source ?? undefined,
      sourceDetail: client.sourceDetail ?? undefined,
      status: client.status as ClientStatus,
      budget: client.budget ? Number(client.budget) : undefined,
      preferences: client.preferences ?? undefined,
      address: client.address ?? undefined,
      city: client.city ?? undefined,
      state: client.state ?? undefined,
      notes: client.notes ?? undefined,
      nextFollowUp: client.nextFollowUp ?? undefined,
      assignedToId: client.assignedToId ?? undefined,
      interactionsCount: client._count?.interactions ?? 0,
      visitsCount: client._count?.visits ?? 0,
      createdAt: client.createdAt,
      updatedAt: client.updatedAt,
    };
  }

  toListItem(client: IClientData): ClientListItemDto {
    return {
      id: client.id,
      fullName: `${client.firstName} ${client.lastName}`,
      email: client.email,
      phone: client.phone,
      status: client.status as ClientStatus,
      source: client.source ?? undefined,
      budget: client.budget ? Number(client.budget) : undefined,
      nextFollowUp: client.nextFollowUp ?? undefined,
      createdAt: client.createdAt,
    };
  }
}
