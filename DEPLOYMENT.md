# 🚀 Panduan Deploy ke GitHub Pages

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

## ⚙️ Kustomisasi Sebelum Deploy

Sebelum deploy, Anda mungkin ingin mengubah konfigurasi di file `index.html`:

```javascript
// Cari bagian config dan ubah sesuai kebutuhan:
const config = {
    eventName: "Nama Event Anda",           // ✏️ Ubah nama event
    htm: 60000,                             // ✏️ Ubah harga tiket
    waNumber: '62895386208710',             // ✏️ Ubah nomor WhatsApp admin
    qrisImageUrl: 'https://drive.google.com/uc?export=view&id=YOUR_FILE_ID', // ✏️ Ubah QRIS
    // ... konfigurasi lainnya
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

## 🎉 Selesai!

Website Anda sekarang sudah online dan dapat diakses oleh peserta event. Share URL website kepada calon peserta.

---

**Tips**: Bookmark URL website dan save sebagai shortcut di smartphone untuk akses cepat.

