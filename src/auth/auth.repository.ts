import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredintialsDto } from './dto/auth-credintials.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredintialsDto: AuthCredintialsDto): Promise<void> {
    const { username, password } = authCredintialsDto;
    const salt = await bcrypt.genSalt();
    const user = new User();
    user.username = username;
    user.salt = salt;
    user.password = await this.hashPasswords(password, salt);
    try {
      await user.save();
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException(`user name already exist`);
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validatePassword(
    authCredintialDto: AuthCredintialsDto,
  ): Promise<string> {
    const { username, password } = authCredintialDto;
    const user = await this.findOne({ username });

    if (user && (await user.validatePassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  private async hashPasswords(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }
}
