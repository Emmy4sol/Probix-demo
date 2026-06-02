import mongoose from 'mongoose';
import { connectDatabase } from '../config/db';
import Category from '../models/Category';
import User from '../models/User';
import Market from '../models/Market';

async function seedMarkets() {
  try {
    await connectDatabase();
    console.log('[INFO] Connected to database');

    // Get categories
    const categories = await Category.find({});
    if (categories.length === 0) {
      throw new Error('No categories found. Run seed:categories first');
    }

    // Get or create admin user
    let adminUser = await User.findOne({ username: 'admin' });
    if (!adminUser) {
      const bcrypt = require('bcrypt');
      const passwordHash = await bcrypt.hash('admin123', 10);
      adminUser = await User.create({
        username: 'admin',
        email: 'admin@probix.local',
        passwordHash,
        role: 'ADMIN'
      });
      console.log('[INFO] Created admin user');
    }

    // Helper to generate slug
    function generateSlug(title: string) {
      return title
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    }

    // Sample markets to seed
    const now = new Date();
    const closeDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days
    const resolveDate = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000); // 60 days

    const sampleMarkets = [
      {
        title: 'Will Bitcoin reach $150,000 before 2026?',
        category: 'Crypto',
        categoryId: categories.find(c => c.slug === 'crypto')?._id,
        sourceName: 'Probix Research',
        sourceUrl: 'https://probix.io',
        description: 'Will Bitcoin (BTC) reach a price of $150,000 USD or higher at any point before December 31, 2025? Resolution based on closing price on major exchanges.',
        closeDate,
        resolveDate,
        createdBy: adminUser._id
      },
      {
        title: 'Will Nigeria\'s Naira be below ₦2,000/USD before December 2026?',
        category: 'Economy',
        categoryId: categories.find(c => c.slug === 'economy')?._id,
        sourceName: 'Central Bank of Nigeria',
        sourceUrl: 'https://www.cbn.gov.ng',
        description: 'Will the Nigerian Naira exchange rate strengthen to below ₦2,000 per 1 USD at any point before December 31, 2026?',
        closeDate,
        resolveDate,
        createdBy: adminUser._id
      },
      {
        title: 'Will Manchester United win the Premier League in 2024-25?',
        category: 'Sports',
        categoryId: categories.find(c => c.slug === 'sports')?._id,
        sourceName: 'Premier League',
        sourceUrl: 'https://www.premierleague.com',
        description: 'Will Manchester United Football Club win the English Premier League title in the 2024-25 season?',
        closeDate,
        resolveDate,
        createdBy: adminUser._id
      },
      {
        title: 'Will there be a US-China trade war escalation in 2025?',
        category: 'Politics',
        categoryId: categories.find(c => c.slug === 'politics')?._id,
        sourceName: 'Global Trade Monitor',
        sourceUrl: 'https://probix.io',
        description: 'Will the United States and China impose additional tariffs or trade restrictions beyond current levels before June 30, 2025?',
        closeDate,
        resolveDate,
        createdBy: adminUser._id
      },
      {
        title: 'Will egg prices in Nigeria drop below ₦4,500 per crate by July 2025?',
        category: 'Economy',
        categoryId: categories.find(c => c.slug === 'economy')?._id,
        sourceName: 'Nigeria Agricultural Ministry',
        sourceUrl: 'https://probix.io',
        description: 'Will the retail price of eggs (per 30-egg crate) in Lagos, Nigeria fall below ₦4,500 at any point before July 31, 2025?',
        closeDate,
        resolveDate,
        createdBy: adminUser._id
      },
      {
        title: 'Will Artificial General Intelligence (AGI) be achieved by 2030?',
        category: 'Technology',
        categoryId: categories.find(c => c.slug === 'technology')?._id,
        sourceName: 'AI Research Consensus',
        sourceUrl: 'https://probix.io',
        description: 'Will Artificial General Intelligence (AGI) - an AI system with human-level intelligence across all domains - be demonstrated and widely recognized by December 31, 2030?',
        closeDate,
        resolveDate,
        createdBy: adminUser._id
      }
    ];

    // Add slugs to markets
    const marketsWithSlugs = sampleMarkets.map(market => ({
      ...market,
      slug: generateSlug(market.title)
    }));

    // Upsert markets - use create and handle duplicates
    for (const market of marketsWithSlugs) {
      try {
        await Market.create(market);
      } catch (err: any) {
        // Ignore duplicate key errors, just update
        if (err.code === 11000) {
          await Market.updateOne(
            { title: market.title },
            { $set: market }
          );
        } else {
          throw err;
        }
      }
    }

    console.log(`✅ Seeded ${marketsWithSlugs.length} sample markets`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding markets:', error);
    process.exit(1);
  }
}

seedMarkets();
