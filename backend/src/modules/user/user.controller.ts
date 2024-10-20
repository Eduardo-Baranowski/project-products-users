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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

import { Public } from '../auth/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
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
  @ApiResponse({
    status: 201,
    description: 'Created.',
  })
  create(@Body() createUserioDto: CreateUserDto) {
    return this.usuariosService.create(createUserioDto);
  }

  @Get('list')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'List users',
    description: 'List users for the system',
  })
  @ApiResponse({
    status: 200,
    description: 'Success.',
  })
  findAll() {
    return this.usuariosService.findAll();
  }

  @Post('uploadImage/:id')
  @ApiOperation({
    summary: 'Upload image',
    description: 'Upload image user in the system',
  })
  @ApiResponse({
    status: 201,
    description: 'Created.',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  updatePhoto(@Param('id') id: number, @UploadedFile() file, @Req() req) {
    return this.usuariosService.updatePhoto(req.file, Number(id));
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Update user',
    description: 'Update user in the system',
  })
  @ApiResponse({
    status: 200,
    description: 'Success.',
  })
  async update(
    @Param('id') id: number,
    @Req() req,
    @Body() data: CreateUserDto,
  ) {
    return this.usuariosService.update(id, data, req.user.userId);
  }
}
