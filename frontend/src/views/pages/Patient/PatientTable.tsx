import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Patient } from '../../../app/entities/Patient';

export function PatientTable({ patients }: { patients: Patient[]}) {

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
            </TableRow>
          </TableHead>
          <TableBody>
              {patients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.email}</TableCell>
                  <TableCell>{new Date(patient.dateBirth).toLocaleDateString()}</TableCell>
                  <TableCell>{patient.address.street}</TableCell>
                  <TableCell>{patient.address.city} - {patient.address.state}</TableCell>
                  <TableCell>{patient.address.zipCode}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
