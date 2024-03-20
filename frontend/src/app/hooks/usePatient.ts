import { useQuery } from "@tanstack/react-query";
import { patientsService } from "../services/patients";

export function usePatient() {
  const { data = [] } = useQuery({
    queryKey: ['patients'],
    queryFn: patientsService.getAll,
  });

  async function getPatientById (id: string) {
    const patient = await patientsService.getOne(id);

    return patient;
  }

  return {
    patients: data ?? [],
    getPatientById
  }
}