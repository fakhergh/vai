import { UpdatePatientDialogForm, UpdatePatientDialogFormProps, UpdatePatientDialogFormValues } from '@/components';
import * as React from 'react';
import { useUpdatePatientMutation } from '@/services';
import { HttpStatusCode } from 'axios';
import { useSnackbar } from 'notistack';

interface UpdatePatientDialogFormContainerProps extends Omit<UpdatePatientDialogFormProps, 'onSubmit' | 'loading'> {
  patientId: string;
}

export function UpdatePatientDialogFormContainer({ patientId, onClose, ...props }: UpdatePatientDialogFormContainerProps) {
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: updatePatientMutation, data, status, error } = useUpdatePatientMutation(patientId);

  const onSubmit = React.useCallback(
    (values: UpdatePatientDialogFormValues) => {
      updatePatientMutation({
        firstName: values.firstName,
        lastName: values.lastName,
        gender: values.gender,
        birthdate: values.birthdate.toISOString(),
      });
    },
    [updatePatientMutation],
  );

  React.useEffect(() => {
    switch (error?.response?.status) {
      case HttpStatusCode.NoContent:
        enqueueSnackbar('Patient not found', { variant: 'error' });
        break;
      case HttpStatusCode.InternalServerError:
        enqueueSnackbar('Server error', { variant: 'error' });
        break;
    }
  }, [enqueueSnackbar, error?.response?.status]);

  React.useEffect(() => {
    if (data?.data) {
      enqueueSnackbar('Patient updated', { variant: 'success' });
      onClose();
    }
  }, [data?.data, enqueueSnackbar, onClose]);

  return <UpdatePatientDialogForm {...props} loading={status === 'loading'} onClose={onClose} onSubmit={onSubmit} />;
}
