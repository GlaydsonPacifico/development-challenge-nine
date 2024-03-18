import { useQuery } from "@tanstack/react-query";
import { PatientService } from "../services/patients";

export function usePatient() {
  const { data = [], isLoading } = useQuery({
    queryKey: ['patients'],
    queryFn: PatientService.getAll,
  });

  return {
    patients: data ?? [],
    isLoading,
  }
};