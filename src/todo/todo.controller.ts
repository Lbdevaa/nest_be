import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoDto } from './todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() todo: Omit<TodoDto, 'id'>): TodoDto {
    return this.todoService.create(todo);
  }

  @Get()
  findAll(): TodoDto[] {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): TodoDto {
    const todo = this.todoService.findOne(Number(id));
    if (!todo) throw new NotFoundException('Todo not found');
    return todo;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() update: Partial<Omit<TodoDto, 'id'>>,
  ): TodoDto {
    const todo = this.todoService.update(Number(id), update);
    if (!todo) throw new NotFoundException('Todo not found');
    return todo;
  }

  @Delete(':id')
  delete(@Param('id') id: string): { deleted: boolean } {
    const deleted = this.todoService.delete(Number(id));
    if (!deleted) throw new NotFoundException('Todo not found');
    return { deleted };
  }
}
