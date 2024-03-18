import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { PatientTable } from "./PatientTable";
import { usePatientController } from "./usePatientController";

export function Patient() {
  const { patients } = usePatientController();

  return (
    <>
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Listar Pacientes</Typography>
        <Link to={"/pacientes/novo"} style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            sx={{
              my: 2,
              color: 'white',
              '&:hover': {
                transition: 0.5,
                background: 'rgba(0,154,223, 0.5)',
              }
            }}
          >
            <Typography>Novo Paciente</Typography>
          </Button>
        </Link>
      </Box>
      <PatientTable patients={patients}/>
    </>
  )
}