import { Box, Button } from '@mui/material';
import * as React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextInputField } from '@/components';

export interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
  loading?: boolean;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

const defaultInitialValues: LoginFormValues = {
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

export function LoginForm({ loading, onSubmit }: LoginFormProps) {
  return (
    <Formik initialValues={defaultInitialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ handleSubmit }) => (
        <Box>
          <TextInputField name="email" margin="normal" fullWidth label="Email Address" autoComplete="email" autoFocus disabled={loading} />
          <TextInputField
            name="password"
            margin="normal"
            fullWidth
            label="Password"
            type="password"
            autoComplete="current-password"
            autoFocus
            disabled={loading}
          />
          <Button fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading} onClick={() => handleSubmit()} autoFocus>
            Sign In
          </Button>
        </Box>
      )}
    </Formik>
  );
}
