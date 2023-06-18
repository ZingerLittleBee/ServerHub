import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async signIn(pass: string, email?: string, username?: string) {
    if (!email && !username) {
      throw new UnauthorizedException();
    }
    if (email) {
    }
    const user = await this.usersService.user(email ? { email } : { username });
    if (!user || !(await compare(pass, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(pass: string, email: string, username: string) {
    const user = await this.usersService.createUser({
      email,
      password: pass,
      username,
    });
  }

  getSaltRounds() {
    const saltRounds = this.configService.get('SALT_ROUNDS')
    return saltRounds ? parseInt(saltRounds) : 10
  }
}
