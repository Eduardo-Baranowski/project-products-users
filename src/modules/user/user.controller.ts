import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-usuario.dto';

import {
  IRequestLoginUser,
} from './interfaces/requests.interfaces';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Usuário')
@Controller('usuario')
export class UserController {
  constructor(private readonly usuariosService: UserService) {}

  @Public()
  @Post('create')
  @ApiOperation({
    summary: 'Novo usuario',
    description: 'Cria um novo usuario para o sistema',
  })
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserioDto: CreateUserDto) {
    return this.usuariosService.create(createUserioDto);
  }

  @Get('list')
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get('encontrar/:id')
  @ApiResponse({
    status: 201,
    description: 'usuario encontrado com sucesso.',
  })


  @Public()
  @Post('login')
  login(@Body() body: IRequestLoginUser) {
    const { cpf, password } = body;
    return this.usuariosService.login(cpf, password);
  }
}
