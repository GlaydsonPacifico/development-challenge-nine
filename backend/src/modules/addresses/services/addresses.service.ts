import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressesRepository } from 'src/shared/database/repositories/addresses.repositories';
import { ViaCepService } from './via-cep.service';

@Injectable()
export class AddressesService {
  constructor(
    private readonly addressesRepo: AddressesRepository,
    private readonly viaCepService: ViaCepService,
  ) {}

  async findByZipCoded(zipCode: string, number: number) {
    return await this.addressesRepo.findByZipCode({
      where: { zipCode, number },
    });
  }

  async create(zipCode: string, number: number) {
    const cepInfo = await this.viaCepService.getCEPInfo(zipCode);

    if (cepInfo.erro) {
      throw new NotFoundException('CEP not found');
    }

    return this.addressesRepo.create({
      data: {
        street: cepInfo.logradouro,
        district: cepInfo.bairro,
        number,
        city: cepInfo.localidade,
        state: cepInfo.uf,
        zipCode,
      },
    });
  }
}
