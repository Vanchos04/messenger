import { IsEmail, IsString, Length, Matches } from "class-validator";

export class LoginDto {
  @IsString()
  @IsEmail()
  email: string;

  @Length(6, 20, {})
  password: string;
}
