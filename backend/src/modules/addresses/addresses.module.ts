import { Module } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma.service';
import { AddressesRepository } from 'src/shared/database/repositories/addresses.repositories';
import { AddressesService } from './services/addresses.service';
import { ViaCepService } from './services/via-cep.service';

@Module({
  controllers: [],
  providers: [
    PrismaService,
    AddressesService,
    ViaCepService,
    AddressesRepository,
  ],
  exports: [AddressesService],
})
export class AddressesModule { }
