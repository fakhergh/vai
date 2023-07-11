import { Formik } from 'formik';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, styled } from '@mui/material';
import { Close as IconClose } from '@mui/icons-material';
import { TextInputField } from '@/components';
import * as React from 'react';
import * as Yup from 'yup';

export interface UpdateDoctorDialogFormValues {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  speciality: string;
}

export interface UpdateDoctorDialogFormProps {
  initialValues: UpdateDoctorDialogFormValues;
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (values: UpdateDoctorDialogFormValues) => void;
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const validationSchema = Yup.object().shape({
  firstName: Yup.string().min(4).required(),
  lastName: Yup.string().min(4).required(),
  phoneNumber: Yup.string().required(),
  address: Yup.string().required(),
  speciality: Yup.string().required(),
});

export function UpdateDoctorDialogForm({ open, loading, initialValues, onSubmit, onClose }: UpdateDoctorDialogFormProps) {
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
              Update doctor
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
              <TextInputField name="firstName" margin="normal" fullWidth label="First Name" disabled={loading} />
              <TextInputField name="lastName" margin="normal" fullWidth label="Last name" disabled={loading} />
              <TextInputField name="phoneNumber" margin="normal" fullWidth label="Phone Number" disabled={loading} />
              <TextInputField name="address" margin="normal" fullWidth label="Address" disabled={loading} />
              <TextInputField name="speciality" margin="normal" fullWidth label="Speciality" disabled={loading} />
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose} disabled={loading}>
                Cancel
              </Button>
              <Button autoFocus onClick={() => handleSubmit()} disabled={loading}>
                Save
              </Button>
            </DialogActions>
          </Box>
        )}
      </Formik>
    </StyledDialog>
  );
}
