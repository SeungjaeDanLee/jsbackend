import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// Decorator for entity object
@Entity()
export class User {
    // Pk and auto increasing key
    @PrimaryGeneratedColumn()
    id?: number;

    // email is a unique value
    @Column({ unique: true })
    email: string;

    @Column({ nullable: true })
    password: string;

    @Column()
    username: string;

    @Column({ type: "datetime", default: () => "CURRENT_TIMESTAMP" })
    createdDt: Date = new Date();

    @Column({ nullable: true })
    providerId: string;
}