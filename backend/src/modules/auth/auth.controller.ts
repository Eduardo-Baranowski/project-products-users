import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { IRequestLoginUser } from '../user/interfaces/requests.interfaces';
import {
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'SignIn user',
    description: 'SignIn user in the system',
  })
  @ApiResponse({
    status: 201,
    description: 'Sucesso.',
  })
  @ApiNotFoundResponse({
    description: 'User not found.',
  })
  @Public()
  @Post('')
  login(@Body() body: IRequestLoginUser) {
    const { cpf, password } = body;
    return this.authService.validateUser(cpf, password);
  }
}
