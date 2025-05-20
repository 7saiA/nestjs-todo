import {TodoStatus} from "../model/enum/todo.enum";

export class NewTodoDto {
    title: string;
    text: string;
    status: TodoStatus;
}