import { PatientActionKey, OnActionClickEvent, PatientItem, PatientItemProps } from '@/components';
import * as React from 'react';
import { DeletePatientDialogContainer, UpdatePatientDialogFormContainer } from '@/containers';
import dayjs from 'dayjs';

interface PatientItemContainerProps extends Omit<PatientItemProps, 'onActionClick'> {}

export function PatientItemContainer(props: PatientItemContainerProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [updatePatientDialogOpen, setUpdatePatientDialogOpen] = React.useState(false);

  const updatePatientInitialFormValues = React.useMemo(
    () => ({
      firstName: props.patient.firstName,
      lastName: props.patient.lastName,
      birthdate: dayjs(props.patient.birthdate),
      gender: props.patient.gender,
    }),
    [props.patient.birthdate, props.patient.firstName, props.patient.gender, props.patient.lastName],
  );

  const onDeletePatientDialogClose = React.useCallback(() => setDeleteDialogOpen(false), []);

  const onUpdatePatientDialogClose = React.useCallback(() => setUpdatePatientDialogOpen(false), []);

  const onActionClick: OnActionClickEvent<PatientActionKey> = React.useCallback((key: PatientActionKey) => {
    switch (key) {
      case PatientActionKey.EDIT:
        setUpdatePatientDialogOpen(true);
        break;
      case PatientActionKey.DELETE:
        setDeleteDialogOpen(true);
        break;
    }
  }, []);

  return (
    <>
      <PatientItem {...props} onActionClick={onActionClick} />
      <UpdatePatientDialogFormContainer
        patientId={props.patient._id}
        //@ts-ignore
        initialValues={updatePatientInitialFormValues}
        open={updatePatientDialogOpen}
        onClose={onUpdatePatientDialogClose}
      />
      <DeletePatientDialogContainer
        patientId={props.patient._id}
        open={deleteDialogOpen}
        title="Warning"
        description={`Do you confirm to delete ${props.patient.firstName} ${props.patient.lastName} patient?`}
        onClose={onDeletePatientDialogClose}
      />
    </>
  );
}
