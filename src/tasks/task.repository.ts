import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TaskRepository {
  private repository: Repository<Task>;

  constructor(private dataSource: DataSource) {
    this.repository = dataSource.getRepository(Task);
  }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const query = this.repository.createQueryBuilder('task');
    const { status, search } = filterDto;
    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }
    return await query.getMany();
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
