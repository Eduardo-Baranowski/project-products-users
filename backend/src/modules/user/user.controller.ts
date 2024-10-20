import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  Req,
  Param,
  UploadedFile,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

import { Public } from '../auth/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

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

  @Post('uploadImage/:id')
  @ApiOperation({
    summary: 'Upload image',
    description: 'Upload image user in the system',
  })
  @UseInterceptors(FileInterceptor('file'))
  updatePhoto(
    @Param('id') id: number,
    @UploadedFile() file,
    @Req()
    req,
  ) {
    return this.usuariosService.updatePhoto(req.file, Number(id));
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Update user',
    description: 'Update user in the system',
  })
  async update(
    @Param('id') id: number,
    @Req() req,
    @Body() data: CreateUserDto,
  ) {
    return this.usuariosService.update(id, data, req.user.userId);
  }
}
