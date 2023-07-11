'use client';
import { useDoctorsQuery } from '@/services/doctorService';
import { Box, Typography } from '@mui/material';
import { MoreTime as IconMoreTime } from '@mui/icons-material';
import * as React from 'react';
import { DoctorActionKey, Table, TableColumn, TableRenderItem } from '@/components';
import { Doctor, TableAction } from '@/interfaces';
import { DoctorItemContainer } from '@/containers';

const columns: Array<TableColumn> = [{ label: 'Id' }, { label: 'Name' }, { label: 'Phone Number' }, { label: 'Speciality' }, { label: 'Address' }];

const actions: Array<TableAction<DoctorActionKey>> = [
  {
    itemKey: DoctorActionKey.BOOK,
    label: 'Book appointment',
    icon: IconMoreTime,
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
