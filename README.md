# 💳 Sistem Pembayaran Analisa'25

> Aplikasi web modern untuk konfirmasi pembayaran acara **Ajang Perkenalan Sains Data (Analisa'25)** dengan integrasi Google Sheets, Google Drive, dan WhatsApp.

## ✨ Fitur

### 🎯 Frontend
- 📱 **Responsive Design** - Mobile-friendly dengan Tailwind CSS
- 🧮 **Perhitungan Otomatis** - Jumlah transfer dengan kode unik dari NIM
- 📤 **Upload Bukti** - Support image dan PDF (maks 2MB)
- 💬 **Integrasi WhatsApp** - Konfirmasi langsung ke admin
- 🎨 **UI/UX Modern** - Interface yang clean dan user-friendly
- 🔢 **Dropdown Kategori** - Panitia, Volunteer, Mahasiswa Baru

### 🔒 Backend & Security
- 🗂️ **Google Sheets Integration** - Penyimpanan data terstruktur
- ☁️ **Google Drive Storage** - Upload bukti transfer ke cloud
- 🔐 **Environment Variables** - Konfigurasi aman dengan .env
- 🛡️ **Rate Limiting** - Perlindungan dari spam
- 📊 **Payment Statistics** - Dashboard analytics

## 🛠️ Teknologi

### Frontend
- **HTML5, CSS3** - Struktur dan styling modern
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript (Vanilla)** - Interaktivitas tanpa framework
- **Google Fonts** - Typography (Inter)
- **Heroicons** - Icon set via SVG

### Backend (Optional)
- **Node.js** - Runtime environment
- **Google APIs** - Sheets & Drive integration
- **Express.js** - Web framework
- **Multer** - File upload handling
- **dotenv** - Environment variables

## ⚙️ Konfigurasi

### Environment Variables (.env)
```env
# Google Drive Configuration
GOOGLE_DRIVE_FOLDER_ID=1Hf2K2MfUers-2motRL5b4BVL51xX03lt
GOOGLE_SHEETS_ID=1DKSHxFTE7YQWLgqrXM64VS9xyFLaQ4KVMWzEdgXKERU
GOOGLE_CREDENTIALS_PATH=C:\Users\user\Downloads\trading_bot_package_updated\trading_bot_package_updated\credentials.json

# Event Configuration
EVENT_NAME=Ajang Perkenalan Sains Data (Analisa'25)
HTM=60000
WA_NUMBER=62895386208710
QRIS_IMAGE_ID=1SYXZruKlznw71U6VIrw3yjVwCWcp5TDW
ADMIN_EMAIL=admin@analisa25.com
```

### Frontend Config (config.js)
```javascript
const config = {
    eventName: "Ajang Perkenalan Sains Data (Analisa'25)",
    htm: 60000, // Harga tiket dalam Rupiah
    waNumber: '62895386208710', // Nomor WhatsApp admin
    qrisImageUrl: 'https://drive.google.com/uc?export=view&id=1SYXZruKlznw71U6VIrw3yjVwCWcp5TDW',
    adminEmail: 'admin@analisa25.com'
};
```

## Cara Menggunakan

### Untuk Peserta:
1. Buka website aplikasi
2. Baca instruksi pembayaran
3. Scan QR Code QRIS untuk pembayaran
4. Isi formulir konfirmasi dengan data lengkap
5. Upload bukti transfer (JPG, PNG, atau PDF max 2MB)
6. Kirim konfirmasi via WhatsApp
7. Submit form ke sistem

### Untuk Admin:
1. Terima notifikasi WhatsApp dari peserta
2. Verifikasi data dan bukti transfer
3. Konfirmasi pembayaran kepada peserta

## Fitur Khusus

- **Kode Unik**: Sistem otomatis menambahkan 2 digit terakhir NIM sebagai kode unik untuk mempermudah identifikasi transfer
- **Multi-step Process**: Alur 2 langkah (instruksi → formulir) untuk UX yang lebih baik
- **File Validation**: Validasi ukuran dan format file bukti transfer
- **WhatsApp Integration**: Kirim data lengkap ke admin via WhatsApp

## Deployment ke GitHub Pages

1. Fork/clone repository ini
2. Edit konfigurasi sesuai kebutuhan
3. Push ke repository GitHub
4. Aktifkan GitHub Pages di settings repository
5. Website akan tersedia di `https://username.github.io/repository-name`

## 📁 Struktur File

```
analisa-25-payment/
├── 📄 index.html          # Frontend utama
├── ⚙️ config.js           # Konfigurasi aplikasi
├── 🔧 backend.js          # Backend Node.js
├── 📦 package.json        # Dependencies
├── 🔒 .env                # Environment variables (PRIVATE)
├── 🚫 .gitignore          # Git ignore rules
├── 📚 README.md           # Dokumentasi
└── 🚀 DEPLOYMENT.md       # Panduan deployment
```

## Modifikasi

Untuk memodifikasi aplikasi:

1. **Ubah konfigurasi**: Edit bagian `config` di `index.html`
2. **Ubah styling**: Modifikasi class Tailwind CSS
3. **Tambah fitur**: Tambahkan JavaScript function baru
4. **Ganti gambar QRIS**: Upload gambar baru ke Google Drive dan update URL

## 🔐 Security Features

- ✅ **Environment Variables** - Semua data sensitif disimpan di .env
- ✅ **File Validation** - Validasi ukuran dan tipe file
- ✅ **Rate Limiting** - Mencegah spam request
- ✅ **CORS Protection** - Konfigurasi CORS yang aman
- ✅ **Input Sanitization** - Validasi input form
- ✅ **Error Handling** - Penanganan error yang proper

## 📊 Database Schema (Google Sheets)

| Kolom | Deskripsi | Contoh |
|-------|-----------|--------|
| Timestamp | Waktu pengisian | 2024-01-15 10:30:45 |
| Nama Lengkap | Nama peserta | John Doe |
| NIM | Nomor Induk Mahasiswa | 23123456 |
| Email | Alamat email | john@example.com |
| No. WhatsApp | Nomor WhatsApp aktif | 08123456789 |
| Kategori | Panitia/Volunteer/Mahasiswa Baru | Mahasiswa Baru |
| Jumlah Transfer | Total yang ditransfer | 60056 |
| Bukti Transfer | Link file di Google Drive | bukti_transfer_123.jpg |
| Status Verifikasi | Status pembayaran | Menunggu Verifikasi |
| Catatan | Catatan tambahan | - |

## 📱 Kategori Peserta

1. **Mahasiswa Baru** - HTM normal (Rp 60.000 + kode unik)
2. **Panitia** - Bisa ada diskon khusus
3. **Volunteer** - Bisa ada diskon khusus

## ⚠️ Catatan Penting

- **Data Private**: File .env berisi informasi sensitif, jangan commit ke repository
- **Google API**: Pastikan Google Sheets dan Drive API sudah diaktifkan
- **Credentials**: Service account harus memiliki akses ke sheets dan drive
- **QRIS**: Pastikan gambar QRIS dapat diakses publik via Google Drive

## Demo

Buka `index.html` di browser untuk melihat preview aplikasi.

## Support

Jika ada pertanyaan atau issue, silakan hubungi admin event melalui WhatsApp.

---
**Analisa'25** - Ajang Perkenalan Sains Data

