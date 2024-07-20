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

/**
 * Represents the relationship between a Doctor and a Patient.
 * 
 * @entity DoctorPatient
 * @description This entity captures the association between a doctor and a patient, 
 *             with references to both the doctor and the patient.
 */

/*
PRIMARY KEY (DoctorID, PatientID),
FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID),
FOREIGN KEY (PatientID) REFERENCES Patients(PatientID)
*/


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