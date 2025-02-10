import { IsNotEmpty, IsOptional, IsString, IsInt } from "class-validator";

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  info?: string;

  @IsInt()
  creatorId: number;
}
