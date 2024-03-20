import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { patientsService } from "../../../../app/services/patients";

const schema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().email("Informe um e-mail válido").required("Email é obrigatório"),
  dateBirth: yup.date().required(),
  number: yup.number().required("Número é obrigatório"),
  zipCode: yup.string().required("Cep é obrigatório").length(8, "O CEP deve ter 8 caracteres"),
});

type FormData = yup.InferType<typeof schema>;

export function useNewPatientController() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit: hookFormSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  const { mutateAsync } = useMutation({
    mutationFn: patientsService.create,
  })

  const queryClient = useQueryClient();

  const handleSubmit = hookFormSubmit(async (data) => {
    try {
      await mutateAsync({
        ...data,
      });

      queryClient.invalidateQueries({ queryKey: ['patients'] });
      toast.success("Paciente cadastrado com sucesso")
      navigate('/pacientes');
    } catch (error) {
      toast.error("Erro ao criar o paciente")
    }
  });

  return {
    register,
    errors,
    handleSubmit,
    control,
  }
}