import { useQuery } from "@tanstack/react-query";
import { patientsService } from "../services/patients";

export function usePatient() {
  const { data = [] } = useQuery({
    queryKey: ['patients'],
    queryFn: patientsService.getAll,
  });

  return {
    patients: data ?? [],
  }
};