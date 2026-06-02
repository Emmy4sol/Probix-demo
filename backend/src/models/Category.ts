import { Schema, model, models } from 'mongoose';

export interface CategoryDocument {
  name: string;
  slug: string;
  icon: string;
  color: string;
  isActive: boolean;
}

const categorySchema = new Schema<CategoryDocument>({
  name: { type: String, required: true, unique: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  icon: { type: String, required: true, trim: true },
  color: { type: String, required: true, trim: true },
  isActive: { type: Boolean, default: true }
});

const Category = models.Category || model<CategoryDocument>('Category', categorySchema);
export default Category;
