import { usePatient } from "../../../app/hooks/usePatient";

export function usePatientController() {
  const { patients, isLoading } = usePatient();

  return {
    patients,
    isLoading,
  }
}