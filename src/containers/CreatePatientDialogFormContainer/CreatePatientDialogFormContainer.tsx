import { CreatePatientDialogForm, CreatePatientDialogFormProps, CreatePatientDialogFormValues } from '@/components';
import * as React from 'react';
import { useCreatePatientMutation } from '@/services';
import { HttpStatusCode } from 'axios';
import { useSnackbar } from 'notistack';

interface CreatePatientDialogFormContainerProps extends Pick<CreatePatientDialogFormProps, 'open' | 'onClose'> {}

export function CreatePatientDialogFormContainer({ onClose, ...props }: CreatePatientDialogFormContainerProps) {
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: createPatientMutation, error, data, status } = useCreatePatientMutation();

  const onSubmit = React.useCallback(
    (values: CreatePatientDialogFormValues) => {
      createPatientMutation({
        email: values.email,
        password: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        gender: values.gender!,
        birthdate: values.birthdate?.toISOString()!,
      });
    },
    [createPatientMutation],
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
      enqueueSnackbar('New patient created', { variant: 'success' });
      onClose();
    }
  }, [data?.data, enqueueSnackbar, onClose]);

  return <CreatePatientDialogForm {...props} onSubmit={onSubmit} onClose={onClose} loading={status === 'loading'} />;
}
