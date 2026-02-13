import { Injectable } from '@nestjs/common';
import { TodoDto } from './todo.dto';

@Injectable()
export class TodoService {
  private todos: TodoDto[] = [];
  private nextId = 1;

  create(todo: Omit<TodoDto, 'id'>): TodoDto {
    const newTodo: TodoDto = {
      ...todo,
      id: this.nextId++,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  findAll(): TodoDto[] {
    return this.todos;
  }

  findOne(id: number): TodoDto | undefined {
    return this.todos.find((todo) => todo.id === id);
  }

  update(
    id: number,
    update: Partial<Omit<TodoDto, 'id'>>,
  ): TodoDto | undefined {
    const todo = this.findOne(id);
    if (!todo) return undefined;
    Object.assign(todo, update);
    return todo;
  }

  delete(id: number): boolean {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index === -1) return false;
    this.todos.splice(index, 1);
    return true;
  }
}
