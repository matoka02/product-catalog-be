import { Model, Schema, model, models } from 'mongoose';

import { IProduct } from './product.';

export interface IDescription {
  title: string;
  text: string[];
  productId: IProduct;
}

const DescriptionSchema = new Schema<IDescription>({
  title: { type: String, required: true },
  text: { type: [String], required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product' }
});

export const Description: Model<IDescription> = models?.Description || model('Description', DescriptionSchema);
