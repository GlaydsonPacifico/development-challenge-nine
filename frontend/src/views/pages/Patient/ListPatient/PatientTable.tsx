import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { useState } from 'react';
import { Patient } from '../../../../app/entities/Patient';
import { useEditPatientController } from '../EditPatient/useEditPatientController';
import { usePatientController } from './usePatientController';

export function PatientTable({ patients }: { patients: Patient[] }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { handleEditPatient } = useEditPatientController();
  const { handleDeletePatient } = usePatientController();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [patientId, setPatientId] = useState("");


  function handleClickOpenDeleteDialog(patientId: string) {
    setPatientId(patientId);
    setOpenDeleteDialog(true);
  };

  function handleCloseDeleteDialog() {
    setPatientId("");
    setOpenDeleteDialog(false);
  };

  async function handleConfirmDelete() {
    await handleDeletePatient(patientId);
    handleCloseDeleteDialog();
  };

    function handleClickOpenEditDialog(patientId: string) {
      setPatientId(patientId);
    setOpenEditDialog(true);
  };

  function handleCloseEditDialog() {
    setPatientId("");
    setOpenEditDialog(false);
  };

  async function handleConfirmEdit() {
    await handleEditPatient(patientId);
    handleCloseEditDialog();
  };

  function handleChangePage(_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) {
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
                <TableCell>{new Date(patient.dateBirth).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}</TableCell>
                <TableCell>{patient.address.street}, {patient.address.number}</TableCell>
                <TableCell>{patient.address.city} - {patient.address.state}</TableCell>
                <TableCell>{patient.address.zipCode}</TableCell>
                <TableCell>
                  <Button
                    sx={{ mr: 1, mb: { xs: 1, md: 0 } }}
                    variant="contained"
                    startIcon={<EditIcon />}
                    size="small"
                    onClick={() => handleClickOpenEditDialog(patient.id)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<DeleteForeverIcon />}
                    color="error"
                    size="small"
                    onClick={() => handleClickOpenDeleteDialog(patient.id)}
                  >
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

      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmar exclusão"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja excluir este paciente?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmar edição"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Deseja editar este paciente?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleConfirmEdit} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
