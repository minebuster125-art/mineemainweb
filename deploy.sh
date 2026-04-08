#!/bin/bash
# Hostinger Deployment Script for MineProductions

echo "🚀 MineProductions - Hostinger Deployment"
echo "=========================================="

# Step 1: Create data directory
echo "📁 Creating data directory..."
mkdir -p data
chmod 777 data
echo "[]" > data/shop-items.json
echo "[]" > data/orders.json
chmod 666 data/*.json

# Step 2: Install dependencies
echo "📦 Installing dependencies..."
yarn install --production

# Step 3: Build application
echo "🔨 Building application..."
yarn build

# Step 4: Check if build was successful
if [ -d ".next" ]; then
    echo "✅ Build successful!"
else
    echo "❌ Build failed!"
    exit 1
fi

# Step 5: Start application
echo "🚀 Starting application..."
yarn start

echo "✅ Deployment complete!"
echo "Admin Panel: https://yourwebsite.com/mp-admin-x7k2"
echo "Shop Page: https://yourwebsite.com/shop"
