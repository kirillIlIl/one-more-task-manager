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

  async getAll(): Promise<Task[]> {
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

  async deleteTask(id: string): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} was not found`);
    }
  }
}
