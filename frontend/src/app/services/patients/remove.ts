import { httpClient } from "../httpClient";

export async function remove(patientId: string) {
  return await httpClient.delete(`/patients/${patientId}`);
}