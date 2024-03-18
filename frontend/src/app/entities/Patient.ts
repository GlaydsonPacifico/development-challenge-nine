import { Address } from "./Address";

export interface Patient {
  id: string;
  name: string;
  email: string;
  dateBirth: string;
  address: Address;
}