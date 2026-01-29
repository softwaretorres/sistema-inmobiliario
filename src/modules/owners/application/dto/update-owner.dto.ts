import { PartialType, OmitType } from '@nestjs/swagger';
import { CreateOwnerDto } from './create-owner.dto';

export class UpdateOwnerDto extends PartialType(
  OmitType(CreateOwnerDto, ['type'] as const),
) {}
