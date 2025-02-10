import { IsInt } from "class-validator";

export class AddMemberDto {
  @IsInt()
  groupId: number;

  @IsInt()
  userId: number;
}
