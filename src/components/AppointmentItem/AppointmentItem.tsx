import { TableCell, TableRow } from '@mui/material';
import { Appointment, TableAction } from '@/interfaces';
import { TableCellActions } from '@/components';

export enum AppointmentActionKey {}

interface AppointmentItem {
  appointment: Appointment;
  actions?: Array<TableAction<AppointmentActionKey>>;
}

export function AppointmentItem({ appointment, actions }: AppointmentItem) {
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        {appointment._id}
      </TableCell>
      <TableCell align="left">{appointment.description}</TableCell>
      <TableCell align="left">{appointment.status}</TableCell>
      <TableCell align="left">{appointment.date}</TableCell>
      <TableCellActions actions={actions} />
    </TableRow>
  );
}
