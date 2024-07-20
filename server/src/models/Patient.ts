import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { DoctorPatient } from './DoctorPatient';
/**
 * Represents a Patient entity in the database.
 * 
 * @entity Patient
 * @description This entity holds information about a patient, including personal details
 *             and their relationship with a doctor through the DoctorPatient entity.
 */

@Entity()
export class Patient {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({ type: 'varchar', length: 100 })
    firstName!: string

    @Column({ type: 'varchar', length: 100 })
    lastName!: string

    @Column({ type: 'varchar', length: 100, unique: true })
    email!: string

    @Column({ type: 'varchar', length: 225 })
    password!: string

    /**
    * The doctor-patient relationship associated with this patient.
    * 
    * @type {DoctorPatient | undefined}
    * @relation {OneToOne}
    * @inverseRelation {patient}
    */

    @OneToOne(() => DoctorPatient, (doctorPatient) => doctorPatient.patient)
    doctorPatient?: DoctorPatient;
}