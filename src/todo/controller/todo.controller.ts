import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';
import {TodoService} from "../service/todo.service";
import {NewTodoDto} from "../dto/NewTodoDto";
import {StatusDto} from "../dto/StatusDto";
import {TodoStatus} from "../model/enum/todo.enum";

@Controller('todos')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post()
    createTodo(@Body() todoDto: NewTodoDto) {
        return this.todoService.create(todoDto);
    }

    @Delete(':id')
    deleteTodo(@Param('id') id: number) {
        return this.todoService.remove(id);
    }

    @Put(':id')
    updateTodoStatus(@Param('id') id: number, @Body() statusDto: StatusDto) {
        return this.todoService.updateStatusTodo(id, statusDto);
    }

    @Get()
    findAllTodos(@Query('status') status?: TodoStatus) {
        return this.todoService.findAllTodos(status);
    }
}
