# 🚀 Panduan Deployment Analisa'25 Payment System

> Sistem pembayaran sekarang mendukung deployment frontend-only (GitHub Pages) atau full-stack dengan backend Google Sheets integration.

## Langkah 1: Persiapkan Repository GitHub

1. **Login ke GitHub** (https://github.com)
2. **Buat Repository Baru**:
   - Klik tombol "+" di pojok kanan atas
   - Pilih "New repository"
   - Nama repository: `analisa-25-payment` (atau nama lain)
   - Centang "Public" (GitHub Pages gratis hanya untuk public repo)
   - **JANGAN** centang "Add a README file"
   - Klik "Create repository"

## Langkah 2: Upload Kode ke GitHub

Jalankan perintah berikut di terminal/command prompt dalam folder proyek:

```bash
# Tambahkan remote repository
git remote add origin https://github.com/USERNAME/analisa-25-payment.git

# Ganti USERNAME dengan username GitHub Anda
# Ganti analisa-25-payment dengan nama repository Anda

# Push kode ke GitHub
git branch -M main
git push -u origin main
```

**Catatan**: Ganti `USERNAME` dengan username GitHub Anda yang sebenarnya.

## Langkah 3: Aktifkan GitHub Pages

1. **Buka Repository** di GitHub
2. **Masuk ke Settings**:
   - Klik tab "Settings" di repository Anda
3. **Scroll ke bagian "Pages"** (di menu kiri)
4. **Konfigurasi Source**:
   - Source: Deploy from a branch
   - Branch: `main` 
   - Folder: `/ (root)`
5. **Klik "Save"**

## Langkah 4: Akses Website

Setelah beberapa menit, website Anda akan tersedia di:
```
https://USERNAME.github.io/analisa-25-payment/
```

**Ganti USERNAME dengan username GitHub Anda.**

## 🎯 Contoh URL Final

Jika username GitHub Anda adalah `johndoe` dan nama repository `analisa-25-payment`, maka URL website adalah:
```
https://johndoe.github.io/analisa-25-payment/
```

## 🔧 Deployment Options

### Option 1: Frontend-only (GitHub Pages)
**Cocok untuk**: Testing dan demo
- Hanya HTML/CSS/JS yang di-deploy
- Data dikirim via WhatsApp saja
- File upload tidak berfungsi
- Gratis dan mudah setup

### Option 2: Full-stack dengan Backend
**Cocok untuk**: Production dengan Google Sheets integration
- Backend Node.js dengan Express
- Data tersimpan di Google Sheets
- File upload ke Google Drive
- Memerlukan hosting berbayar

---

## 🌐 Option 1: GitHub Pages (Frontend Only)

### Kustomisasi Konfigurasi
Edit file `config.js` sebelum deploy:

```javascript
// config.js - Ubah sesuai kebutuhan
const config = {
    eventName: "Nama Event Anda",           // ✏️ Ubah nama event
    htm: 60000,                             // ✏️ Ubah harga tiket
    waNumber: '62895386208710',             // ✏️ Ubah nomor WhatsApp admin
    qrisImageUrl: 'https://drive.google.com/uc?export=view&id=YOUR_FILE_ID', // ✏️ Ubah QRIS
    adminEmail: 'admin@analisa25.com'       // ✏️ Ubah email admin
};
```

## 🔄 Update Website

Untuk update website setelah deploy:

1. **Edit file** yang diperlukan
2. **Commit changes**:
   ```bash
   git add .
   git commit -m "Update: deskripsi perubahan"
   git push origin main
   ```
3. **Website akan terupdate otomatis** dalam 1-5 menit

## 🛠️ Troubleshooting

### Problem: Website tidak muncul
**Solusi**: 
- Tunggu 5-10 menit setelah setup GitHub Pages
- Pastikan repository bersifat Public
- Cek di Settings > Pages apakah sudah aktif

### Problem: Gambar QRIS tidak muncul
**Solusi**:
- Pastikan link Google Drive menggunakan format: `https://drive.google.com/uc?export=view&id=FILE_ID`
- Pastikan file di Google Drive dapat diakses publik ("Anyone with the link can view")

### Problem: Git command error
**Solusi**:
- Pastikan Git sudah terinstall di komputer
- Pastikan Anda sudah login ke GitHub via git atau gunakan GitHub Desktop

## 📱 Test di Mobile

Setelah deploy, test website di mobile device untuk memastikan responsiveness bekerja dengan baik.

---

## 🔍 Option 2: Full-Stack Deployment

### 🔧 Setup Backend

1. **Install Dependencies**:
```bash
npm install
```

2. **Setup Environment Variables**:
Buat file `.env`:
```env
GOOGLE_DRIVE_FOLDER_ID=1Hf2K2MfUers-2motRL5b4BVL51xX03lt
GOOGLE_SHEETS_ID=1DKSHxFTE7YQWLgqrXM64VS9xyFLaQ4KVMWzEdgXKERU
GOOGLE_CREDENTIALS_PATH=./credentials.json
EVENT_NAME=Ajang Perkenalan Sains Data (Analisa'25)
HTM=60000
WA_NUMBER=62895386208710
QRIS_IMAGE_ID=1SYXZruKlznw71U6VIrw3yjVwCWcp5TDW
ADMIN_EMAIL=admin@analisa25.com
```

3. **Setup Google API**:
- Download `credentials.json` dari Google Cloud Console
- Tempatkan di root folder project
- Aktifkan Google Sheets API dan Google Drive API
- Share Google Sheets dan Drive folder dengan service account email

4. **Initialize Spreadsheet**:
```bash
npm run create-headers
```

5. **Test Backend**:
```bash
npm run dev
```

### 🌍 Deploy ke Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create analisa25-payment

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set EVENT_NAME="Ajang Perkenalan Sains Data (Analisa'25)"
heroku config:set HTM=60000
heroku config:set WA_NUMBER=62895386208710
heroku config:set GOOGLE_DRIVE_FOLDER_ID=your_folder_id
heroku config:set GOOGLE_SHEETS_ID=your_sheets_id
heroku config:set QRIS_IMAGE_ID=your_qris_id
heroku config:set ADMIN_EMAIL=admin@analisa25.com

# Upload credentials
heroku config:set GOOGLE_CREDENTIALS="$(cat credentials.json)"

# Deploy
git push heroku main
```

### 📊 Features Backend

- ✅ **Auto-save ke Google Sheets** - Data tersimpan otomatis
- ✅ **File Upload ke Google Drive** - Bukti transfer aman
- ✅ **Payment Statistics** - Analytics pembayaran
- ✅ **Rate Limiting** - Perlindungan spam
- ✅ **Input Validation** - Validasi data ketat
- ✅ **Error Handling** - Penanganan error robust

---

## 🎉 Selesai!

Website Anda sekarang sudah online dengan fitur:

### Frontend-only (GitHub Pages):
- ✅ Form pembayaran responsif
- ✅ Konfirmasi via WhatsApp
- ✅ Upload bukti (manual send)

### Full-stack (Heroku/VPS):
- ✅ Semua fitur frontend
- ✅ Auto-save ke Google Sheets
- ✅ Auto-upload ke Google Drive
- ✅ Payment analytics

**Share URL website kepada calon peserta!**

---

## 📞 Support

Jika ada kendala deployment:
- 📧 Email: admin@analisa25.com
- 💬 WhatsApp: +62895386208710

**Tips**: Test di berbagai device untuk memastikan responsiveness.

