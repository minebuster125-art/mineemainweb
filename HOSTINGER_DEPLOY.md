# 🚀 Hostinger Deployment - Step by Step Guide

## ✅ Build Successful! Ab Hostinger pe deploy karo:

### Method 1: cPanel File Manager (Easiest)

#### Step 1: Files Upload Karo
1. Hostinger cPanel mein login karo
2. **File Manager** open karo
3. `public_html` folder mein jao
4. Yeh folders/files upload karo:
   ```
   ✅ .next/          (complete folder)
   ✅ public/         (complete folder)
   ✅ src/            (complete folder)
   ✅ node_modules/   (complete folder - optional, server pe install kar sakte ho)
   ✅ package.json
   ✅ next.config.mjs
   ✅ .env.local
   ```

#### Step 2: Data Folder Banao (IMPORTANT!)
1. File Manager mein `public_html` folder mein
2. New Folder banao: **`data`**
3. `data` folder mein right click → **Permissions** → Set to **777**
4. `data` folder mein 2 files banao:
   - `shop-items.json` (content: `[]`)
   - `orders.json` (content: `[]`)
5. Dono files ka permission **666** set karo

#### Step 3: Node.js Setup (Hostinger cPanel)
1. cPanel mein **"Setup Node.js App"** dhundho
2. Click karo aur:
   - **Node.js Version:** 18 ya higher select karo
   - **Application Root:** `/public_html` (ya jaha files hain)
   - **Application URL:** Your domain
   - **Application Startup File:** Leave default or set `server.js`
3. **Environment Variables** add karo:
   ```
   DISCORD_WEBHOOK_URL = your_webhook_url
   NEXT_PUBLIC_ADMIN_PASSWORD = Mine@buster@2012
   ```

#### Step 4: Install Dependencies & Start
Terminal (Hostinger) mein ya SSH se:
```bash
cd /home/username/public_html
npm install
npm run build
npm start
```

Ya Hostinger Node.js App mein:
- **Run npm install** button click karo
- **Restart** button click karo

---

### Method 2: Git Deploy (Advanced)

1. GitHub pe repository banao aur code push karo
2. Hostinger → Git → Connect repository
3. Auto-deploy enable karo

---

## 🔍 Testing - Zaruri Steps!

### Test 1: API Check
Browser mein yeh URL kholo:
```
https://yourwebsite.com/api/shop
```
**Expected Result:** `[]` (empty array dikhe)

❌ **Agar error aaye:**
- Check data folder permissions (777)
- Check .json files exist karte hain
- Server logs check karo

### Test 2: Admin Panel Test
1. Jao: `https://yourwebsite.com/mp-admin-x7k2`
2. Password enter karo: `Mine@buster@2012`
3. Shop Manager → Add Item
4. Koi item add karo

### Test 3: Shop Page Test (Different Device)
1. **Dusre device/browser** se kholo: `https://yourwebsite.com/shop`
2. Item dikhna chahiye! ✅

---

## 🛠️ Troubleshooting

### Issue 1: "Items nahi dikh rahe"
**Check karo:**
```bash
# SSH se ya terminal
cd /home/username/public_html/data
cat shop-items.json
```
Agar file empty hai ya nahi hai, toh permissions issue hai.

**Fix:**
```bash
chmod 777 /home/username/public_html/data
chmod 666 /home/username/public_html/data/*.json
```

### Issue 2: "API not working"
**Test API directly:**
```bash
curl https://yourwebsite.com/api/shop
```

Agar 404 error aaye:
- Check Node.js app running hai ki nahi
- Restart karo application

### Issue 3: "Old data dikh raha hai"
**Browser cache clear karo:**
- Ctrl + Shift + R (Hard Refresh)
- Ya Incognito mode mein test karo

---

## 📝 Important Files Checklist

✅ Check these files exist on Hostinger:
```
/public_html/
  ├── .next/                 (build folder)
  ├── public/
  ├── src/
  │   └── app/
  │       └── api/
  │           ├── shop/
  │           │   └── route.ts     ← IMPORTANT!
  │           └── admin/
  │               └── data/
  │                   └── route.ts ← IMPORTANT!
  ├── data/                  ← CREATE THIS!
  │   ├── shop-items.json    ← Must have 777 permission
  │   └── orders.json        ← Must have 777 permission
  ├── package.json
  └── .env.local
```

---

## 🎯 Quick Test Commands (SSH)

```bash
# Check if data folder exists
ls -la /home/username/public_html/data

# Check permissions
stat /home/username/public_html/data

# Check file contents
cat /home/username/public_html/data/shop-items.json

# Test API locally
curl http://localhost:3000/api/shop
```

---

## 📞 Still Not Working?

Mujhe yeh information do:
1. `https://yourwebsite.com/api/shop` ka response
2. Hostinger error logs (cPanel → Error Log)
3. Data folder ka screenshot

---

**Build successfully ho gaya hai! Ab bas Hostinger pe upload karo aur data folder permissions set karo. Sab kuch kaam karega! 💪**
