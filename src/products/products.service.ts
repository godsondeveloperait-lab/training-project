import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schema/product.schema';
import { Model } from 'mongoose';
import { MESSAGES } from 'src/common/constants/messages.constants';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';

@Injectable()
export class ProductsService {
    constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  async createProduct(data: CreateProductDto) {
    try {

      const product = await this.productModel.create(data);

      return {
        message: MESSAGES.PRODUCT_CREATED,
        data: product
      };

    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProducts() {

  try {

    const products = await this.productModel.find();

    return {
      message: MESSAGES.PRODUCT_FETCHED,
      data: products
    };

  } catch (error) {
    throw new Error(error.message);
  }

}

async getProductById(id: string){

  try{

    const product = await this.productModel.findById(id);

    return {
      message: MESSAGES.PRODUCT_FETCHED,
      data: product
    };

  }catch(error){
    throw new Error(error.message)
  }

}

async updateProduct(id: string, data: UpdateProductDto) {

  try {

    const product = await this.productModel.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );

    return {
      message: MESSAGES.PRODUCT_UPDATED,
      data: product
    };

  } catch (error) {
    throw new Error(error.message);
  }

}

async deleteProduct(id: string) {

  try {

    await this.productModel.findByIdAndDelete(id);

    return {
      message: MESSAGES.PRODUCT_DELETED,
    };

  } catch (error) {
    throw new Error(error.message);
  }

}

async filterProducts(query: FilterProductDto) {

  try {

    const filter: any = {};

    if (query.name) {
      filter.name = { $regex: query.name, $options: "i" };
    }

    if (query.stock) {
      filter.stock = { $gt: 0 };
    }

    if (query.price) {
      filter.price = { $lte: Number(query.price) };
    }


    if (query.createdAt) {
      filter.createdAt = { $gte: new Date(query.createdAt) };
    }

    const products = await this.productModel.find(filter);

    return {
      message: "Filtered products",
      data: products
    };

  } catch (error) {
    throw new Error(error.message);
  }

}



}

