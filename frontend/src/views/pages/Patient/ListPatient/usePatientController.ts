import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { usePatient } from "../../../../app/hooks/usePatient";
import { patientsService } from "../../../../app/services/patients";

export function usePatientController() {
  const { patients } = usePatient();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const handleDeletePatient = async (patientId: string) => {
    try {
      await patientsService.remove(patientId);
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      toast.success("Paciente apagado");
    } catch (error) {
      toast.error("Erro ao apagar paciente.");
    }
  };

  const handleEditPatient = async (patientId: string) => {
    navigate(`/pacientes/${patientId}/editar`);
  };

  return {
    patients,
    handleDeletePatient,
    handleEditPatient
  };
}