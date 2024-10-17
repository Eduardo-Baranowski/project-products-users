import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { IRequestLoginUserPayload } from '../user/interfaces/requests.interfaces';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private prisma: PrismaService,
  ) {}

  async validateUser(cpf: string, password: string) {
    const user = await this.userService.login(cpf, password);

    if (!user) {
      throw new UnauthorizedException('Usuário ou Senha Inválidos');
    }

    return this.login(user);
  }

  private async login(user: IRequestLoginUserPayload) {
    const payload = { username: user.cpf, sub: user.id };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
