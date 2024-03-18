import { usePatient } from "../../../app/hooks/usePatient";

export function usePatientController() {
  const { patients } = usePatient();

  return {
    patients,
  };
}