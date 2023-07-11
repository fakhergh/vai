import { DoctorActionKey, DoctorItem, DoctorItemProps, OnActionClickEvent } from '@/components';
import * as React from 'react';
import { Box } from '@mui/material';
import { CreateAppointmentDialogFormContainer } from '@/containers';

interface DoctorItemContainerProps extends Omit<DoctorItemProps, 'onActionClick'> {}

export function DoctorItemContainer(props: DoctorItemContainerProps) {
  const [open, setOpen] = React.useState(false);

  const onClose = React.useCallback(() => setOpen(false), []);

  const onActionClick: OnActionClickEvent<DoctorActionKey> = React.useCallback((key: DoctorActionKey) => {
    if (key === DoctorActionKey.BOOK) {
      setOpen(true);
    }
  }, []);

  return (
    <>
      <DoctorItem {...props} onActionClick={onActionClick} />
      <CreateAppointmentDialogFormContainer doctorId={props.doctor._id} open={open} onClose={onClose} />
    </>
  );
}
