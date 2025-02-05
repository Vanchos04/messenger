import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { AuthMiddleware } from "@/auth.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use("/protected", new AuthMiddleware().use);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
