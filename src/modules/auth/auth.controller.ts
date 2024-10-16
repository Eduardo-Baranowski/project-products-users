import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { IRequestLoginUser } from '../user/interfaces/requests.interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('')
  login(@Body() body: IRequestLoginUser) {
    const { cpf, password } = body;
    return this.authService.validateUser(cpf, password);
  }
}
