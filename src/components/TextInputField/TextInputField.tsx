import { TextField, OutlinedTextFieldProps } from '@mui/material';
import * as React from 'react';
import { BaseFieldProps } from '@/interfaces';
import { useField } from 'formik';

interface TextInputFieldProps extends Omit<OutlinedTextFieldProps, 'name' | 'value' | 'onChange' | 'variant'>, BaseFieldProps {}

export function TextInputField({ name, ...props }: TextInputFieldProps) {
  const [field, { error }] = useField(name);

  return (
    <>
      <TextField {...props} {...field} variant="outlined" helperText={error} error={!!error} />
    </>
  );
}
