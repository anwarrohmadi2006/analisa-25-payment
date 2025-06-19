# Analisa'25 - Sistem Konfirmasi Pembayaran

Aplikasi web untuk konfirmasi pembayaran event "Ajang Perkenalan Sains Data (Analisa'25)" yang dapat di-deploy di GitHub Pages.

## Fitur

- ✅ **Formulir Pembayaran Interaktif** - Form dengan validasi lengkap
- ✅ **Kalkulator Biaya Otomatis** - Menghitung total dengan kode unik berdasarkan NIM
- ✅ **Integrasi WhatsApp** - Kirim konfirmasi langsung ke admin
- ✅ **Upload Bukti Transfer** - Validasi file dengan batas ukuran 2MB
- ✅ **Responsive Design** - Support mobile dan desktop
- ✅ **QR Code QRIS** - Menampilkan kode pembayaran QRIS

## Teknologi

- **Frontend**: HTML5, CSS3 (Tailwind CSS), JavaScript (Vanilla)
- **Icons**: Heroicons via SVG
- **Fonts**: Google Fonts (Inter)
- **Hosting**: GitHub Pages (Static)

## Konfigurasi

Semua konfigurasi dapat diubah di bagian `config` dalam file `index.html`:

```javascript
const config = {
    eventName: "Ajang Perkenalan Sains Data (Analisa'25)",
    htm: 60000, // Harga tiket dalam Rupiah
    waNumber: '62895386208710', // Nomor WhatsApp admin
    qrisImageUrl: 'https://drive.google.com/uc?export=view&id=1SYXZruKlznw71U6VIrw3yjVwCWcp5TDW',
    // ... konfigurasi lainnya
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

## Struktur File

```
analisa-25-payment/
├── index.html          # File utama aplikasi
├── README.md           # Dokumentasi ini
└── .gitignore         # Git ignore file
```

## Modifikasi

Untuk memodifikasi aplikasi:

1. **Ubah konfigurasi**: Edit bagian `config` di `index.html`
2. **Ubah styling**: Modifikasi class Tailwind CSS
3. **Tambah fitur**: Tambahkan JavaScript function baru
4. **Ganti gambar QRIS**: Upload gambar baru ke Google Drive dan update URL

## Catatan Penting

- Aplikasi ini adalah versi statis (tanpa backend database)
- Data akan dikirim via WhatsApp ke admin
- Bukti transfer perlu dikirim manual karena keterbatasan static hosting
- Pastikan link Google Drive QRIS dapat diakses publik

## Demo

Buka `index.html` di browser untuk melihat preview aplikasi.

## Support

Jika ada pertanyaan atau issue, silakan hubungi admin event melalui WhatsApp.

---
**Analisa'25** - Ajang Perkenalan Sains Data

