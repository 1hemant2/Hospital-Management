/*
PDFID SERIAL PRIMARY KEY,
DoctorID INT,
FilePath VARCHAR(255),
UploadDate TIMESTAMP,
FOREIGN KEY (DoctorID) REFERENCES Doctors(DoctorID)
*/
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Doctor } from './Doctor';

/**
 * Represents a PDF document associated with a doctor.
 * 
 * @entity Pdf
 * @description This entity holds information about a PDF document, including its name, file path,
 *             and creation date, as well as the doctor associated with it.
 */

@Entity()
export class Pdf {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    /**
     * The doctor associated with this PDF document.
     * 
     * @type {Doctor}
     * @relation {ManyToOne}
     */
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
