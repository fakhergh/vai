import { Paper, TableContainer, TableBody, Table, TableHead, TableCell, TableRow } from '@mui/material';
import { Appointment } from '@/interfaces';

interface AppointmentListProps {
  appointments: Array<Appointment>;
}

export function AppointmentList({ appointments }: AppointmentListProps) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map(appointment => (
            <TableRow key={appointment._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {appointment._id}
              </TableCell>
              <TableCell align="left">{appointment.description}</TableCell>
              <TableCell align="left">{appointment.status}</TableCell>
              <TableCell align="left">{appointment.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
