import { Injectable } from '@nestjs/common';
import { IOwnerData } from '../interfaces/owner.repository.interface';
import { OwnerResponseDto, OwnerListItemDto } from '../dto/owner-response.dto';
import { OwnerType } from '../dto/create-owner.dto';

@Injectable()
export class OwnerMapper {
  toResponse(owner: IOwnerData): OwnerResponseDto {
    return {
      id: owner.id,
      type: owner.type as OwnerType,
      firstName: owner.firstName ?? undefined,
      lastName: owner.lastName ?? undefined,
      companyName: owner.companyName ?? undefined,
      legalName: owner.legalName ?? undefined,
      taxId: owner.taxId ?? undefined,
      email: owner.email,
      phone: owner.phone,
      alternatePhone: owner.alternatePhone ?? undefined,
      address: owner.address ?? undefined,
      city: owner.city ?? undefined,
      state: owner.state ?? undefined,
      country: owner.country ?? undefined,
      zipCode: owner.zipCode ?? undefined,
      bankName: owner.bankName ?? undefined,
      bankAccountMasked: owner.bankAccount ? this.maskBankAccount(owner.bankAccount) : undefined,
      notes: owner.notes ?? undefined,
      propertiesCount: owner._count?.properties ?? 0,
      displayName: this.getDisplayName(owner),
      createdAt: owner.createdAt,
      updatedAt: owner.updatedAt,
    };
  }

  toListItem(owner: IOwnerData): OwnerListItemDto {
    return {
      id: owner.id,
      type: owner.type as OwnerType,
      displayName: this.getDisplayName(owner),
      email: owner.email,
      phone: owner.phone,
      city: owner.city ?? undefined,
      state: owner.state ?? undefined,
      propertiesCount: owner._count?.properties ?? 0,
      createdAt: owner.createdAt,
    };
  }

  private getDisplayName(owner: IOwnerData): string {
    if (owner.type === 'COMPANY') {
      return owner.companyName ?? 'Sin nombre';
    }
    const parts = [owner.firstName, owner.lastName].filter(Boolean);
    return parts.length > 0 ? parts.join(' ') : 'Sin nombre';
  }

  private maskBankAccount(account: string): string {
    if (account.length <= 4) {
      return '****';
    }
    return '*'.repeat(account.length - 4) + account.slice(-4);
  }
}
