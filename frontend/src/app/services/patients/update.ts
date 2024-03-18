import { httpClient } from "../httpClient";

export interface UpdatePatientParams {
  id: string;
  name: string;
  email: string;
  dateBirth: Date;
  number: number;
  zipCode: string;
}

export async function update({id, ...params}: UpdatePatientParams) {
  const { data } = await httpClient.put(`/patients/${id}`, params);

  return data;
}