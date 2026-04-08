# MineProductions - Fixed (No Database Required!) 🎉

## ✅ Issue Fixed!

**Previous Problem:** Admin panel mein add kiye gaye items sirf admin ke browser mein dikh rahe the.

**Solution:** Ab sab kuch **JSON file-based storage** use karta hai - koi database setup nahi chahiye!

## 🚀 How It Works Now

1. **Admin Panel** (`/mp-admin-x7k2`) se items add karo
2. Items automatically `/data/shop-items.json` file mein save ho jate hain
3. **Shop Page** (`/shop`) sab devices aur browsers pe items dikhata hai
4. **No MySQL/Database** setup required!

## 📁 File Structure

```
/app
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── shop/route.ts          # Public API - shop items fetch
│   │   │   ├── admin/data/route.ts    # Admin API - add/delete items
│   │   │   └── order/route.ts         # Order submission
│   │   ├── shop/page.tsx              # Shop page (public)
│   │   └── mp-admin-x7k2/page.tsx     # Admin panel
│   └── ...
├── data/                              # Auto-created
│   ├── shop-items.json                # Shop products
│   └── orders.json                    # Customer orders
├── .env.local                         # Environment variables
└── package.json
```

## 🔧 Setup Instructions

### 1. Install Dependencies
```bash
cd /app
yarn install
```

### 2. Build Application
```bash
yarn build
```

### 3. Start Server
```bash
yarn start
```

Server will run on `http://localhost:3000`

## 🎯 Admin Panel Access

**URL:** `http://yourwebsite.com/mp-admin-x7k2`
**Password:** `Mine@buster@2012`

### Admin Features:
- ✅ Add shop items (with YouTube links or custom images)
- ✅ Delete items
- ✅ Reorder items (drag & drop)
- ✅ View customer orders
- ✅ Real-time updates

## 📝 Environment Variables

Create/update `.env.local`:

```env
DISCORD_WEBHOOK_URL="your_discord_webhook_url"
NEXT_PUBLIC_ADMIN_PASSWORD="Mine@buster@2012"
```

## 🌐 Hostinger Deployment

### Option 1: Direct Upload
1. Build locally: `yarn build`
2. Upload these folders to Hostinger:
   - `.next/`
   - `public/`
   - `src/`
   - `node_modules/`
   - `package.json`
   - `.env.local`
3. Start: `yarn start` or `npm start`

### Option 2: Git Deploy
1. Push code to GitHub
2. Connect Hostinger to your GitHub repo
3. Set Node.js version: **18 or higher**
4. Build command: `yarn build`
5. Start command: `yarn start`

### Important Notes for Hostinger:
- Make sure `/data` folder has **write permissions** (777 or 755)
- Node.js version should be **18+**
- Port will be assigned by Hostinger (default: 3000)

## 🔐 Security

- Admin panel is password-protected
- Sensitive files in `.gitignore`
- Rate limiting on order submissions
- Input sanitization enabled

## 📊 Data Persistence

All data is stored in JSON files:
- `/data/shop-items.json` - Shop products
- `/data/orders.json` - Customer orders

**Important:** 
- Keep regular backups of `/data` folder
- These files are NOT in git (see `.gitignore`)
- Make sure to backup before deployment

## 🛠️ Troubleshooting

### Items not showing on shop page?
```bash
# Check if data file exists
ls -la /app/data/

# Check API response
curl http://localhost:3000/api/shop
```

### Admin panel not working?
- Check password in `.env.local`
- Clear browser cache
- Check console for errors

### File permission errors?
```bash
# Give write permissions to data folder
chmod -R 755 /app/data
```

## 📞 Support

For any issues, contact: **Mine Productions**

---

**Made with ❤️ by E1 Agent**
