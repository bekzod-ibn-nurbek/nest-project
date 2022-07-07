import { Injectable } from '@nestjs/common';
import { SerializedUsers, Users } from './types';

@Injectable()
export class UsersService {
  private users: Users[] = [
    {
      username: 'unbroken',
      id: 1,
      password: 'bekzod99',
    },
    {
      username: 'ozod',
      id: 2,
      password: 'ozod99',
    },
    {
      username: 'abbos',
      id: 3,
      password: 'abbos',
    },
    {
      username: 'ruslan',
      id: 4,
      password: 'ruslan',
    },
    {
      username: 'umar',
      id: 5,
      password: 'umar',
    },
  ];

  getUsers() {
    return this.users.map((user) => new SerializedUsers(user));
  }

  getUsersByUserName(username: string) {
    return this.users.find((user) => user.username === username);
  }
  getUsersById(id: number) {
    return this.users.find((user) => user.id === id);
  }
}
