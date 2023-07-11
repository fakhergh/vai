import { UpdateDoctorDialogForm, UpdateDoctorDialogFormProps, UpdateDoctorDialogFormValues } from '@/components';
import * as React from 'react';
import { useUpdateDoctorMutation } from '@/services';
import { HttpStatusCode } from 'axios';
import { useSnackbar } from 'notistack';

interface EditDoctorDialogFormContainerProps extends Omit<UpdateDoctorDialogFormProps, 'onSubmit' | 'loading'> {
  doctorId: string;
}

export function UpdateDoctorDialogFormContainer({ doctorId, onClose, ...props }: EditDoctorDialogFormContainerProps) {
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: updateDoctorMutation, data, status, error } = useUpdateDoctorMutation(doctorId);

  const onSubmit = React.useCallback(
    (values: UpdateDoctorDialogFormValues) => {
      updateDoctorMutation({
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        address: values.address,
        speciality: values.speciality,
      });
    },
    [updateDoctorMutation],
  );

  React.useEffect(() => {
    switch (error?.response?.status) {
      case HttpStatusCode.NoContent:
        enqueueSnackbar('Doctor not found', { variant: 'error' });
        break;
      case HttpStatusCode.InternalServerError:
        enqueueSnackbar('Server error', { variant: 'error' });
        break;
    }
  }, [enqueueSnackbar, error?.response?.status]);

  React.useEffect(() => {
    if (data?.data) {
      enqueueSnackbar('Doctor updated', { variant: 'success' });
      onClose();
    }
  }, [data?.data, enqueueSnackbar, onClose]);

  return <UpdateDoctorDialogForm {...props} loading={status === 'loading'} onClose={onClose} onSubmit={onSubmit} />;
}
