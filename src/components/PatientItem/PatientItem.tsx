import { Patient, TableAction } from '@/interfaces';
import { capitalize, TableCell, TableRow } from '@mui/material';
import { TableCellActions } from '@/components';

export enum PatientActionKey {
  EDIT,
  DELETE,
}

export interface PatientItemProps extends Pick<TableCellActions<PatientActionKey>, 'onActionClick'> {
  patient: Patient;
  actions?: Array<TableAction<PatientActionKey>>;
}

export function PatientItem({ patient, actions, onActionClick }: PatientItemProps) {
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        {patient._id}
      </TableCell>
      <TableCell align="left">{`${patient.firstName} ${patient.lastName}`}</TableCell>
      <TableCell align="left">{patient.birthdate}</TableCell>
      <TableCell align="left">{capitalize(patient.gender)}</TableCell>
      <TableCellActions<PatientActionKey> actions={actions} onActionClick={onActionClick} />
    </TableRow>
  );
}
