enum AppointmentStatus {
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  APPROVED = 'APPROVED',
  COMPLETED = 'COMPLETED',
}

export interface Appointment {
  _id: string;
  doctorId: string;
  patientId: string;
  description: string;
  date: string;
  status: AppointmentStatus;
  createdAt: string;
  updateAt: string;
}
