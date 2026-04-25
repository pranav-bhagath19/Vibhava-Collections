import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, getDocs } from "firebase/firestore";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env.local
const envPath = join(__dirname, "..", ".env.local");
const envConfig = dotenv.parse(fs.readFileSync(envPath));
for (const k in envConfig) {
  process.env[k] = envConfig[k];
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Data to seed (Copied from mockData.ts to ensure standalone capability)
const categories = [
  { name: 'Silk Sarees', slug: 'silk-sarees', image: '/assets/images/designer_saree_category.png', count: 45 },
  { name: 'Cotton Sarees', slug: 'cotton-sarees', image: '/assets/images/cotton_saree_category.png', count: 32 },
  { name: 'Dress Materials', slug: 'dress-materials', image: '/assets/images/dress_material_category.png', count: 28 }
];

const products = [
  {
    id: '1',
    name: 'Royal Maroon Kanchipuram Silk',
    price: 24500,
    discountPrice: 21000,
    category: 'Silk Sarees',
    fabric: 'Pure Mulberry Silk',
    color: 'Maroon & Gold',
    images: ['/assets/images/vibhava_hero_saree.png', '/assets/images/vibhava_hero_saree.png'],
    rating: 4.9,
    reviews: 128,
    trending: true,
    description: 'A masterpiece of heritage weaving, this Kanchipuram silk saree features intricate zari work and a rich maroon hue that embodies royal elegance.'
  },
  {
    id: '2',
    name: 'Midnight Blue Banarasi Drapes',
    price: 18900,
    category: 'Silk Sarees',
    fabric: 'Banarasi Silk',
    color: 'Midnight Blue',
    images: ['/assets/images/designer_saree_category.png'],
    rating: 4.8,
    reviews: 85,
    description: 'Handwoven in the heart of Varanasi, this Banarasi silk saree is a timeless classic for grand occasions.'
  },
  {
    id: '3',
    name: 'Ethereal White Chanderi',
    price: 8500,
    discountPrice: 6999,
    category: 'Cotton Sarees',
    fabric: 'Chanderi Silk-Cotton',
    color: 'Pearl White',
    images: ['/assets/images/cotton_saree_category.png'],
    rating: 4.7,
    reviews: 56,
    description: 'Lightweight and elegant, this Chanderi saree is perfect for daytime events and summer festivities.'
  },
  {
    id: '4',
    name: 'Vintage Rose Anarkali Set',
    price: 12500,
    category: 'Dress Materials',
    fabric: 'Organic Cotton',
    color: 'Dusty Rose',
    images: ['/assets/images/dress_material_category.png'],
    rating: 4.6,
    reviews: 42,
    trending: true,
    description: 'Premium unstitched dress material with hand-block prints and delicate embroidery details.'
  }
];

async function seed() {
  console.log("🚀 Starting Production Seeding...");
  
  try {
    // 1. Seed Categories
    console.log("📦 Seeding categories...");
    for (const cat of categories) {
      await setDoc(doc(db, "categories", cat.slug), cat);
      console.log(`   - Seeded category: ${cat.name}`);
    }

    // 2. Seed Products
    console.log("🛍️ Seeding products...");
    for (const prod of products) {
      await setDoc(doc(db, "products", prod.id), prod);
      console.log(`   - Seeded product: ${prod.name}`);
    }

    console.log("\n✅ Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("\n❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
