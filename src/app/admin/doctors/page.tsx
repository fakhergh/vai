'use client';
import { Box, Typography } from '@mui/material';
import * as React from 'react';
import { useDoctorsQuery } from '@/services';
import { DoctorActionKey, Table, TableColumn, TableRenderItem } from '@/components';
import { Doctor, TableAction } from '@/interfaces';
import { Delete as IconDelete, Edit as IconEdit } from '@mui/icons-material';
import { DoctorItemContainer } from '@/containers';

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
  const { data, error, status } = useDoctorsQuery();

  const renderItem: TableRenderItem<Doctor, DoctorActionKey> = React.useCallback((doctor, _, actions) => {
    return <DoctorItemContainer doctor={doctor} actions={actions} />;
  }, []);

  const keyExtractor = React.useCallback((doctor: Doctor) => doctor._id, []);

  if (status === 'loading') {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error</Typography>;
  }

  return (
    <Box>
      <Box mb={2}>
        <Typography variant="h4">Doctors</Typography>
      </Box>
      <Table<Doctor, DoctorActionKey> items={data.data} columns={columns} renderItem={renderItem} keyExtractor={keyExtractor} actions={actions} />
    </Box>
  );
}
