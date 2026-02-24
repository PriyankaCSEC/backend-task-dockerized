require("dotenv").config();
const sequelize = require("../config/db");
const Category = require("../models/Category");
const Product = require("../models/Product");

const seedData = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB Connection successful");

    // Sync models
    await sequelize.sync({ force: true });
    console.log("✅ Tables synced");

    // Create sample categories (10 total)
    const categories = await Category.bulkCreate([
      { cd_name: "Electronics", cd_description: "Gadgets and electronic devices" },
      { cd_name: "Clothing", cd_description: "Apparel and fashion items" },
      { cd_name: "Home & Garden", cd_description: "Home decor and gardening tools" },
      { cd_name: "Sports", cd_description: "Sports equipment and accessories" },
      { cd_name: "Books", cd_description: "Physical and digital books" },
      { cd_name: "Beauty & Personal Care", cd_description: "Cosmetics, skincare, and personal grooming" },
      { cd_name: "Toys & Games", cd_description: "Toys, board games, and entertainment" },
      { cd_name: "Automotive", cd_description: "Car accessories and maintenance tools" },
      { cd_name: "Health & Wellness", cd_description: "Vitamins, supplements, and health products" },
      { cd_name: "Pet Supplies", cd_description: "Food, toys, and accessories for pets" }
    ]);
    console.log(`✅ Created ${categories.length} categories`);

    // Create sample products (150 total - 15 per category)
    const products = await Product.bulkCreate([
      // Electronics (cd_id: 1) - 15 products
      { pd_name: "Smartphone X Pro", pd_description: "Latest 5G smartphone with OLED display and triple camera", pd_price: 899.99, cd_id: 1 },
      { pd_name: "Wireless Headphones Elite", pd_description: "Premium noise-canceling over-ear headphones with 30hr battery", pd_price: 299.99, cd_id: 1 },
      { pd_name: "Laptop Pro 15", pd_description: "15-inch laptop for professionals with 16GB RAM", pd_price: 1299.99, cd_id: 1 },
      { pd_name: "Smart Watch Series 5", pd_description: "Fitness tracking smartwatch with GPS and heart rate monitor", pd_price: 349.99, cd_id: 1 },
      { pd_name: "Bluetooth Speaker Max", pd_description: "Portable waterproof speaker with 360 sound", pd_price: 129.99, cd_id: 1 },
      { pd_name: "4K Webcam", pd_description: "Ultra HD webcam with auto-focus and noise reduction", pd_price: 149.99, cd_id: 1 },
      { pd_name: "Gaming Laptop", pd_description: "High-performance gaming laptop with RTX graphics", pd_price: 1899.99, cd_id: 1 },
      { pd_name: "Wireless Mouse", pd_description: "Ergonomic wireless mouse with precision tracking", pd_price: 49.99, cd_id: 1 },
      { pd_name: "Mechanical Keyboard", pd_description: "RGB backlit mechanical keyboard with blue switches", pd_price: 129.99, cd_id: 1 },
      { pd_name: "External SSD 1TB", pd_description: "Portable solid state drive with USB-C", pd_price: 119.99, cd_id: 1 },
      { pd_name: "Tablet Pro 11", pd_description: "11-inch tablet with stylus support", pd_price: 799.99, cd_id: 1 },
      { pd_name: "Wireless Earbuds", pd_description: "True wireless earbuds with active noise cancellation", pd_price: 179.99, cd_id: 1 },
      { pd_name: "Gaming Console", pd_description: "Next-gen gaming console with 4K support", pd_price: 499.99, cd_id: 1 },
      { pd_name: "Drone with Camera", pd_description: "4K camera drone with GPS and follow mode", pd_price: 599.99, cd_id: 1 },
      { pd_name: "Smart Home Hub", pd_description: "Voice-controlled smart home controller", pd_price: 99.99, cd_id: 1 },
      
      // Clothing (cd_id: 2) - 15 products
      { pd_name: "Organic Cotton T-Shirt", pd_description: "100% organic cotton tee in multiple colors", pd_price: 29.99, cd_id: 2 },
      { pd_name: "Classic Denim Jeans", pd_description: "Classic fit blue jeans with stretch comfort", pd_price: 69.99, cd_id: 2 },
      { pd_name: "Running Shoes Pro", pd_description: "Lightweight running sneakers with cushioned sole", pd_price: 119.99, cd_id: 2 },
      { pd_name: "Winter Puffer Jacket", pd_description: "Insulated waterproof jacket for extreme cold", pd_price: 199.99, cd_id: 2 },
      { pd_name: "Wool Sweater", pd_description: "Soft merino wool sweater for winter", pd_price: 89.99, cd_id: 2 },
      { pd_name: "Summer Floral Dress", pd_description: "Floral print summer dress with pockets", pd_price: 49.99, cd_id: 2 },
      { pd_name: "Leather Jacket", pd_description: "Genuine leather motorcycle jacket", pd_price: 249.99, cd_id: 2 },
      { pd_name: "Yoga Leggings", pd_description: "High-waisted stretch leggings for workouts", pd_price: 39.99, cd_id: 2 },
      { pd_name: "Formal Shirt", pd_description: " wrinkle-free dress shirt for business", pd_price: 54.99, cd_id: 2 },
      { pd_name: "Cargo Shorts", pd_description: "Multi-pocket casual shorts for summer", pd_price: 34.99, cd_id: 2 },
      { pd_name: "Hooded Sweatshirt", pd_description: "Soft fleece hoodie with kangaroo pocket", pd_price: 44.99, cd_id: 2 },
      { pd_name: "Ankle Boots", pd_description: "Leather ankle boots with side zipper", pd_price: 89.99, cd_id: 2 },
      { pd_name: "Swimsuit", pd_description: "Quick-dry one-piece swimsuit", pd_price: 59.99, cd_id: 2 },
      { pd_name: "Silk Scarf", pd_description: "Elegant printed silk scarf", pd_price: 45.99, cd_id: 2 },
      { pd_name: "Winter Gloves", pd_description: "Touchscreen compatible thermal gloves", pd_price: 24.99, cd_id: 2 },
      
      // Home & Garden (cd_id: 3) - 15 products
      { pd_name: "Programmable Coffee Maker", pd_description: "12-cup programmable coffee machine with timer", pd_price: 99.99, cd_id: 3 },
      { pd_name: "Expandable Garden Hose", pd_description: "75ft expandable garden hose with spray nozzle", pd_price: 44.99, cd_id: 3 },
      { pd_name: "Smart LED Desk Lamp", pd_description: "Modern LED desk lamp with wireless charging", pd_price: 59.99, cd_id: 3 },
      { pd_name: "Decorative Throw Pillows", pd_description: "Set of 4 decorative velvet pillows", pd_price: 39.99, cd_id: 3 },
      { pd_name: "High-Speed Blender", pd_description: "Professional kitchen blender with 8 speeds", pd_price: 89.99, cd_id: 3 },
      { pd_name: "Robot Vacuum Cleaner", pd_description: "Smart robot vacuum with app control", pd_price: 299.99, cd_id: 3 },
      { pd_name: "Air Fryer", pd_description: "Digital air fryer with 5.8qt capacity", pd_price: 129.99, cd_id: 3 },
      { pd_name: "Patio Furniture Set", pd_description: "4-piece outdoor wicker furniture set", pd_price: 599.99, cd_id: 3 },
      { pd_name: "LED Grow Light", pd_description: "Full spectrum plant grow light for indoor gardens", pd_price: 34.99, cd_id: 3 },
      { pd_name: "Pressure Washer", pd_description: "Electric pressure washer for outdoor cleaning", pd_price: 179.99, cd_id: 3 },
      { pd_name: "Slow Cooker", pd_description: "6-quart programmable slow cooker", pd_price: 69.99, cd_id: 3 },
      { pd_name: "Bedding Set", pd_description: "King size 6-piece bedding set with sheets", pd_price: 89.99, cd_id: 3 },
      { pd_name: "Storage Containers", pd_description: "Airtight food storage container set", pd_price: 29.99, cd_id: 3 },
      { pd_name: "BBQ Grill", pd_description: "Propane gas grill with 4 burners", pd_price: 399.99, cd_id: 3 },
      { pd_name: "Cordless Drill", pd_description: "20V lithium-ion drill driver set", pd_price: 79.99, cd_id: 3 },
      
      // Sports (cd_id: 4) - 15 products
      { pd_name: "Premium Yoga Mat", pd_description: "Extra thick non-slip exercise mat with carrying strap", pd_price: 39.99, cd_id: 4 },
      { pd_name: "Adjustable Dumbbells Set", pd_description: "5-50lb adjustable weight dumbbells", pd_price: 149.99, cd_id: 4 },
      { pd_name: "Professional Tennis Racket", pd_description: "Carbon fiber racket for intermediate players", pd_price: 189.99, cd_id: 4 },
      { pd_name: "Official Basketball", pd_description: "Size 7 indoor/outdoor basketball", pd_price: 29.99, cd_id: 4 },
      { pd_name: "Aerodynamic Cycling Helmet", pd_description: "Lightweight ventilated safety helmet", pd_price: 69.99, cd_id: 4 },
      { pd_name: "Resistance Bands Set", pd_description: "5 levels resistance bands with handles", pd_price: 24.99, cd_id: 4 },
      { pd_name: "Treadmill Home", pd_description: "Folding electric treadmill with incline", pd_price: 599.99, cd_id: 4 },
      { pd_name: "Golf Club Set", pd_description: "Complete 12-piece golf club set with bag", pd_price: 349.99, cd_id: 4 },
      { pd_name: "Swimming Goggles", pd_description: "Anti-fog UV protection swim goggles", pd_price: 19.99, cd_id: 4 },
      { pd_name: "Boxing Gloves", pd_description: "Professional training boxing gloves pair", pd_price: 44.99, cd_id: 4 },
      { pd_name: "Soccer Ball", pd_description: "FIFA approved match soccer ball", pd_price: 34.99, cd_id: 4 },
      { pd_name: "Kettlebell 20lb", pd_description: "Cast iron kettlebell for strength training", pd_price: 39.99, cd_id: 4 },
      { pd_name: "Camping Tent", pd_description: "4-person waterproof dome tent", pd_price: 129.99, cd_id: 4 },
      { pd_name: "Fishing Rod", pd_description: "Carbon fiber spinning rod and reel combo", pd_price: 79.99, cd_id: 4 },
      { pd_name: "Jump Rope", pd_description: "Adjustable speed rope with ball bearings", pd_price: 14.99, cd_id: 4 },
      
      // Books (cd_id: 5) - 15 products
      { pd_name: "Complete JavaScript Guide", pd_description: "Comprehensive JS programming from beginner to expert", pd_price: 49.99, cd_id: 5 },
      { pd_name: "Dune - Sci-Fi Epic", pd_description: "Award-winning science fiction novel", pd_price: 18.99, cd_id: 5 },
      { pd_name: "Healthy Living Cookbook", pd_description: "100+ nutritious recipes for busy people", pd_price: 29.99, cd_id: 5 },
      { pd_name: "World History Encyclopedia", pd_description: "Complete illustrated history of civilization", pd_price: 59.99, cd_id: 5 },
      { pd_name: "Children's Bedtime Stories", pd_description: "Illustrated classic tales for kids", pd_price: 14.99, cd_id: 5 },
      { pd_name: "Mystery Thriller Novel", pd_description: "Bestselling crime mystery page-turner", pd_price: 16.99, cd_id: 5 },
      { pd_name: "Python Programming", pd_description: "Learn Python from scratch with projects", pd_price: 44.99, cd_id: 5 },
      { pd_name: "Self-Help Bestseller", pd_description: "Transform your life with proven strategies", pd_price: 24.99, cd_id: 5 },
      { pd_name: "Art of Cooking", pd_description: "Master chef techniques and recipes", pd_price: 39.99, cd_id: 5 },
      { pd_name: "Space Exploration", pd_description: "Journey through the cosmos and beyond", pd_price: 27.99, cd_id: 5 },
      { pd_name: "Financial Freedom", pd_description: "Personal finance and investment guide", pd_price: 22.99, cd_id: 5 },
      { pd_name: "Meditation Guide", pd_description: "Mindfulness practices for inner peace", pd_price: 18.99, cd_id: 5 },
      { pd_name: "Photography Masterclass", pd_description: "Learn professional photography techniques", pd_price: 34.99, cd_id: 5 },
      { pd_name: "Travel Guide Europe", pd_description: "Ultimate guide to European destinations", pd_price: 26.99, cd_id: 5 },
      { pd_name: "Gardening for Beginners", pd_description: "Start your own garden from scratch", pd_price: 21.99, cd_id: 5 },
      
      // Beauty & Personal Care (cd_id: 6) - 15 products
      { pd_name: "Hydrating Face Serum", pd_description: "Vitamin C serum for glowing skin", pd_price: 34.99, cd_id: 6 },
      { pd_name: "Electric Toothbrush", pd_description: "Sonic toothbrush with 5 cleaning modes", pd_price: 79.99, cd_id: 6 },
      { pd_name: "Perfume Gift Set", pd_description: "Collection of 4 premium fragrances", pd_price: 89.99, cd_id: 6 },
      { pd_name: "Hair Dryer Pro", pd_description: "Ionic hair dryer with diffuser attachment", pd_price: 59.99, cd_id: 6 },
      { pd_name: "Organic Shampoo", pd_description: "Sulfate-free shampoo for all hair types", pd_price: 19.99, cd_id: 6 },
      { pd_name: "Anti-Aging Cream", pd_description: "Retinol night cream for wrinkle reduction", pd_price: 44.99, cd_id: 6 },
      { pd_name: "Beard Trimmer", pd_description: "Precision grooming kit for men", pd_price: 39.99, cd_id: 6 },
      { pd_name: "Nail Polish Set", pd_description: "12-color gel nail polish collection", pd_price: 24.99, cd_id: 6 },
      { pd_name: "Facial Cleansing Brush", pd_description: "Sonic face cleanser with 3 brush heads", pd_price: 49.99, cd_id: 6 },
      { pd_name: "Sunscreen SPF 50", pd_description: "Water-resistant broad spectrum protection", pd_price: 14.99, cd_id: 6 },
      { pd_name: "Makeup Palette", pd_description: "Eyeshadow palette with 40 colors", pd_price: 29.99, cd_id: 6 },
      { pd_name: "Body Lotion", pd_description: "Shea butter moisturizing body cream", pd_price: 12.99, cd_id: 6 },
      { pd_name: "Teeth Whitening Kit", pd_description: "LED teeth whitening system", pd_price: 69.99, cd_id: 6 },
      { pd_name: "Curling Iron", pd_description: "Ceramic tourmaline curling wand", pd_price: 44.99, cd_id: 6 },
      { pd_name: "Lipstick Set", pd_description: "Matte liquid lipstick collection of 12", pd_price: 32.99, cd_id: 6 },
      
      // Toys & Games (cd_id: 7) - 15 products
      { pd_name: "LEGO Building Set", pd_description: "1000-piece creative building bricks", pd_price: 59.99, cd_id: 7 },
      { pd_name: "Strategy Board Game", pd_description: "Award-winning family board game", pd_price: 39.99, cd_id: 7 },
      { pd_name: "Remote Control Car", pd_description: "High-speed RC car with rechargeable battery", pd_price: 49.99, cd_id: 7 },
      { pd_name: "Puzzle 1000 Pieces", pd_description: "Beautiful landscape jigsaw puzzle", pd_price: 24.99, cd_id: 7 },
      { pd_name: "Plush Teddy Bear", pd_description: "Super soft 20-inch stuffed animal", pd_price: 29.99, cd_id: 7 },
      { pd_name: "Educational STEM Kit", pd_description: "Science experiments kit for kids 8+", pd_price: 34.99, cd_id: 7 },
      { pd_name: "Dollhouse", pd_description: "Wooden dollhouse with furniture set", pd_price: 89.99, cd_id: 7 },
      { pd_name: "Nerf Blaster", pd_description: "Motorized dart blaster with 20 darts", pd_price: 29.99, cd_id: 7 },
      { pd_name: "Play-Doh Set", pd_description: "36-color modeling compound set", pd_price: 19.99, cd_id: 7 },
      { pd_name: "Chess Set", pd_description: "Wooden chess board with weighted pieces", pd_price: 44.99, cd_id: 7 },
      { pd_name: "Action Figure", pd_description: "Collectible superhero action figure", pd_price: 24.99, cd_id: 7 },
      { pd_name: "Bubble Machine", pd_description: "Automatic bubble blower for parties", pd_price: 22.99, cd_id: 7 },
      { pd_name: "Kite", pd_description: "Large delta kite with 300ft line", pd_price: 18.99, cd_id: 7 },
      { pd_name: "Water Guns", pd_description: "Pack of 2 super soaker water blasters", pd_price: 26.99, cd_id: 7 },
      { pd_name: "Building Blocks", pd_description: "Magnetic tile building set 100 pieces", pd_price: 54.99, cd_id: 7 },
      
      // Automotive (cd_id: 8) - 15 products
      { pd_name: "Car Vacuum Cleaner", pd_description: "Portable handheld vacuum for vehicles", pd_price: 39.99, cd_id: 8 },
      { pd_name: "Phone Mount Holder", pd_description: "Dashboard phone mount with wireless charging", pd_price: 29.99, cd_id: 8 },
      { pd_name: "Emergency Road Kit", pd_description: "Complete car emergency kit with jumper cables", pd_price: 54.99, cd_id: 8 },
      { pd_name: "Seat Covers Set", pd_description: "Universal fit leather seat covers", pd_price: 79.99, cd_id: 8 },
      { pd_name: "Tire Inflator", pd_description: "Digital air compressor with auto shut-off", pd_price: 44.99, cd_id: 8 },
      { pd_name: "Dash Cam", pd_description: "1080p dashboard camera with night vision", pd_price: 69.99, cd_id: 8 },
      { pd_name: "Car Cover", pd_description: "All-weather waterproof car cover", pd_price: 59.99, cd_id: 8 },
      { pd_name: "Floor Mats", pd_description: "All-weather rubber floor mats set", pd_price: 49.99, cd_id: 8 },
      { pd_name: "Steering Wheel Cover", pd_description: "Leather steering wheel wrap with grip", pd_price: 19.99, cd_id: 8 },
      { pd_name: "Car Battery Charger", pd_description: "Smart battery maintainer and charger", pd_price: 64.99, cd_id: 8 },
      { pd_name: "Windshield Sunshade", pd_description: "Foldable UV reflective sun protector", pd_price: 14.99, cd_id: 8 },
      { pd_name: "Car Polish Kit", pd_description: "Complete car wax and polish set", pd_price: 34.99, cd_id: 8 },
      { pd_name: "Blind Spot Mirrors", pd_description: "Adjustable convex mirror set of 2", pd_price: 12.99, cd_id: 8 },
      { pd_name: "OBD2 Scanner", pd_description: "Bluetooth car diagnostic tool", pd_price: 39.99, cd_id: 8 },
      { pd_name: "Roof Cargo Box", pd_description: "18 cubic ft rooftop storage carrier", pd_price: 299.99, cd_id: 8 },
      
      // Health & Wellness (cd_id: 9) - 15 products
      { pd_name: "Multivitamin Complex", pd_description: "Daily vitamins with minerals 180 tablets", pd_price: 29.99, cd_id: 9 },
      { pd_name: "Digital Body Scale", pd_description: "Smart scale with body composition analysis", pd_price: 49.99, cd_id: 9 },
      { pd_name: "Protein Powder", pd_description: "Whey protein isolate chocolate flavor 2lb", pd_price: 44.99, cd_id: 9 },
      { pd_name: "Blood Pressure Monitor", pd_description: "Upper arm BP monitor with large display", pd_price: 59.99, cd_id: 9 },
      { pd_name: "Essential Oil Diffuser", pd_description: "Aromatherapy diffuser with 7 LED colors", pd_price: 24.99, cd_id: 9 },
      { pd_name: "Foam Roller", pd_description: "High-density muscle roller for recovery", pd_price: 19.99, cd_id: 9 },
      { pd_name: "Omega-3 Supplements", pd_description: "Fish oil capsules for heart health", pd_price: 24.99, cd_id: 9 },
      { pd_name: "Heating Pad", pd_description: "Electric heating pad for pain relief", pd_price: 34.99, cd_id: 9 },
      { pd_name: "Yoga Block Set", pd_description: "Cork yoga blocks set of 2", pd_price: 18.99, cd_id: 9 },
      { pd_name: "Vitamin D3", pd_description: "High potency vitamin D supplements", pd_price: 15.99, cd_id: 9 },
      { pd_name: "Massage Gun", pd_description: "Percussion muscle massager with 6 heads", pd_price: 129.99, cd_id: 9 },
      { pd_name: "Sleep Aid Supplement", pd_description: "Natural melatonin sleep support", pd_price: 19.99, cd_id: 9 },
      { pd_name: "First Aid Kit", pd_description: "Comprehensive 200-piece emergency kit", pd_price: 29.99, cd_id: 9 },
      { pd_name: "Resistance Loop Bands", pd_description: "Set of 5 exercise bands with guide", pd_price: 14.99, cd_id: 9 },
      { pd_name: "Air Purifier", pd_description: "HEPA filter air cleaner for home", pd_price: 89.99, cd_id: 9 },
      
      // Pet Supplies (cd_id: 10) - 15 products
      { pd_name: "Premium Dog Food", pd_description: "Grain-free chicken formula 25lb bag", pd_price: 59.99, cd_id: 10 },
      { pd_name: "Cat Tree Tower", pd_description: "Multi-level scratching post with condo", pd_price: 89.99, cd_id: 10 },
      { pd_name: "Interactive Dog Toy", pd_description: "Treat-dispensing puzzle toy for dogs", pd_price: 19.99, cd_id: 10 },
      { pd_name: "Pet Grooming Kit", pd_description: "Professional clippers and brush set", pd_price: 34.99, cd_id: 10 },
      { pd_name: "Automatic Pet Feeder", pd_description: "Programmable food dispenser with timer", pd_price: 79.99, cd_id: 10 },
      { pd_name: "Cozy Pet Bed", pd_description: "Orthopedic memory foam bed for large dogs", pd_price: 49.99, cd_id: 10 },
      { pd_name: "Cat Litter Box", pd_description: "Self-cleaning automatic litter box", pd_price: 149.99, cd_id: 10 },
      { pd_name: "Dog Leash Set", pd_description: "Reflective leash with comfortable handle", pd_price: 16.99, cd_id: 10 },
      { pd_name: "Pet Water Fountain", pd_description: "Automatic filtered water dispenser", pd_price: 29.99, cd_id: 10 },
      { pd_name: "Cat Toys Set", pd_description: "10-piece interactive cat toy collection", pd_price: 14.99, cd_id: 10 },
      { pd_name: "Dog Training Pads", pd_description: "Absorbent puppy pads pack of 100", pd_price: 24.99, cd_id: 10 },
      { pd_name: "Pet Carrier", pd_description: "Airline approved soft-sided pet carrier", pd_price: 39.99, cd_id: 10 },
      { pd_name: "Fish Tank", pd_description: "5-gallon aquarium starter kit with filter", pd_price: 69.99, cd_id: 10 },
      { pd_name: "Bird Cage", pd_description: "Large flight cage with perches and toys", pd_price: 79.99, cd_id: 10 },
      { pd_name: "Pet Nail Grinder", pd_description: "Electric nail trimmer for dogs and cats", pd_price: 22.99, cd_id: 10 }
    ]);
    console.log(`✅ Created ${products.length} products`);

    console.log("\n🎉 Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedData();
