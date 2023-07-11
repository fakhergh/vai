import * as React from 'react';
import { Formik } from 'formik';
import { DialogTitle, IconButton, Button, Dialog, DialogActions, DialogContent, styled, Box } from '@mui/material';
import { Close as IconClose } from '@mui/icons-material';
import { AppointmentDateTimePickerField, TextInputField } from '@/components';
import * as Yup from 'yup';

export interface CreateAppointmentDialogFormValues {
  description: string;
  date: null;
}

export interface CreateAppointmentDialogFormProps {
  loading?: boolean;
  open: boolean;
  onClose: () => void;
  onSubmit: (values: CreateAppointmentDialogFormValues) => void;
}

const initialValues: CreateAppointmentDialogFormValues = {
  description: '',
  date: null,
};

const validationSchema = Yup.object().shape({
  description: Yup.string().required(),
  date: Yup.date().required(),
});

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export function CreateAppointmentDialogForm({ loading, onSubmit, onClose, open }: CreateAppointmentDialogFormProps) {
  const handleClose: React.ReactEventHandler<{}> = React.useCallback(() => {
    if (loading) return;
    onClose();
  }, [loading, onClose]);

  return (
    <StyledDialog onClose={handleClose} open={open} disableEscapeKeyDown={loading}>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ handleSubmit }) => (
          <Box>
            <DialogTitle sx={{ m: 0, p: 2 }}>
              Book a new appointment
              <IconButton
                disabled={loading}
                onClick={onClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: theme => theme.palette.grey[500],
                }}
              >
                <IconClose />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              <TextInputField name="description" margin="normal" fullWidth label="Description" disabled={loading} />
              <AppointmentDateTimePickerField
                name="date"
                slotProps={{
                  textField: {
                    fullWidth: true,
                    disabled: loading,
                  },
                }}
                disabled={loading}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} disabled={loading}>
                Cancel
              </Button>
              <Button autoFocus onClick={() => handleSubmit()} disabled={loading}>
                Book
              </Button>
            </DialogActions>
          </Box>
        )}
      </Formik>
    </StyledDialog>
  );
}
