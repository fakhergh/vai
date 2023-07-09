import { TextField, OutlinedTextFieldProps, Box } from '@mui/material';
import * as React from 'react';
import { BaseFormProps } from '@/interfaces';
import { useField } from 'formik';

interface TextInputFieldProps extends Omit<OutlinedTextFieldProps, 'name' | 'value' | 'onChange' | 'variant'>, BaseFormProps {}

export function TextInputField({ name, ...props }: TextInputFieldProps) {
  const [field, { error }] = useField(name);

  return (
    <>
      <TextField {...props} {...field} variant="outlined" helperText={error} error={!!error} />
    </>
  );
}
