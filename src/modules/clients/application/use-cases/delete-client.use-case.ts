import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  CLIENT_REPOSITORY,
  IClientRepository,
} from '../interfaces/client.repository.interface';

@Injectable()
export class DeleteClientUseCase {
  constructor(
    @Inject(CLIENT_REPOSITORY)
    private readonly clientRepository: IClientRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const client = await this.clientRepository.findById(id);
    if (!client) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }

    await this.clientRepository.delete(id);
  }
}
