import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Body,
  Post,
  NotFoundException,
  UseGuards,
  Query,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "@/auth/guards/jwt.guard";

@UseGuards(JwtAuthGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("/")
  getAll() {
    return this.usersService.getAll();
  }

  @Get("/:id")
  async getUserById(@Param("id") userId: number) {
    const user = await this.usersService.getUserById(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user;
  }

  @Patch("/:id")
  async editUser(
    @Param("id") userId: number,
    @Body()
    updateData: Partial<{ email: string; username: string; password: string }>,
  ) {
    return this.usersService.editUser(userId, updateData);
  }

  @Delete("/:id")
  deleteUser(@Param("id") userId: number) {
    return this.usersService.deleteUser(userId);
  }

  @Post("/")
  async createUser(
    @Body()
    createUserData: {
      email: string;
      username: string;
      password: string;
    },
  ) {
    return this.usersService.createUser(
      createUserData.email,
      createUserData.username,
      createUserData.password,
    );
  }

  @Get("search")
  searchUsers(@Query("q") query: string) {
    return this.usersService.searchUsers(query);
  }
}
