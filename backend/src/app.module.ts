import { Module } from '@nestjs/common';
import { AddressesModule } from './modules/addresses/addresses.module';
import { PatientsModule } from './modules/patients/patients.module';
import { DatabaseModule } from './shared/database/database.module';

@Module({
  imports: [PatientsModule, DatabaseModule, AddressesModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
