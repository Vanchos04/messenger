import { Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { UsersService } from '@users/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/')
  getAll() {
    return this.usersService.getAll();
  }

  @Patch()
  editUser(@Param('id') userId: number) {
    return this.usersService.editUser(userId);
  }

  @Delete(':id')
  deleteUser(@Param('id') userId: number) {}
}
