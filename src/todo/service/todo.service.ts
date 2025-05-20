import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {NewTodoDto} from "../dto/NewTodoDto";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Todo} from "../model/todo.entity";
import {TodoStatus} from "../model/enum/todo.enum";
import {StatusDto} from "../dto/StatusDto";

@Injectable()
export class TodoService {

    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>,
    ) {}

    async create(todoDto: NewTodoDto) {
        if (!Object.values(TodoStatus).includes(todoDto.status)) {
            throw new HttpException('Invalid status', HttpStatus.BAD_REQUEST);
        }
        const todo = this.todoRepository.create(todoDto);
        return await this.todoRepository.save(todo);
    }

    async remove(id: number) {
        const todo = await this.todoRepository.findOneBy({id});
        const result = await this.todoRepository.delete(id);
        if (result.affected === 1) {
            return {
                id: id,
                title: todo?.title,
                text: todo?.text,
                status: todo?.status
            };
        }else {
            throw new HttpException(`Todo with id ${id} is not found`,HttpStatus.NOT_FOUND);
        }
    }

    async updateStatusTodo(id: number, statusDto: StatusDto) {
        const todo = await this.todoRepository.findOneBy({id});
        if (!todo) {
            throw new HttpException(`Todo with id ${id} not found`, HttpStatus.NOT_FOUND);
        }
        if (todo?.status === statusDto.status) {
            throw new HttpException(`This Todo ${id} has this exact status`, HttpStatus.BAD_REQUEST);
        }
        todo.status = statusDto.status;
        await this.todoRepository.save(todo);

        return {
            id: todo.id,
            title: todo.title,
            text: todo.text,
            status: todo.status
        }
    }

    async findAllTodos(status?: TodoStatus) {
        if (status) {
            return this.todoRepository.find({where: {status: status}});
        }
        return this.todoRepository.find();
    }
}
