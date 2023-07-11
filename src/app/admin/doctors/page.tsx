'use client';
import { Box, Button, Typography } from '@mui/material';
import * as React from 'react';
import { useDoctorsQuery } from '@/services';
import { DoctorActionKey, Table, TableColumn, TableRenderItem } from '@/components';
import { Doctor, TableAction } from '@/interfaces';
import { Delete as IconDelete, Edit as IconEdit } from '@mui/icons-material';
import { CreateDoctorDialogFormContainer, DoctorItemContainer } from '@/containers';

const columns: Array<TableColumn> = [{ label: 'Id' }, { label: 'Name' }, { label: 'Phone Number' }, { label: 'Speciality' }, { label: 'Address' }];

const actions: Array<TableAction<DoctorActionKey>> = [
  {
    itemKey: DoctorActionKey.EDIT,
    label: 'Edit',
    icon: IconEdit,
  },
  {
    itemKey: DoctorActionKey.DELETE,
    label: 'Delete',
    icon: IconDelete,
  },
];

export default function Doctors() {
  const [createDoctorDialogOpen, setCreateDoctorDialogOpen] = React.useState(false);

  const { data, error, status } = useDoctorsQuery();

  const renderItem: TableRenderItem<Doctor, DoctorActionKey> = React.useCallback((doctor, _, actions) => {
    return <DoctorItemContainer doctor={doctor} actions={actions} />;
  }, []);

  const keyExtractor = React.useCallback((doctor: Doctor) => doctor._id, []);

  const onCreateDoctorDialogClose = React.useCallback(() => {
    setCreateDoctorDialogOpen(false);
  }, []);

  const onAddPatientClick = React.useCallback(() => {
    setCreateDoctorDialogOpen(true);
  }, []);

  if (status === 'loading') {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error</Typography>;
  }

  return (
    <Box>
      <Box mb={2} display="flex" justifyContent="space-between">
        <Typography variant="h4">Doctors</Typography>
        <Button variant="contained" color="success" onClick={onAddPatientClick}>
          Create a new doctor
        </Button>
      </Box>
      <Table<Doctor, DoctorActionKey> items={data.data} columns={columns} renderItem={renderItem} keyExtractor={keyExtractor} actions={actions} />
      <CreateDoctorDialogFormContainer open={createDoctorDialogOpen} onClose={onCreateDoctorDialogClose} />
    </Box>
  );
}
