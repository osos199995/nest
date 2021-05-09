import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredintialsDto{
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username:string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  // @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{6,64}$/gm, {
  //   message:
  //     'Password must be between 6 and 64 characters long with 1 special character and capital character each',
  // })
  password:string;
}