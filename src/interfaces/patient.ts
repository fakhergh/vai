export enum PatientGender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export interface Patient {
  _id: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: PatientGender;
  birthdate: string;
  createAt: string;
  updatedAt: string;
}

export interface CreatePatientDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthdate: string;
  gender: PatientGender;
}

export interface UpdatePatientDto {
  firstName: string;
  lastName: string;
  birthdate: string;
  gender: PatientGender;
}
