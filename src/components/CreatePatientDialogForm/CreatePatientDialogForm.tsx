import { Formik } from 'formik';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, styled } from '@mui/material';
import { Close as IconClose } from '@mui/icons-material';
import { DatePickerField, RadioGroupField, TextInputField } from '@/components';
import * as React from 'react';
import * as Yup from 'yup';
import { PatientGender } from '@/interfaces';
import { genderRadioGroupItems } from '@/constants';

export interface CreatePatientDialogFormValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: PatientGender | null;
  birthdate: Date | null;
}

export interface CreatePatientDialogFormProps {
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (values: CreatePatientDialogFormValues) => void;
}

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const initialValues: CreatePatientDialogFormValues = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  gender: null,
  birthdate: null,
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().min(4).required(),
  firstName: Yup.string().min(4).required(),
  lastName: Yup.string().min(4).required(),
  gender: Yup.string().oneOf([PatientGender.MALE, PatientGender.FEMALE]).required(),
  birthdate: Yup.date().required(),
});

export function CreatePatientDialogForm({ open, loading, onSubmit, onClose }: CreatePatientDialogFormProps) {
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
              Create a new patient
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
              <RadioGroupField name="gender" row items={genderRadioGroupItems} disabled={loading} />
              <DatePickerField name="birthdate" label="Address" disabled={loading} slotProps={{ textField: { fullWidth: true } }} />
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
