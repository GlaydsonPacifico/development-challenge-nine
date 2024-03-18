import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { useState } from 'react';
import { Patient } from '../../../app/entities/Patient';

export function PatientTable({ patients }: { patients: Patient[] }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  function handleChangePage(event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date de Nascimento</TableCell>
              <TableCell>Endereço</TableCell>
              <TableCell>Cidade - UF</TableCell>
              <TableCell>CEP</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.email}</TableCell>
                <TableCell>{new Date(patient.dateBirth).toLocaleDateString()}</TableCell>
                <TableCell>{patient.address.street}</TableCell>
                <TableCell>{patient.address.city} - {patient.address.state}</TableCell>
                <TableCell>{patient.address.zipCode}</TableCell>
                <TableCell>
                <Button sx={{ mr: 1 }} variant="contained" startIcon={<EditIcon />} size="small">Editar</Button>
                <Button variant="outlined" startIcon={<DeleteForeverIcon />} color="error" size="small">
                  Apagar
                </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={patients.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
