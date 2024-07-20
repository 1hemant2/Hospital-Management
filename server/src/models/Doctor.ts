import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DoctorPatient } from './DoctorPatient';
import { Patient } from './Patient';

/**
 * Represents a Doctor entity in the database.
 * 
 * @entity Doctor
 * @description This entity holds information about a doctor, including personal details,
 *             specialty, and their relationships with patients.
 */
@Entity()
export class Doctor {
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

    @Column({ type: 'varchar', length: 100 })
    specialty!: string

    /**
     * List of doctor-patient relationships involving this doctor.
     * 
     * @type {DoctorPatient[]}
     * @relation {OneToMany}
     * @inverseRelation {doctor}
     */
    @OneToMany(() => DoctorPatient, (doctorPatient) => doctorPatient.doctor)
    doctorPatients: DoctorPatient[];
}