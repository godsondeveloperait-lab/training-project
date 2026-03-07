import { Body, Controller, Delete, Get, Param, Post, Put, Query, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProductsService } from './products.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: ProductsService) {}
    
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Post()
    @UseInterceptors(
    FilesInterceptor("images", 5, {
      storage: diskStorage({
        destination: "./uploads",
        filename: (req, file, cb) => {
          const filename = Date.now() + "-" + file.originalname;
          cb(null, filename);
          },
         }),
       }),
    )
    createProduct(
    @Body() body: any,
    @UploadedFiles() files: Array<Express.Multer.File>
    ) {

    const images = files.map(file => file.filename);

    return this.productsService.createProduct({
      ...body,
      images
    });

  }

    @Get()
        getProducts(){
        return this.productsService.getProducts();
    }

    @Get("filter")
        filterProducts(@Query() query: any){
        return this.productsService.filterProducts(query);
    }

    @Get(":id")
        getProduct(@Param("id") id: string){
        return this.productsService.getProductById(id);
    }

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Put(":id")
@UseInterceptors(
  FilesInterceptor("images", 5, {
    storage: diskStorage({
      destination: "./uploads",
      filename: (req, file, cb) => {
        const filename = Date.now() + "-" + file.originalname;
        cb(null, filename);
      },
    }),
  }),
)
updateProduct(
  @Param("id") id: string,
  @Body() body: any,
  @UploadedFiles() files: Array<Express.Multer.File>,
) {
  if (files && files.length > 0) {
    const images = files.map((file) => file.filename);
    body.images = images;
  }

  return this.productsService.updateProduct(id, body);
}
    

    @Delete(":id")
        deleteProduct(@Param("id") id: string) {
        return this.productsService.deleteProduct(id);
    }

}

