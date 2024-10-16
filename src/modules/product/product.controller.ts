import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';

import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}


  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Novo produto',
    description: 'Cria um novo produto para o sistema',
  })
  @ApiBody({ type: CreateProductDto })
  create(@Req() req, @Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto, req.user.userId);
  }

  @Get('list')
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return this.productService.findAll();
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: number, @Req() req, @Body() data: CreateProductDto) {
    return this.productService.update(id, data, req.user.userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: number, @Req() req) {
    return this.productService.remove(id, req.user.userId);
  }
}
