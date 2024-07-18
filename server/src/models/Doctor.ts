import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { DoctorPatient } from './DoctorPatient';
import { Patient } from './Patient';

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

    @OneToMany(() => DoctorPatient, (doctorPatient) => doctorPatient.doctor)
    doctorPatients: DoctorPatient[];
}