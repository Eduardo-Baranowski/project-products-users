import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { IRequestLoginUser } from '../user/interfaces/requests.interfaces';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('')
  @ApiOperation({
    summary: 'SignIn user',
    description: 'SignIn user in the system',
  })
  login(@Body() body: IRequestLoginUser) {
    const { cpf, password } = body;
    return this.authService.validateUser(cpf, password);
  }
}
