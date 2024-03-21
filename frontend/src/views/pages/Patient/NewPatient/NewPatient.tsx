import UndoIcon from '@mui/icons-material/Undo';
import { Button, Stack, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { useNewPatientController } from "./useNewPatientController";

export function NewPatient() {
  const { errors, register, handleSubmit, control } = useNewPatientController();
  const navigate = useNavigate();

  function handleGoBackPage () {
    navigate("/pacientes");
  }

  return (
    <>
      <Typography variant="h5" sx={{ mb: 4 }}>Criar Paciente</Typography>

      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={2} sx={{ width: '100%', mb: 4 }}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange } }) => (
              <TextField
                label="Nome"
                type="text"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                {...register("name")}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange } }) => (
              <TextField
                label="Email"
                type="email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register("email")}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="zipCode"
            render={({ field: { onChange } }) => (
              <TextField
                label="CEP"
                type="text"
                fullWidth
                error={!!errors.zipCode}
                helperText={errors.zipCode?.message}
                {...register("zipCode")}
                onChange={onChange}
              />
            )}
          />
        </Stack>

        <Stack direction="row" spacing={2} sx={{ width: '100%', mb: 4 }}>
        <Controller
            control={control}
            name="dateBirth"
            render={({ field: { onChange } }) => (
              <TextField
                label="Date de Nascimento"
                id="dateBirth"
                type="date"
                fullWidth
                error={!!errors.dateBirth}
                InputLabelProps={{ shrink: true }}
                helperText={errors.dateBirth && "Data de nascimento inválida"}
                {...register("dateBirth")}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="number"
            render={({ field: { onChange } }) => (
              <TextField
                label="Número"
                type="number"
                fullWidth
                error={!!errors.number}
                helperText={errors.number && "Número é obrigatório"}
                {...register("number")}
                onChange={onChange}
              />
            )}
          />
        </Stack>
        <Button onClick={handleGoBackPage} variant="contained">
          <UndoIcon />
        </Button>
        <Button type="submit" variant="contained" sx={{ ml: 1 }}>
          Cadastrar
        </Button>
      </form>
    </>
  )
}