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

import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth()
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
  create(@Req() req, @Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto, req.user.userId);
  }

  @ApiOperation({
    summary: 'List products',
    description: 'List products for the system',
  })
  @ApiResponse({
    status: 200,
    description: 'Success.',
  })
  @ApiQuery({
    name: 'order',
    description: 'asc or desc',
    required: false,
  })
  @Get('list')
  @UseGuards(AuthGuard('jwt'))
  findAll(@Req() req) {
    return this.productService.findAll(req.query.order, req.query.dataOrder);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Update product',
    description: 'Update product in the system',
  })
  @ApiResponse({
    status: 200,
    description: 'Success.',
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
  @ApiResponse({
    status: 200,
    description: 'Success.',
  })
  remove(@Param('id') id: number, @Req() req) {
    return this.productService.remove(id, req.user.userId);
  }
}
