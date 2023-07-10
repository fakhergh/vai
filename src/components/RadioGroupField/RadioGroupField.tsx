import * as React from 'react';
import { FormControlLabel, FormControlLabelProps, FormGroupProps, FormHelperText, Radio, RadioGroup } from '@mui/material';
import { useField } from 'formik';
import { BaseFormProps } from '@/interfaces';

export interface RadioItemProps extends Pick<FormControlLabelProps, 'value' | 'label'> {
  key: string;
}

interface RadioGroupFieldProps extends BaseFormProps, Pick<FormGroupProps, 'row'> {
  items: RadioItemProps[];
  disabled?: boolean;
}

export function RadioGroupField({ items, name, row, disabled }: RadioGroupFieldProps) {
  const [field, { error }] = useField(name);
  return (
    <>
      <RadioGroup {...field} row={row}>
        {items.map(item => (
          <FormControlLabel key={item.key} value={item.value} control={<Radio />} label={item.label} disabled={disabled} />
        ))}
      </RadioGroup>
      <FormHelperText error variant="outlined">
        {error}
      </FormHelperText>
    </>
  );
}
