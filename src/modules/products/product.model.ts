import * as mongoose from 'mongoose';

export const ProdyctSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
});

export class Product {
  id: string;
  title: string;
  description: string;
  price: number;
}
