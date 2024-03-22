import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PatientsRepository } from 'src/shared/database/repositories/patients.repositories';
import { AddressesService } from '../addresses/services/addresses.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(
    private readonly patientsRepo: PatientsRepository,
    private readonly addressesService: AddressesService,
  ) { }


  async create(createPatientDto: CreatePatientDto) {
    const { name, email, zipCode, number, dateBirth } = createPatientDto;

    const formattedDateBirth = this.parseDateString(dateBirth);

    let address = await this.addressesService.findByZipCode(zipCode, number);

    if (!address) {
      address = await this.addressesService.create(zipCode, number);
    }

    const patientExists = await this.patientsRepo.findUnique({
      where: { email }
    })

    if (patientExists) {
      throw new ConflictException("This email is already in use.")
    }

    const patient = await this.patientsRepo.create({
      data: {
        name,
        email,
        dateBirth: formattedDateBirth,
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
      orderBy: {
        name: 'asc',
      },
      include: {
        address: true,
      }
    });
  }

  async findOne(id: string) {
    const patient = await this.patientsRepo.findUnique({
      where: { id },
      include: {
        address: true,
      }
    });

    if (!patient) {
      throw new NotFoundException("Paciente não encontrado")
    }

    return patient;
  }

  async update(id: string, updatePatientDto: UpdatePatientDto) {
    const { name, dateBirth, zipCode, number } = updatePatientDto;

    let address = await this.addressesService.findByZipCode(zipCode, number);

    if (!address) {
      address = await this.addressesService.create(zipCode, number);
    }

    const existsPatient = await this.patientsRepo.findUnique({
      where: { id },
    });

    if (!existsPatient) {
      throw new NotFoundException("Paciente não encontrado");
    }

    const updatedPatient = await this.patientsRepo.update({
      where: { id },
      data: {
        name,
        dateBirth: new Date(dateBirth),
        addressId: address.id
      },
      include: {
        address: true,
      }
    });

    return updatedPatient;
  }

  async remove(id: string) {
    await this.patientsRepo.delete({
      where: { id },
    });
  }

  private parseDateString(dateString: string | Date): Date {
    if (dateString instanceof Date) {
      return dateString;
    }

    if (typeof dateString === 'string' && dateString.includes('-')) {
      return new Date(dateString);
    }

    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
  }
}

