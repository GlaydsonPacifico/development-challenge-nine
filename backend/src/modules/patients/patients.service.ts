import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { PatientsRepository } from 'src/shared/database/repositories/patients.repositories';
import { AddressesService } from '../addresses/services/addresses.service';
import { CreatePatientDto } from './dto/create-patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    private readonly patientsRepo: PatientsRepository,
    private readonly addressesService: AddressesService,
  ) {}


  async create(createPatientDto: CreatePatientDto) {
    const { name, email, zipCode, number, dateBirth } = createPatientDto;

      let address = await this.addressesService.findByZipCoded(zipCode, number);

      if (!address) {
        address = await this.addressesService.create(zipCode, number);
      }

      const patientExists = await this.patientsRepo.findUnique({
        where: { email }
      })

      if(patientExists) {
        throw new ConflictException("This email is already in use.")
      }

      const patient = await this.patientsRepo.create({
        data: {
          name,
          email,
          dateBirth: new Date(dateBirth),
          addressId: address.id,
        },
        include: {
          address: true,
        },
      });

      return patient;
  }

  async findAll() {
    return this.patientsRepo.findMany({
      include: {
        address: true,
      }
    });
  }

  async findOne(id: string) {
    return await this.patientsRepo.findUnique({
      where: { id },
      include: {
        address: true,
      }
    });
  }

  async remove(id: string) {
    const existsPatient = await this.patientsRepo.findUnique({
      where: { id },
    });

    if(!existsPatient) {
      throw new BadRequestException();
    }

    await this.patientsRepo.delete({
      where: { id },
    })
  }
}
