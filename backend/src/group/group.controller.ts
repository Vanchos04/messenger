import { Controller, Post, Body, Get, Param, Query } from "@nestjs/common";
import { GroupService } from "./group.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { AddMemberDto } from "./dto/add-member.dto";

@Controller("groups")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  async createGroup(@Body() dto: CreateGroupDto) {
    return this.groupService.createGroup(dto);
  }

  @Post("/add-member")
  async addMember(@Body() dto: AddMemberDto) {
    return this.groupService.addMember(dto);
  }

  @Get("/user/:userId")
  async getUserGroups(@Param("userId") userId: string) {
    return this.groupService.getUserGroups(parseInt(userId));
  }

  @Get("search")
  searchGroups(@Query("q") query: string) {
    return this.groupService.searchGroups(query);
  }
}
