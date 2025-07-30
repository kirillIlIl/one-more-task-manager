import { Body, Controller, Param, Query } from '@nestjs/common';
import { Delete, Get, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  GetTasks(): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }

  // @Get()
  // getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task> {
  //   if (Object.keys(filterDto).length) {
  //     return this.tasksService.getTasksWithFilter(filterDto);
  //   }
  //   return this.tasksService.getAllTasks();
  // }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete(`/:id`)
  deleteTask(@Param('id') id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  //
  // @Patch('/:id/status')
  // updateTask(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatus: UpdateTaskStatusDto,
  // ): Task {
  //   const { status } = updateTaskStatus;
  //   return this.tasksService.updateTask(id, status);
  // }
}
