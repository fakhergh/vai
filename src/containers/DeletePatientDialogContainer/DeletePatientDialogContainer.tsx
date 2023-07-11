import { Dialog, DialogProps, DialogAction, OnDialogActionClickEvent } from '@/components';
import * as React from 'react';
import { useDeletePatientMutation } from '@/services';
import { HttpStatusCode } from 'axios';
import { useSnackbar } from 'notistack';

enum DeleteDialogActionKey {
  CLOSE,
  CONFIRM,
}

interface DeletePatientDialogContainer extends Pick<DialogProps<DeleteDialogActionKey>, 'title' | 'description' | 'open' | 'onClose'> {
  patientId: string;
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

export function DeletePatientDialogContainer({ patientId, open, title, description, onClose }: DeletePatientDialogContainer) {
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: deletePatientMutation, error, data, status } = useDeletePatientMutation();

  const onDeleteDialogActionClick: OnDialogActionClickEvent<DeleteDialogActionKey> = React.useCallback(
    key => {
      switch (key) {
        case DeleteDialogActionKey.CLOSE:
          onClose();
          break;
        case DeleteDialogActionKey.CONFIRM:
          deletePatientMutation(patientId);
          break;
      }
    },
    [deletePatientMutation, patientId, onClose],
  );

  React.useEffect(() => {
    switch (error?.response?.status) {
      case HttpStatusCode.Forbidden:
        enqueueSnackbar('Patient cannot be delete as has appointments', { variant: 'error' });
        break;
      case HttpStatusCode.InternalServerError:
        enqueueSnackbar('Server error', { variant: 'error' });
        break;
    }
  }, [enqueueSnackbar, error?.response?.status]);

  React.useEffect(() => {
    if (data?.data) {
      enqueueSnackbar('Patient deleted', { variant: 'success' });
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
