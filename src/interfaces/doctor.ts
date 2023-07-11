export interface Doctor {
  _id: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phoneNumber: string;
  speciality: string;
  createAt: string;
  updatedAt: string;
}

export interface CreateDoctorDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  speciality: string;
  address: string;
}

export interface UpdateDoctorDto {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  speciality: string;
  address: string;
}
