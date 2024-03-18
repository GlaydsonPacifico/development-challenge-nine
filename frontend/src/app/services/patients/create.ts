import { httpClient } from "../httpClient";

interface CreatePatientParams {
  name: string;
  email: string;
  dateBirth: Date;
  number: number;
  zipCode: string;
};


export async function create(params: CreatePatientParams) {
  const { data } = await httpClient.post("/patients", params);

  console.log(data)

  return data;
}