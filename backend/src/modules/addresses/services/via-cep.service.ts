import { Injectable, NotFoundException } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class ViaCepService {
  async getCEPInfo(cep: string) {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

      if (!response.ok) {
        throw new NotFoundException('Cep not found.');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw new NotFoundException('Cep not found.');
    }
  }
}
