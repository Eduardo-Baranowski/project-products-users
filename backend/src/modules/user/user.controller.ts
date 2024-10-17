import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

import { Public } from '../auth/decorators/public.decorator';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly usuariosService: UserService) {}

  @Public()
  @Post('create')
  @ApiOperation({
    summary: 'New user',
    description: 'Create a new user for the system',
  })
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserioDto: CreateUserDto) {
    return this.usuariosService.create(createUserioDto);
  }

  @Get('list')
  @ApiOperation({
    summary: 'List users',
    description: 'List users for the system',
  })
  findAll() {
    return this.usuariosService.findAll();
  }
}
