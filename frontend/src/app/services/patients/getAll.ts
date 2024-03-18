import { Patient } from "../../entities/Patient";
import { httpClient } from "../httpClient";

type PatientResponse = Array<Patient>;

export async function getAll() {
  const { data } = await httpClient.get<PatientResponse>("/patients");

  return data;
}