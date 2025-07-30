import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TaskRepository {
  private repository: Repository<Task>;

  constructor(private dataSource: DataSource) {
    this.repository = dataSource.getRepository(Task);
  }

  async getAllTasks(): Promise<Task[]> {
    return this.repository.find();
  }

  async getTaskById(id: string): Promise<Task | null> {
    return await this.repository.findOneBy({ id });
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = this.repository.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.repository.save(task);
    return task;
  }

  async deleteTask(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }

  async updateTask(id: string, status: TaskStatus): Promise<Task | null> {
    const updated = await this.repository.update(id, { status });
    if (updated.affected === 0) {
      return null;
    }
    return await this.getTaskById(id);
  }
}
