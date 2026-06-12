const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config({ path: '../.env' });

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/oceon_inventory';

const UserSchema = new mongoose.Schema({ name: String, email: String, password: String, role: String });
const ProductSchema = new mongoose.Schema({
  name: String, sku: String, category: String, unit: String,
  lowStockThreshold: { type: Number, default: 20 },
  createdAt: { type: Date, default: Date.now }
});
const WarehouseSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  currentStock: { type: Number, default: 0 },
  totalReceived: { type: Number, default: 0 },
  totalSentToFC: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});
const FCSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  currentStock: { type: Number, default: 0 },
  dailySales: { type: Number, default: 0 },
  totalConsumed: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
const Product = mongoose.model('Product', ProductSchema);
const Warehouse = mongoose.model('Warehouse', WarehouseSchema);
const FC = mongoose.model('FC', FCSchema);

const seedData = async () => {
  await mongoose.connect(MONGO_URI);
  console.log('Connected to MongoDB');

  await User.deleteMany({});
  await Product.deleteMany({});
  await Warehouse.deleteMany({});
  await FC.deleteMany({});

  const hash = async (pw) => bcrypt.hash(pw, 10);

  // Seed all 4 roles
  await User.insertMany([
    { name: 'Aazad',         email: 'aazad@oceon.in',      password: await hash('oceon123'),   role: 'admin' },
    { name: 'Rajan',         email: 'rajan@oceon.in',       password: await hash('warehouse1'), role: 'warehouse_manager' },
    { name: 'Priya',         email: 'priya@oceon.in',       password: await hash('sales123'),   role: 'salesperson' },
    { name: 'Kabir',         email: 'kabir@oceon.in',       password: await hash('fc1234'),     role: 'fc_manager' },
  ]);

  console.log('Users seeded:');
  console.log('  admin             → aazad@oceon.in     / oceon123');
  console.log('  warehouse_manager → rajan@oceon.in     / warehouse1');
  console.log('  salesperson       → priya@oceon.in     / sales123');
  console.log('  fc_manager        → kabir@oceon.in     / fc1234');

  const products = [
    { name: 'Full Cream Milk 1L',      sku: 'MILK-FCM-1L',   category: 'Dairy',      unit: 'Litre',  lowStockThreshold: 30 },
    { name: 'Toned Milk 500ml',        sku: 'MILK-TNM-500',  category: 'Dairy',      unit: 'Pack',   lowStockThreshold: 25 },
    { name: 'Paneer 200g',             sku: 'DAIRY-PNR-200', category: 'Dairy',      unit: 'Pack',   lowStockThreshold: 20 },
    { name: 'Curd 400g',               sku: 'DAIRY-CRD-400', category: 'Dairy',      unit: 'Pack',   lowStockThreshold: 20 },
    { name: 'Butter 100g',             sku: 'DAIRY-BTR-100', category: 'Dairy',      unit: 'Pack',   lowStockThreshold: 15 },
    { name: 'Ghee 500ml',              sku: 'DAIRY-GHE-500', category: 'Dairy',      unit: 'Bottle', lowStockThreshold: 10 },
    { name: 'Cheese Slice 200g',       sku: 'DAIRY-CHS-200', category: 'Dairy',      unit: 'Pack',   lowStockThreshold: 10 },
    { name: 'Lassi 200ml',             sku: 'DAIRY-LSI-200', category: 'Beverages',  unit: 'Bottle', lowStockThreshold: 15 },
    { name: 'Flavoured Milk 200ml',    sku: 'MILK-FLV-200',  category: 'Beverages',  unit: 'Pack',   lowStockThreshold: 20 },
    { name: 'Skimmed Milk Powder 500g',sku: 'MILK-SKP-500',  category: 'Dairy',      unit: 'Pack',   lowStockThreshold: 10 },
  ];

  const createdProducts = await Product.insertMany(products);
  console.log(`\n${createdProducts.length} products created`);

  const warehouseData = [
    { currentStock: 200, totalReceived: 500, totalSentToFC: 300 },
    { currentStock: 150, totalReceived: 400, totalSentToFC: 250 },
    { currentStock: 80,  totalReceived: 200, totalSentToFC: 120 },
    { currentStock: 60,  totalReceived: 180, totalSentToFC: 120 },
    { currentStock: 40,  totalReceived: 120, totalSentToFC: 80  },
    { currentStock: 25,  totalReceived: 80,  totalSentToFC: 55  },
    { currentStock: 18,  totalReceived: 60,  totalSentToFC: 42  },
    { currentStock: 90,  totalReceived: 200, totalSentToFC: 110 },
    { currentStock: 70,  totalReceived: 180, totalSentToFC: 110 },
    { currentStock: 12,  totalReceived: 40,  totalSentToFC: 28  },
  ];

  const fcData = [
    { currentStock: 60, dailySales: 30, totalConsumed: 240 },
    { currentStock: 45, dailySales: 20, totalConsumed: 205 },
    { currentStock: 25, dailySales: 12, totalConsumed: 95  },
    { currentStock: 20, dailySales: 10, totalConsumed: 100 },
    { currentStock: 15, dailySales: 7,  totalConsumed: 65  },
    { currentStock: 8,  dailySales: 4,  totalConsumed: 47  },
    { currentStock: 12, dailySales: 5,  totalConsumed: 30  },
    { currentStock: 35, dailySales: 18, totalConsumed: 75  },
    { currentStock: 28, dailySales: 15, totalConsumed: 82  },
    { currentStock: 5,  dailySales: 2,  totalConsumed: 23  },
  ];

  for (let i = 0; i < createdProducts.length; i++) {
    await Warehouse.create({ product: createdProducts[i]._id, ...warehouseData[i] });
    await FC.create({ product: createdProducts[i]._id, ...fcData[i] });
  }

  console.log('Warehouse and FC stock seeded');
  console.log('\n✅ Seed complete!');
  process.exit(0);
};

seedData().catch(err => { console.error(err); process.exit(1); });
