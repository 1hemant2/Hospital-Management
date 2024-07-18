/*
PDFID SERIAL PRIMARY KEY,
DoctorID INT,
FilePath VARCHAR(255),
UploadDate TIMESTAMP,
FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID)
*/
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Doctor } from './Doctor';
@Entity()
export class Pdf {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @ManyToOne(() => Doctor)
    @JoinColumn()
    doctor!: Doctor;

    @Column()
    name!: String;

    @Column({ type: 'varchar', length: 200 })
    filePath!: String;

    @CreateDateColumn()
    createdAt!: Date
}
