import { Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "@/auth/auth.module";
import { ChatModule } from "@/chat/chat.module";
import { MessageModule } from "@/message/message.module";
import { GroupModule } from "@/group/group.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    PrismaModule,
    AuthModule,
    ChatModule,
    MessageModule,
    GroupModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
