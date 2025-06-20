import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { MessageService } from "./message.service";
import { CreateMessageDto } from "./dto/create-message.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as path from "path";

@Controller("messages")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  sendMessage(@Body() dto: CreateMessageDto) {
    console.log("Received message DTO:", dto);
    return this.messageService.sendMessage(dto);
  }

  @Get(":chatId")
  getChatMessages(@Param("chatId", ParseIntPipe) chatId: number) {
    return this.messageService.getChatMessages(chatId);
  }

  @Post("upload")
  @UseInterceptors(
    FileInterceptor("file", {
      storage: diskStorage({
        destination: "./uploads", // Upload folder
        filename: (req, file, cb) => {
          const filename = `${Date.now()}-${file.originalname}`;
          cb(null, filename);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: CreateMessageDto,
  ) {
    console.log("Uploaded file:", file);

    const fileUrl = `/uploads/${file.filename}`;

    const message = {
      ...dto,
      MessageType: "IMAGE",
      content: fileUrl,
    };

    return this.messageService.sendMessage(message);
  }
}
