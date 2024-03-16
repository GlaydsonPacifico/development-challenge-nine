import { Module } from '@nestjs/common';
import { PatientsModule } from './modules/patients/patients.module';
import { DatabaseModule } from './shared/database/database.module';
import { AddressesModule } from './modules/addresses/addresses.module';

@Module({
  imports: [PatientsModule, DatabaseModule, AddressesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
