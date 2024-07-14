/*
DoctorID INT,
PatientID INT,
PRIMARY KEY (DoctorID, PatientID),
FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID),
FOREIGN KEY (PatientID) REFERENCES Patients(PatientID)
*/
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Doctor } from './Doctor';
import { Patient } from './Patient';


@Entity()
export class DoctorPatient {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @ManyToOne(() => Doctor)
    @JoinColumn()
    doctor?: Doctor

    @ManyToOne(() => Patient)
    @JoinColumn()
    patient?: Patient
}