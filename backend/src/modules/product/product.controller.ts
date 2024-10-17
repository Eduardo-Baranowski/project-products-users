import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'New product',
    description: 'Create a new product for the system',
  })
  @ApiBody({ type: CreateProductDto })
  create(@Req() req, @Body() createProductDto: CreateProductDto) {
    console.log(req.headers);
    return this.productService.create(createProductDto, req.user.userId);
  }

  @Get('list')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'List products',
    description: 'List products for the system',
  })
  findAll() {
    return this.productService.findAll();
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Update product',
    description: 'Update product in the system',
  })
  async update(
    @Param('id') id: number,
    @Req() req,
    @Body() data: CreateProductDto,
  ) {
    return this.productService.update(id, data, req.user.userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Delete product',
    description: 'Delete product in the system',
  })
  remove(@Param('id') id: number, @Req() req) {
    return this.productService.remove(id, req.user.userId);
  }
}
