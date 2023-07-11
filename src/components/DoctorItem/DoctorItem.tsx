import { Doctor, TableAction } from '@/interfaces';
import { TableCell, TableRow } from '@mui/material';
import { TableCellActions } from '@/components';

export enum DoctorActionKey {
  BOOK,
  EDIT,
  DELETE,
}

export interface DoctorItemProps extends Pick<TableCellActions<DoctorActionKey>, 'onActionClick'> {
  doctor: Doctor;
  actions?: Array<TableAction<DoctorActionKey>>;
}

export function DoctorItem({ doctor, actions, onActionClick }: DoctorItemProps) {
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        {doctor._id}
      </TableCell>
      <TableCell align="left">{`${doctor.firstName} ${doctor.lastName}`}</TableCell>
      <TableCell align="left">{doctor.phoneNumber}</TableCell>
      <TableCell align="left">{doctor.address}</TableCell>
      <TableCell align="left">{doctor.speciality}</TableCell>
      <TableCellActions<DoctorActionKey> actions={actions} onActionClick={onActionClick} />
    </TableRow>
  );
}
