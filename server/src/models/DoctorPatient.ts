/*
DoctorID INT,
PatientID INT,
PRIMARY KEY (DoctorID, PatientID),
FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID),
FOREIGN KEY (PatientID) REFERENCES Patients(PatientID)
*/
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Doctor } from './Doctor';
import { Patient } from './Patient';


@Entity()
export class DoctorPatient {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @ManyToOne(() => Doctor, (doctor) => doctor.doctorPatients)
    @JoinColumn()
    doctor!: Doctor

    @OneToOne(() => Patient, (patient) => patient.doctorPatient)
    @JoinColumn()
    patient!: Patient
}