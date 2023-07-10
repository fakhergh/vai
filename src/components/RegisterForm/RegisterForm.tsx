import { Box, Button, Grid } from '@mui/material';
import * as React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { PatientGender } from '@/interfaces';
import { DatePickerField, RadioGroupField, RadioItemProps, TextInputField } from '@/components';

export interface RegisterFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: PatientGender | null;
  birthdate: Date | null;
}

export interface RegisterFormProps {
  loading?: boolean;
  onSubmit: (values: RegisterFormValues) => void;
}

const initialValues: RegisterFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  gender: null,
  birthdate: null,
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().min(4).required(),
  lastName: Yup.string().min(4).required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(4).required(),
  gender: Yup.string().oneOf([PatientGender.MALE, PatientGender.FEMALE]).required(),
  birthdate: Yup.date().required(),
});

const genderItems: Array<RadioItemProps> = [
  {
    key: 'male',
    value: PatientGender.MALE,
    label: 'Male',
  },
  { key: 'female', value: PatientGender.FEMALE, label: 'Female' },
];

export function RegisterForm({ onSubmit, loading }: RegisterFormProps) {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextInputField name="firstName" fullWidth label="First Name" autoComplete="given-name" autoFocus disabled={loading} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextInputField name="lastName" fullWidth label="Last Name" autoComplete="family-name" disabled={loading} />
            </Grid>
            <Grid item xs={12}>
              <TextInputField name="email" fullWidth label="Email Address" autoComplete="email" disabled={loading} />
            </Grid>
            <Grid item xs={12}>
              <TextInputField name="password" fullWidth label="Password" type="password" autoComplete="new-password" disabled={loading} />
            </Grid>
            <Grid item xs={12}>
              <RadioGroupField row name="gender" items={genderItems} disabled={loading} />
            </Grid>
            <Grid item xs={12}>
              <DatePickerField name="birthdate" slotProps={{ textField: { fullWidth: true } }} disabled={loading} />
            </Grid>
          </Grid>

          <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading} onClick={() => handleSubmit()}>
            Sign Up
          </Button>
        </Box>
      )}
    </Formik>
  );
}
