import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { Patient } from "../../../../app/entities/Patient";
import { usePatient } from "../../../../app/hooks/usePatient";

const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Informe um e-mail válido").required("Email é obrigatório"),
  dateBirth: yup.date().required(),
  number: yup.number().required("Número é obrigatório"),
  zipCode: yup.string().required("Cep é obrigatório"),
});

type FormData = yup.InferType<typeof schema>;

export function useEditPatientController() {
  const navigate = useNavigate();
  const { getPatientById  } = usePatient();

  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    console.log(patient);
  }, [patient]);


  async function handleEditPatient(id: string) {
    const patient = await getPatientById(id);
    navigate(`/pacientes/${id}/editar`);
    setPatient(patient);

    console.log(patient)
    return patient;
  }

  console.log(patient?.name)

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: patient?.name,
      email: patient?.email,
      zipCode: patient?.address.zipCode,
      number: patient?.address.number,
    },
  });

  return {
    handleEditPatient,
    getPatientById,
    register,
    errors,
    hookFormSubmit
  }
}