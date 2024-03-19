import { Patient } from "../../entities/Patient";
import { httpClient } from "../httpClient";

type PatientResponse = Patient;

export async function getOne(id: string) {
  const { data } = await httpClient.get<PatientResponse>(`/patients/${id}`);

  return data;
}