import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Doctor {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({ type: 'varchar', length: 100 })
    name!: string

    @Column({ type: 'varchar', length: 100, unique: true })
    email!: string

    @Column({ type: 'varchar', length: 225 })
    password!: string

    @Column({ type: 'varchar', length: 100 })
    specialty!: string
}