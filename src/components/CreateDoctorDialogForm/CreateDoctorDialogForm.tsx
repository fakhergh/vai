import { Formik } from 'formik';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, styled } from '@mui/material';
import { Close as IconClose } from '@mui/icons-material';
import { TextInputField } from '@/components';
import * as React from 'react';
import * as Yup from 'yup';

export interface CreateDoctorDialogFormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  speciality: string;
  phoneNumber: string;
}

export interface CreateDoctorDialogFormProps {
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (values: CreateDoctorDialogFormValues) => void;
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const initialValues: CreateDoctorDialogFormValues = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  address: '',
  speciality: '',
  phoneNumber: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(4).required(),
  firstName: Yup.string().min(4).required(),
  lastName: Yup.string().min(4).required(),
  address: Yup.string().required(),
  speciality: Yup.string().required(),
  phoneNumber: Yup.string().required(),
});

export function CreateDoctorDialogForm({ open, loading, onSubmit, onClose }: CreateDoctorDialogFormProps) {
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
              Create a new doctor
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
              <TextInputField name="email" margin="normal" fullWidth label="Email" disabled={loading} type="email" />
              <TextInputField name="password" margin="normal" fullWidth label="Password" disabled={loading} type="password" />
              <TextInputField name="firstName" margin="normal" fullWidth label="First Name" disabled={loading} />
              <TextInputField name="lastName" margin="normal" fullWidth label="Last name" disabled={loading} />
              <TextInputField name="address" margin="normal" fullWidth label="Address" disabled={loading} />
              <TextInputField name="speciality" margin="normal" fullWidth label="Speciality" disabled={loading} />
              <TextInputField name="phoneNumber" margin="normal" fullWidth label="Phone Number" disabled={loading} />
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
