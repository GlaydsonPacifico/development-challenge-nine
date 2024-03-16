import { Injectable } from '@nestjs/common';
import { type Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AddressesRepository {
  constructor(private readonly prismaService: PrismaService) { }

  create(createDto: Prisma.AddressCreateArgs) {
    return this.prismaService.address.create(createDto);
  }

  findUnique(findUniqueDto: Prisma.AddressFindUniqueArgs) {
    return this.prismaService.address.findUnique(findUniqueDto);
  }

  findByZipCode(findFirstDto: Prisma.AddressFindFirstArgs) {
    return this.prismaService.address.findFirst(findFirstDto);
  }
}
