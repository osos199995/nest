import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredintialsDto } from './dto/auth-credintials.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signup(
    @Body(ValidationPipe) authCredintialsDto: AuthCredintialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredintialsDto);
  }
  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredintialsDto: AuthCredintialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredintialsDto);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  // decorator issue user return undefined
  test(@GetUser() user: User) {
    console.log("herere");
    console.log(user);
    // test(@Req() req) {
    //   console.log(req);
  }
}
