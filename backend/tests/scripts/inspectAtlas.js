const { MongoClient } = require('mongodb');
if (typeof globalThis.crypto === 'undefined') globalThis.crypto = require('crypto');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

async function inspect() {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) {
    console.error('No MongoDB URI found in backend/.env');
    process.exit(1);
  }
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const names = ['users', 'markets', 'forecasts', 'watchlists'];
    for (const name of names) {
      const col = db.collection(name);
      const count = await col.countDocuments();
      const sample = await col.find({}).limit(3).toArray();
      console.log(`--- ${name} (${count} documents)`);
      console.log(sample.map(d => ({ _id: d._id, ...(d.userId && { userId: d.userId }), ...(d.marketId && { marketId: d.marketId }), createdAt: d.createdAt })).slice(0,3));
    }
  } catch (err) {
    console.error('Error inspecting Atlas:', err);
    process.exit(2);
  } finally {
    await client.close();
  }
}

inspect();
