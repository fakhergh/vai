import { CreateDoctorDialogForm, CreateDoctorDialogFormProps, CreateDoctorDialogFormValues } from '@/components';
import * as React from 'react';
import { useCreateDoctorMutation } from '@/services';
import { HttpStatusCode } from 'axios';
import { useSnackbar } from 'notistack';

interface CreateDoctorDialogFormContainerProps extends Pick<CreateDoctorDialogFormProps, 'open' | 'onClose'> {}

export function CreateDoctorDialogFormContainer({ onClose, ...props }: CreateDoctorDialogFormContainerProps) {
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: createDoctorMutation, error, data, status } = useCreateDoctorMutation();

  const onSubmit = React.useCallback(
    (values: CreateDoctorDialogFormValues) => {
      createDoctorMutation({
        email: values.email,
        password: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        address: values.address,
        speciality: values.speciality,
        phoneNumber: values.phoneNumber,
      });
    },
    [createDoctorMutation],
  );

  React.useEffect(() => {
    switch (error?.response?.status) {
      case HttpStatusCode.Conflict:
        enqueueSnackbar('Email already in use', { variant: 'error' });
        break;
      case HttpStatusCode.InternalServerError:
        enqueueSnackbar('Server error', { variant: 'error' });
        break;
    }
  }, [enqueueSnackbar, error?.response?.status]);

  React.useEffect(() => {
    if (data?.data) {
      enqueueSnackbar('New doctor created', { variant: 'success' });
      onClose();
    }
  }, [data?.data, enqueueSnackbar, onClose]);

  return <CreateDoctorDialogForm {...props} onSubmit={onSubmit} onClose={onClose} loading={status === 'loading'} />;
}
