import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from 'yup';
import { Patient } from "../../../../app/entities/Patient";
import { usePatient } from "../../../../app/hooks/usePatient";
import { patientsService } from "../../../../app/services/patients";

const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Informe um e-mail válido").required("Email é obrigatório"),
  dateBirth: yup.date().required(),
  number: yup.number().required("Número é obrigatório"),
  zipCode: yup.string().required("Cep é obrigatório").length(8, "O CEP deve ter 8 caracteres"),
  street: yup.string().nullable(),
  city: yup.string().nullable(),
  state: yup.string().nullable(),
});

type FormData = yup.InferType<typeof schema>;

export function useEditPatientController() {
  const navigate = useNavigate();
  const { getPatientById } = usePatient();
  const { id } = useParams();

  const [patientData, setPatientData] = useState<Patient | null>(null);


  useEffect(() => {
    const fetchPatient = async () => {
      if (id) {
        const patient = await getPatientById(id);
        if (patient) {
          setPatientData(patient);
        }
      }
    };

    fetchPatient();
  }, [id]);

  useEffect(() => {
    if (patientData) {
      setValue('name', patientData.name);
      setValue('email', patientData.email);
      setValue('zipCode', patientData.address?.zipCode);
      setValue('dateBirth', new Date(patientData.dateBirth));
      setValue('number', patientData.address?.number);
      setValue('street', patientData.address?.street);
      setValue('city', patientData.address?.city);
      setValue('state', patientData.address?.state);
    }
  }, [patientData]);

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
    setValue
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });


  async function handleEditPatient(id: string) {
    try {
      navigate(`/pacientes/${id}/editar`);
    } catch (error) {
    }
  }

  const {
    mutateAsync: updatePatient
  } = useMutation({
    mutationFn: patientsService.update,
  });

  const queryClient = useQueryClient();

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      if(!id) {
        return;
      }

      if (id) {
        await updatePatient({
          id,
          ...data
        });
        queryClient.invalidateQueries({ queryKey: ['patients'] });
        toast.success("Paciente atualizado")
        navigate('/pacientes');
      }
    } catch (error) {
      if (error && (error as any).response && (error as any).response.status === 404) {
        toast.error("CEP não encontrado");
      } else {
        toast.error("Erro ao atualizar o paciente");
      }
    }
  });

  return {
    handleEditPatient,
    register,
    errors,
    handleSubmit,
    control
  };
}