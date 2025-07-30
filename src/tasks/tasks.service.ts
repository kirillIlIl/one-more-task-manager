import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { Task } from './task.entity';
import { TaskRepository } from './task.repository';

@Injectable()
export class TasksService {
  constructor(private readonly taskRepository: TaskRepository) {}

  async getAllTasks(): Promise<Task[]> {
    return this.taskRepository.getAllTasks();
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.taskRepository.getTaskById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} was not found`);
    }
    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async deleteTask(id: string): Promise<void> {
    const deleted = await this.taskRepository.deleteTask(id);
    if (!deleted) {
      throw new NotFoundException(`Task with ID ${id} was not found`);
    }
  }

  async updateTask(id: string, status: TaskStatus): Promise<Task> {
    const updated = await this.taskRepository.updateTask(id, status);
    if (!updated) {
      throw new NotFoundException(`Task with ID ${id} was not found`);
    }
    return updated;
  }
}
