import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AddressesRepository {
  constructor(private readonly prismaService: PrismaService) { }

  create(createDto: Prisma.AddressCreateArgs) {
    return this.prismaService.address.create(createDto);
  }

  update(updateDto: Prisma.AddressUpdateArgs) {
    return this.prismaService.address.update(updateDto)
  }

  findUnique(findUniqueDto: Prisma.AddressFindUniqueArgs) {
    return this.prismaService.address.findUnique(findUniqueDto);
  }

  findByZipCode(findFirstDto: Prisma.AddressFindFirstArgs) {
    return this.prismaService.address.findFirst(findFirstDto);
  }
}
