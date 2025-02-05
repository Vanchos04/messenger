import { forwardRef, Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "@/users/users.module";

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    forwardRef(() => UsersModule),
  ],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
