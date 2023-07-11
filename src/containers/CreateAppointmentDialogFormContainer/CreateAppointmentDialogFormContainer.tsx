import * as React from 'react';
import { CreateAppointmentDialogForm, CreateAppointmentDialogFormProps, CreateAppointmentDialogFormValues } from '@/components';
import { useCreateAppointmentMutation } from '@/services';
import { HttpStatusCode } from 'axios';
import { useSnackbar } from 'notistack';

interface CreateAppointmentDialogFormContainer extends Omit<CreateAppointmentDialogFormProps, 'onSubmit'> {
  doctorId: string;
}

export function CreateAppointmentDialogFormContainer({ doctorId, onClose, ...props }: CreateAppointmentDialogFormContainer) {
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: createAppointmentMutation, data, error, status } = useCreateAppointmentMutation();

  const onSubmit = React.useCallback(
    (values: CreateAppointmentDialogFormValues) => {
      createAppointmentMutation({ doctorId, description: values.description, date: values.date! });
    },
    [createAppointmentMutation, doctorId],
  );

  React.useEffect(() => {
    if (data?.data) {
      enqueueSnackbar('Appointment booked', { variant: 'success' });
      onClose();
    }
  }, [data?.data, enqueueSnackbar, onClose]);

  React.useEffect(() => {
    switch (error?.response?.status) {
      case HttpStatusCode.Conflict:
        enqueueSnackbar('Schedule time unavailable, please try another time', { variant: 'error' });
        break;
      case HttpStatusCode.InternalServerError:
        enqueueSnackbar('Server error', { variant: 'error' });
        break;
    }
  }, [enqueueSnackbar, error?.response?.status]);

  return <CreateAppointmentDialogForm {...props} onSubmit={onSubmit} onClose={onClose} loading={status === 'loading'} />;
}
