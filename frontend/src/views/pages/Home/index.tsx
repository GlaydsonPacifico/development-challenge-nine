import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <Box sx={{ display: "flex", flexDirection: 'column', gap: 4, }}>
      <Typography variant="h4" sx={{ display: 'flex', justifyContent: 'center'}}>
        Bem-vindo à Medcloud!
      </Typography>

      <Typography sx={{ display: 'flex', justifyContent: 'center', letterSpacing: 2, textAlign: 'justify', maxWidth: 350, margin: 'auto'}}>
        Na Medcloud, estamos comprometidos em tornar a gestão de dados médicos mais fácil, segura e eficaz para você e seus pacientes. Com nossa aplicação web, você terá o poder de gerenciar os cadastros dos seus pacientes de forma intuitiva e eficiente.
      </Typography>

      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
        <Link to={"/pacientes"} style={{ textDecoration: 'none' }}>
          <Button
            variant="contained"
            sx={{
              my: 2,
              color: 'white',
              '&:hover': {
                background: 'rgba(0,154,223, 0.5)',
              }
            }}
          >
            <Typography>Pacientes</Typography>
          </Button>
        </Link>
      </Box>
    </Box>
  )
}