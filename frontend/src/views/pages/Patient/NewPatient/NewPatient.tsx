import { Button, Stack, TextField, Typography } from "@mui/material";
import { useNewPatientController } from "./useNewPatientController";

export function NewPatient() {
  const { errors, register, handleSubmit } = useNewPatientController();

  return (
    <>
      <Typography variant="h5" sx={{ mb: 4 }}>Criar Paciente</Typography>

      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={2} sx={{ width: '100%', mb: 4 }}>
          <TextField
            label="Nome"
            type="text"
            fullWidth
            error={!!errors.name}
            helperText={errors.name?.message}
            {...register("name")}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
            {...register("email")}
          />
          <TextField
            label="CEP"
            type="text"
            fullWidth
            error={!!errors.zipCode}
            helperText={errors.zipCode?.message}
            {...register("zipCode")}
          />
        </Stack>

        <Stack direction="row" spacing={2} sx={{ width: '100%', mb: 4 }}>
          <TextField
            label="Date de Nascimento"
            id="dateBirth"
            type="date"
            fullWidth
            error={!!errors.dateBirth}
            InputLabelProps={{ shrink: true }}
            helperText={errors.dateBirth && "Data de nascimento inválida"}
            {...register("dateBirth", { required: "Data de nascimento é obrigatória" })}
          />
          <TextField
            label="Número"
            type="number"
            fullWidth
            error={!!errors.number}
            helperText={errors.number && "Número é obrigatório"}
            {...register("number")}
          />
        </Stack>
        <Button type="submit" variant="contained">
          Cadastrar
        </Button>
      </form>
    </>
  )
}