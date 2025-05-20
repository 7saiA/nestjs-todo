import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {TodoStatus} from "./enum/todo.enum";

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title: string;
    @Column()
    text: string;
    @Column({
        type: 'text',
        enum: TodoStatus,
    })
    status: TodoStatus;
}