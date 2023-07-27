import { Controller, Get } from "@nestjs/common";
import { db } from '../../db/database';
import { User } from '../types/user';

@Controller('user')
export class UserController {
  @Get()
  findAll(): User[] {
    return db.user;
  }
}
