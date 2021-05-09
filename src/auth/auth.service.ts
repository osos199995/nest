import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './auth.repository';
import { AuthCredintialsDto } from './dto/auth-credintials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private JwtService: JwtService,
  ) {}

  async signUp(authcredintialsDto: AuthCredintialsDto): Promise<void> {
    return this.userRepository.signUp(authcredintialsDto);
  }

  async signIn(
    authcredintialsDto: AuthCredintialsDto,
  ): Promise<{ accessToken: string }> {
    const username = await this.userRepository.validatePassword(
      authcredintialsDto,
    );
    if (!username) {
      throw new UnauthorizedException(`Invalid Credintials`);
    }
    const payload = { username };
    const accessToken = await this.JwtService.sign(payload);
    return { accessToken };
  }
}
