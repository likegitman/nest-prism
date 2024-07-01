import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: '이운린',
      email: 'any@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 2,
      name: '이운린',
      email: 'any@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 3,
      name: '이운린',
      email: 'any@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 4,
      name: '이운린',
      email: 'any@gmail.com',
      role: 'ADMIN',
    },
    {
      id: 5,
      name: '이운린',
      email: 'any@gmail.com',
      role: 'ADMIN',
    },
  ];

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0)
        throw new NotFoundException(`Role ${role} not found`);
      return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  create(createUserDTO: CreateUserDTO) {
    const userByHighestId = [...this.users].sort((a, b) => a.id - b.id);
    const newUser = {
      id: userByHighestId[0].id + 1,
      ...createUserDTO,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updateUserDTO: UpdateUserDTO) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...updateUserDTO,
        };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removeUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removeUser;
  }
}
