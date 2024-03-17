import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PatientsRepository {
  constructor(private readonly prismaService: PrismaService) { }

  create(createPatientDto: Prisma.PatientCreateArgs) {
    return this.prismaService.patient.create(createPatientDto);
  }

  findMany(findManyDto: Prisma.PatientFindManyArgs) {
    return this.prismaService.patient.findMany(findManyDto);
  }

  findUnique(findUniqueDto: Prisma.PatientFindUniqueArgs) {
    return this.prismaService.patient.findUnique(findUniqueDto);
  }

  update(updateDto: Prisma.PatientUpdateArgs) {
    return this.prismaService.patient.update(updateDto);
  }

  delete(deleteDto: Prisma.PatientDeleteArgs) {
    return this.prismaService.patient.delete(deleteDto);
  }
}