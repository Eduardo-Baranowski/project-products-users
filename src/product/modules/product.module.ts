import { Module } from '@nestjs/common';
import { ProductController } from 'src/modules/product/product.controller';
import { ProductService } from 'src/modules/product/product.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
})
export class ModulesModule {}
