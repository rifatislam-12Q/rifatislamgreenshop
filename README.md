# 🌿 GreenShop - Organic & Handmade Marketplace

An e-commerce web application featuring organic products, interactive Live Bazar streaming, animated analytics dashboard, and fast responsive UI.

---

## 🚀 GitHub Pages-এ লাইভ আউটপুট দেখার সহজ উপায় (Live Deployment Guide)

এই প্রোজেক্টটি গিটহাবে আপলোড করার সাথে সাথেই লাইভ লিংক পেতে নিচের সহজ ধাপগুলো অনুসরণ করুন:

### ধাপ ১: গিটহাবে কোড আপলোড (Push to GitHub)
```bash
git init
git add .
git commit -m "Initial commit - GreenShop"
git branch -M main
git remote add origin https://github.com/<আপনার-ইউজারনেম>/<আপনার-রেপোর-নাম>.git
git push -u origin main
```

### ধাপ ২: GitHub Pages সক্রিয় করুন (Enable GitHub Pages)
1. আপনার GitHub রিপোজিটরিতে যান।
2. উপরে **Settings** ট্যাবে ক্লিক করুন।
3. বাম পাশের মেনু থেকে **Pages** অপশনে ক্লিক করুন।
4. **Build and deployment** সেকশনের **Source** ড্রপডাউন থেকে **`GitHub Actions`** নির্বাচন করুন।
5. ব্যাস! প্রোজেক্টে স্বয়ংক্রিয়ভাবে একটি GitHub Action চালু হবে এবং ১-২ মিনিটের মধ্যে আপনার লাইভ লিংক তৈরি হয়ে যাবে:
   ```
   https://<আপনার-ইউজারনেম>.github.io/<আপনার-রেপোর-নাম>/
   ```

---

## ⚡ বিকল্প উপায়: Vercel অথবা Netlify দিয়ে ১ ক্লিকে লাইভ (Recommended)

GitHub Pages ছাড়াও আপনি সবচেয়ে দ্রুত এবং ফ্রিতে **Vercel** এ লাইভ করতে পারেন:
1. [vercel.com](https://vercel.com)-এ যান এবং আপনার GitHub দিয়ে লগইন করুন।
2. **Add New...** -> **Project** এ ক্লিক করুন।
3. আপনার GreenShop রিপোজিটরিটি সিলেক্ট করে **Deploy** বাটনে চাপ দিন।
4. কোনো কনফিগারেশন পরিবর্তন ছাড়াই সাথে সাথে একটি সুপারফাস্ট লাইভ লিংক পেয়ে যাবেন।

---

## 🛠️ লোকাল মেশিনে রান করার নিয়ম (Run Locally)

```bash
# ডিপেন্ডেন্সি ইনস্টল করুন
npm install

# লোকাল ডেভেলপমেন্ট সার্ভার চালু করুন (Port 3000)
npm run dev

# প্রোডাকশন বিল্ড তৈরি করুন
npm run build
```
