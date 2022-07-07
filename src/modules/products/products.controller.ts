import { Body, Controller, Get, Post } from '@nestjs/common';
import { Product } from './product.model';
import { ProductService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}
  @Get('')
  async getproducts() {
    return await this.productService.getProducts();
  }

  @Post()
  async addProduct(@Body() body: Product) {
    // const genereateId = this.productService.insertProduct(
    //   prodTitle,
    //   prodDesc,
    //   prodPrice,
    // );
    return await this.productService.create(body);
    return { id: body.id };
  }
}
