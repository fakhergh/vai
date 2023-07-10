'use client';
import * as React from 'react';
import { useAppointmentsQuery } from '@/services/appointmentService';
import { Box, Typography } from '@mui/material';
import { AppointmentList } from '@/components';

export default function Patient() {
  const { data, error, status } = useAppointmentsQuery();

  if (status === 'loading') {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error</Typography>;
  }

  return (
    <Box>
      <Box mb={2}>
        <Typography variant="h4">Appointments</Typography>
      </Box>
      <AppointmentList appointments={data.data} />
    </Box>
  );
}
