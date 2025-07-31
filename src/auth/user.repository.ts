import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  private repository: Repository<User>;

  constructor(private dataSource: DataSource) {
    this.repository = dataSource.getRepository(User);
  }
}
