import { DoctorActionKey, DoctorItem, DoctorItemProps, OnActionClickEvent } from '@/components';
import * as React from 'react';
import { CreateAppointmentDialogFormContainer, DeleteDoctorDialogContainer, UpdateDoctorDialogFormContainer } from '@/containers';

interface DoctorItemContainerProps extends Omit<DoctorItemProps, 'onActionClick'> {}

export function DoctorItemContainer(props: DoctorItemContainerProps) {
  const [createAppointmentDialogOpen, setCreateAppointmentDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [updateDoctorDialogOpen, setUpdateDoctorDialogOpen] = React.useState(false);

  const updateDoctorInitialFormValues = React.useMemo(
    () => ({
      firstName: props.doctor.firstName,
      lastName: props.doctor.lastName,
      phoneNumber: props.doctor.phoneNumber,
      address: props.doctor.address,
      speciality: props.doctor.speciality,
    }),
    [props.doctor.address, props.doctor.firstName, props.doctor.lastName, props.doctor.phoneNumber, props.doctor.speciality],
  );

  const onCreateAppointmentDialogClose = React.useCallback(() => setCreateAppointmentDialogOpen(false), []);

  const onDeleteDoctorDialogClose = React.useCallback(() => setDeleteDialogOpen(false), []);

  const onEditDoctorDialogClose = React.useCallback(() => setUpdateDoctorDialogOpen(false), []);

  const onActionClick: OnActionClickEvent<DoctorActionKey> = React.useCallback((key: DoctorActionKey) => {
    switch (key) {
      case DoctorActionKey.BOOK:
        setCreateAppointmentDialogOpen(true);
        break;
      case DoctorActionKey.EDIT:
        setUpdateDoctorDialogOpen(true);
        break;
      case DoctorActionKey.DELETE:
        setDeleteDialogOpen(true);
        break;
    }
  }, []);

  return (
    <>
      <DoctorItem {...props} onActionClick={onActionClick} />
      <CreateAppointmentDialogFormContainer doctorId={props.doctor._id} open={createAppointmentDialogOpen} onClose={onCreateAppointmentDialogClose} />
      <UpdateDoctorDialogFormContainer
        doctorId={props.doctor._id}
        initialValues={updateDoctorInitialFormValues}
        open={updateDoctorDialogOpen}
        onClose={onEditDoctorDialogClose}
      />
      <DeleteDoctorDialogContainer
        doctorId={props.doctor._id}
        open={deleteDialogOpen}
        title="Warning"
        description={`Do you confirm to delete ${props.doctor.firstName} ${props.doctor.lastName} doctor?`}
        onClose={onDeleteDoctorDialogClose}
      />
    </>
  );
}
