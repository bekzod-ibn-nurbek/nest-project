import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dtos/createUsers.dto';
import { NotFoundExceptions } from './exceptions/NotFound.exceptions';
import { HttpExceptionFilter } from './filters/HttpExceptions.filter';
import { SerializedUsers } from './types';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UsersService,
  ) {}
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  async create(@Body() createUserDto: UserDto) {
    return createUserDto;
  }
  @Get('')
  @ApiQuery({
    example: 10,
    required: false,
    schema: {
      minimum: 3,
      maximum: 10000,
      type: 'number',
    },
    name: 'limit',
    description: 'default value: 10',
  })
  getUsers() {
    return this.userService.getUsers();
  }
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('username/:username')
  getUserByUserName(@Param('username') username: string) {
    const user = this.userService.getUsersByUserName(username);
    if (user !== undefined) return new SerializedUsers(user);
    else return new HttpException('User not Found', HttpStatus.BAD_REQUEST);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('id/:id')
  @UseFilters(HttpExceptionFilter)
  getUsersById(@Param('id', ParseIntPipe) id: number) {
    const user = this.userService.getUsersById(id);
    console.log(user);
    if (user !== undefined) return new SerializedUsers(user);
    else throw new NotFoundExceptions();
  }
}
