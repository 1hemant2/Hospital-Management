import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { DoctorPatient } from './DoctorPatient';

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


    @OneToOne(() => DoctorPatient, (doctorPatient) => doctorPatient.patient)
    doctorPatient?: DoctorPatient;
}