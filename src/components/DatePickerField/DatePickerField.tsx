import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import * as React from 'react';
import { BaseFieldProps } from '@/interfaces';
import { useField } from 'formik';
import { Dayjs } from 'dayjs';

interface DatePickerFieldProps<TDate> extends DatePickerProps<TDate>, BaseFieldProps {}

export function DatePickerField<TDate>({ name, ...props }: DatePickerFieldProps<TDate>) {
  const [{ value, onBlur }, { error }, { setValue }] = useField(name);

  const onChange = React.useCallback(
    (date: Dayjs) => {
      setValue(date.toDate());
    },
    [setValue],
  );

  return (
    <DatePicker<any>
      {...props}
      value={value}
      onChange={onChange}
      slotProps={{
        ...props.slotProps,
        textField: {
          ...props.slotProps?.textField,
          onBlur,
          error: !!error,
          helperText: error,
        },
      }}
    />
  );
}
