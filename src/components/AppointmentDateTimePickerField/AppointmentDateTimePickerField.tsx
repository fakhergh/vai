import { BaseFieldProps } from '@/interfaces';
import { useField } from 'formik';
import { DateTimePicker, DateOrTimeView, DatePickerProps } from '@mui/x-date-pickers';
import * as React from 'react';
import { Dayjs } from 'dayjs';

export interface AppointmentDateTimePickerFieldProps<TDate> extends DatePickerProps<TDate>, BaseFieldProps {}

const views: Array<DateOrTimeView> = ['month', 'day', 'hours'];

export function AppointmentDateTimePickerField<TDate>({ name, ...props }: AppointmentDateTimePickerFieldProps<TDate>) {
  const [{ value, onBlur }, { error }, { setValue }] = useField(name);

  const onChange = React.useCallback(
    (date: Dayjs) => {
      setValue(date.toDate());
    },
    [setValue],
  );

  return (
    <DateTimePicker<any>
      views={views}
      value={value}
      onChange={onChange}
      slotProps={{
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
