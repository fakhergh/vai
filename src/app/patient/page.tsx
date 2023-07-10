'use client';
import * as React from 'react';
import { useAppointmentsQuery } from '@/services/appointmentService';
import { Box, Button, Typography } from '@mui/material';
import { AppointmentList, AppointmentDialogForm } from '@/components';

export default function Patient() {
  const [appointmentDialogOpen, setAppointmentDialogOpen] = React.useState(false);

  const { data, error, status } = useAppointmentsQuery();

  const closeAppointmentForm = React.useCallback(() => {
    setAppointmentDialogOpen(false);
  }, []);

  const openAppointmentForm = React.useCallback(() => {
    setAppointmentDialogOpen(true);
  }, []);

  if (status === 'loading') {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error</Typography>;
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Appointments</Typography>
        <Button variant="contained" onClick={openAppointmentForm}>
          Book appointment
        </Button>
      </Box>
      <AppointmentList appointments={data.data} />
      <AppointmentDialogForm
        title="Create appointment"
        open={appointmentDialogOpen}
        onClose={closeAppointmentForm}
        onSubmit={() => {
          console.log();
        }}
      />
    </Box>
  );
}
