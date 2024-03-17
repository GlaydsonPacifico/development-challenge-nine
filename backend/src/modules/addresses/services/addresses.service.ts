import { Injectable, NotFoundException } from '@nestjs/common';
import { AddressesRepository } from 'src/shared/database/repositories/addresses.repositories';
import { UpdateAddressDto } from '../dto/update-address.dto';
import { ViaCepService } from './via-cep.service';

@Injectable()
export class AddressesService {
  constructor(
    private readonly addressesRepo: AddressesRepository,
    private readonly viaCepService: ViaCepService,
  ) { }

  async findByZipCode(zipCode: string, number: number) {
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
  async update(id: string, updateAddressDto: UpdateAddressDto) {
    const address = await this.addressesRepo.findUnique({
      where: { id },
    });

    if (!address) {
      throw new NotFoundException('Endereço não encontrado');
    }

    const updatedAddress = await this.addressesRepo.update({
      where: { id },
      data: {
        ...updateAddressDto,
      },
    });

    return updatedAddress;
  }
}
