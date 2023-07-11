'use client';
import * as React from 'react';
import { useAppointmentsQuery } from '@/services/appointmentService';
import { Box, Typography } from '@mui/material';
import { AppointmentActionKey, AppointmentItem, Table, TableColumn, TableRenderItem } from '@/components';
import { Appointment } from '@/interfaces';

const columns: Array<TableColumn> = [{ label: 'Id' }, { label: 'Description' }, { label: 'Status' }, { label: 'Date' }];

export default function Patient() {
  const { data, error, status } = useAppointmentsQuery();

  const renderItem: TableRenderItem<Appointment, AppointmentActionKey> = React.useCallback((appointment, _, actions) => {
    return <AppointmentItem appointment={appointment} actions={actions} />;
  }, []);

  const keyExtractor = React.useCallback((appointment: Appointment) => appointment._id, []);

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
      <Table<Appointment, AppointmentActionKey> items={data.data} columns={columns} renderItem={renderItem} keyExtractor={keyExtractor} />
    </Box>
  );
}
