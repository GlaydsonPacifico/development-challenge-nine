import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AddressesRepository } from './repositories/addresses.repositories';
import { PatientsRepository } from './repositories/patients.repositories';

@Global()
@Module({
  providers: [PrismaService, PatientsRepository, AddressesRepository],
  exports: [PatientsRepository, AddressesRepository],
})
export class DatabaseModule {}
