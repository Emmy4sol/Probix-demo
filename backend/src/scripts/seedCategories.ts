import { connectDatabase } from '../config/db';
import Category from '../models/Category';
import { defaultCategories } from '../data/defaultCategories';

async function seed() {
  await connectDatabase();
  for (const category of defaultCategories) {
    await Category.updateOne({ slug: category.slug }, { $set: category }, { upsert: true });
  }
  console.log('Seeded default categories.');
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
