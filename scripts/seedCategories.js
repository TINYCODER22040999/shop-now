import dotenv from 'dotenv';
import mongoose from 'mongoose';
import slugify from 'slugify';
import Category from '../models/categoryModel.js';

dotenv.config();

async function run() {
  try {
    if (!process.env.MONGO_URL) {
      console.error('MONGO_URL not set. Aborting.');
      process.exit(1);
    }
    await mongoose.connect(process.env.MONGO_URL);

    const existingCount = await Category.countDocuments();
    if (existingCount > 0) {
      console.log(`Categories already present: ${existingCount}. Skipping seeding.`);
      process.exit(0);
    }

    const names = [
      'Men',
      'Women',
      'Kids',
      'Shoes',
      'Accessories',
      'Electronics',
      'Home & Kitchen',
      'Beauty & Personal Care',
      'Sports & Outdoors'
    ];

    const docs = names.map((name) => ({ name, slug: slugify(name) }));
    const created = await Category.insertMany(docs);
    console.log(`Inserted ${created.length} categories.`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();




