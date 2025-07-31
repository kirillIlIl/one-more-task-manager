import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from '../tasks/task.entity';
import * as process from 'node:process';
import * as dotenv from 'dotenv';
import { User } from '../auth/user.entity';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'task-manager',
      entities: [Task, User],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
