import UndoIcon from '@mui/icons-material/Undo';
import { Button, Stack, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEditPatientController } from "./useEditPatientController";

export function EditPatient() {
  const { errors, register, handleSubmit, control } = useEditPatientController();
  const navigate = useNavigate();

  function handleGoBackPage () {
    navigate("/pacientes");
  }

  return (
    <>
      <Typography variant="h5" sx={{ mb: 4 }}>Editar Paciente</Typography>

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
                InputLabelProps={{ shrink: true }}
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
                disabled
                InputLabelProps={{ shrink: true }}
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
                InputLabelProps={{ shrink: true }}
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
                type="date"
                fullWidth
                error={!!errors.dateBirth}
                helperText={errors.dateBirth && "Data de nascimento inválida"}
                {...register("dateBirth")}
                InputLabelProps={{ shrink: true }}
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
                InputLabelProps={{ shrink: true }}
                onChange={onChange}
              />
            )}
          />
        </Stack>

        <Stack direction="row" spacing={2} sx={{ width: '100%', mb: 4 }}>
          <Controller
            control={control}
            name="street"
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Endereço"
                type="text"
                fullWidth
                disabled
                InputLabelProps={{ shrink: true }}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="city"
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Cidade"
                type="text"
                fullWidth
                disabled
                InputLabelProps={{ shrink: true }}
                onChange={onChange}
                value={value}
              />
            )}
          />
          <Controller
            control={control}
            name="state"
            render={({ field: { onChange, value } }) => (
              <TextField
                label="Estado"
                type="text"
                fullWidth
                disabled
                InputLabelProps={{ shrink: true }}
                onChange={onChange}
                value={value}
              />
            )}
          />
        </Stack>
        <Button onClick={handleGoBackPage} variant="contained">
          <UndoIcon />
        </Button>
        <Button type="submit" variant="contained" sx={{ ml: 1 }}>
          Atualizar
        </Button>
      </form>
    </>
  )
}