import { Module } from '@nestjs/common';
import { AddressesModule } from '../addresses/addresses.module';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';

@Module({
  imports: [AddressesModule],
  controllers: [PatientsController],
  providers: [PatientsService],
})
export class PatientsModule { }
