import { Dialog, DialogProps, DialogAction, OnDialogActionClickEvent } from '@/components';
import * as React from 'react';
import { useDeleteDoctorMutation } from '@/services';
import { HttpStatusCode } from 'axios';
import { useSnackbar } from 'notistack';

enum DeleteDialogActionKey {
  CLOSE,
  CONFIRM,
}

interface DeleteDoctorDialogContainer extends Pick<DialogProps<DeleteDialogActionKey>, 'title' | 'description' | 'open' | 'onClose'> {
  doctorId: string;
}

const deleteDialogActions: Array<DialogAction<DeleteDialogActionKey>> = [
  {
    itemKey: DeleteDialogActionKey.CLOSE,
    label: 'Cancel',
  },
  {
    itemKey: DeleteDialogActionKey.CONFIRM,
    label: 'Confirm',
    color: 'error',
  },
];

export function DeleteDoctorDialogContainer({ doctorId, open, title, description, onClose }: DeleteDoctorDialogContainer) {
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: deleteDoctorMutation, error, data, status } = useDeleteDoctorMutation();

  const onDeleteDialogActionClick: OnDialogActionClickEvent<DeleteDialogActionKey> = React.useCallback(
    key => {
      switch (key) {
        case DeleteDialogActionKey.CLOSE:
          onClose();
          break;
        case DeleteDialogActionKey.CONFIRM:
          deleteDoctorMutation(doctorId);
          break;
      }
    },
    [deleteDoctorMutation, doctorId, onClose],
  );

  React.useEffect(() => {
    switch (error?.response?.status) {
      case HttpStatusCode.Forbidden:
        enqueueSnackbar('Doctor cannot be delete as he has appointments', { variant: 'error' });
        break;
      case HttpStatusCode.InternalServerError:
        enqueueSnackbar('Server error', { variant: 'error' });
        break;
    }
  }, [enqueueSnackbar, error?.response?.status]);

  React.useEffect(() => {
    if (data?.data) {
      enqueueSnackbar('Doctor deleted', { variant: 'success' });
      onClose();
    }
  }, [data?.data, enqueueSnackbar, onClose]);

  return (
    <Dialog
      loading={status === 'loading'}
      title={title}
      description={description}
      open={open}
      onClose={onClose}
      actions={deleteDialogActions}
      onActionClick={onDeleteDialogActionClick}
    />
  );
}
