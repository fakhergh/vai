import { RadioItemProps } from '@/components';
import { PatientGender } from '@/interfaces';

export const routes = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
  },
  admin: {
    patients: '/admin/patients',
    doctors: '/admin/doctors',
  },
  doctor: {
    appointments: '/doctor/appointments',
  },
  patient: {
    appointments: '/patient/appointments',
    doctors: '/patient/doctors',
  },
};

export const genderRadioGroupItems: Array<RadioItemProps> = [
  {
    key: 'male',
    value: PatientGender.MALE,
    label: 'Male',
  },
  { key: 'female', value: PatientGender.FEMALE, label: 'Female' },
];
