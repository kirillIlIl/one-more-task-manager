import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {}

  getAllTasks(): Promise<Task[]> {
    return this.taskRepository.getAll();
  }

  // getTasksWithFilter(getTasksFilterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = getTasksFilterDto;
  //   let tasks = this.getAllTasks();
  //
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //
  //   if (search) {
  //     tasks = tasks.filter((task) => {
  //       return task.title.includes(search) || task.description.includes(search);
  //     });
  //   }
  //
  //   return tasks;
  // }
  //

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.getTaskById(id);
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  deleteTask(id: string): Promise<void> {
    return this.taskRepository.deleteTask(id);
  }
  //
  // updateTask(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
