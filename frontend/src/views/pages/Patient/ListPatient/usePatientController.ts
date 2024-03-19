import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { usePatient } from "../../../../app/hooks/usePatient";
import { patientsService } from "../../../../app/services/patients";

export function usePatientController() {
  const { patients } = usePatient();

  const queryClient = useQueryClient();

  async function handleDeletePatient (patientId: string) {
    try {
      await patientsService.remove(patientId);
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      toast.success("Paciente apagado");
    } catch (error) {
      toast.error("Erro ao apagar paciente.");
    }
  };

  return {
    patients,
    handleDeletePatient
  };
}