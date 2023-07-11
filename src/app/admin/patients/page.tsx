'use client';
import { usePatientsQuery } from '@/services/patientService';
import { Box, Typography } from '@mui/material';
import * as React from 'react';
import { PatientActionKey, Table, TableColumn, TableRenderItem } from '@/components';
import { Patient, TableAction } from '@/interfaces';
import { Delete as IconDelete, Edit as IconEdit } from '@mui/icons-material';
import { PatientItemContainer } from '@/containers';

const columns: Array<TableColumn> = [{ label: 'Id' }, { label: 'Name' }, { label: 'Birthdate' }, { label: 'Gender' }];

const actions: Array<TableAction<PatientActionKey>> = [
  {
    itemKey: PatientActionKey.EDIT,
    label: 'Edit',
    icon: IconEdit,
  },
  {
    itemKey: PatientActionKey.DELETE,
    label: 'Delete',
    icon: IconDelete,
  },
];

export default function Patients() {
  const { data, error, status } = usePatientsQuery();

  const renderItem: TableRenderItem<Patient, PatientActionKey> = React.useCallback((patient, _, actions) => {
    return <PatientItemContainer patient={patient} actions={actions} />;
  }, []);

  const keyExtractor = React.useCallback((patient: Patient) => patient._id, []);

  if (status === 'loading') {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error</Typography>;
  }

  return (
    <Box>
      <Box mb={2}>
        <Typography variant="h4">Patients</Typography>
      </Box>
      <Table<Patient, PatientActionKey> items={data.data} columns={columns} renderItem={renderItem} keyExtractor={keyExtractor} actions={actions} />
    </Box>
  );
}
