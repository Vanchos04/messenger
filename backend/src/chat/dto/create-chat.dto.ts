import { IsEnum, IsInt } from "class-validator";
import { ChatType } from "@prisma/client";

export class CreateChatDto {
  @IsInt()
  userId: number;

  @IsInt()
  directPartnerId: number;

  @IsEnum(ChatType)
  type: ChatType;
}
