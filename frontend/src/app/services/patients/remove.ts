import { httpClient } from "../httpClient";

export async function remove(patientId: string) {
  await httpClient.delete(`/patients/${patientId}`);
}