import { IsEmail, IsString, Length, Matches } from "class-validator";

export class AuthDto {
  @IsString()
  @IsEmail()
  email: string;

  @Length(6, 20, {})
  password: string;

  @IsString()
  @Matches(/^[a-zA-Z0-9]+$/, {})
  @Length(1, 50)
  username?: string;
}
