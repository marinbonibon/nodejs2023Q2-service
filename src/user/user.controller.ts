import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put, UsePipes, ValidationPipe
} from '@nestjs/common';
import { User, UserWithoutPassword } from './types/user';
import { randomUUID } from 'crypto';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe({}))
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserWithoutPassword> {
    const user = {
      id: randomUUID(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };
    return this.userService.create(user);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({}))
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserWithoutPassword> {
    const user = await this.userService.findOne(id);
    this.userService.throwBadRequestException(id);
    this.userService.throwNotFoundException(user, id);
    return this.userService.update(id, user, updateUserDto);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findOne(id);
    this.userService.throwBadRequestException(id);
    this.userService.throwNotFoundException(user, id);
    return user;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    const user = await this.userService.findOne(id);
    this.userService.throwBadRequestException(id);
    this.userService.throwNotFoundException(user, id);
    await this.userService.remove(user);
  }
}
