// server.js - Express.js Server untuk Analisa'25 Payment System
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const path = require('path');
const PaymentBackend = require('./backend.js');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Payment Backend
const paymentBackend = new PaymentBackend();

// Security Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        error: 'Terlalu banyak request dari IP ini, coba lagi setelah 15 menit.'
    }
});
app.use('/api/', limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
app.use(express.static('.', {
    index: 'index.html'
}));

// Multer configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024, // 2MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Tipe file tidak didukung. Hanya JPG, PNG, dan PDF yang diperbolehkan.'));
        }
    }
});

// Initialize backend on server start
paymentBackend.initialize().catch(console.error);

// =================================================================
// API ROUTES
// =================================================================

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        service: 'Analisa\'25 Payment System',
        version: '1.0.0'
    });
});

// Get payment statistics
app.get('/api/stats', async (req, res) => {
    try {
        const stats = await paymentBackend.getPaymentStats();
        res.json({
            success: true,
            data: stats
        });
    } catch (error) {
        console.error('Error getting stats:', error);
        res.status(500).json({
            success: false,
            error: 'Gagal mengambil statistik pembayaran'
        });
    }
});

// Submit payment data
app.post('/api/payment', async (req, res) => {
    try {
        const {
            nama,
            nim,
            email,
            whatsapp,
            kategori,
            referensi,
            catatan
        } = req.body;

        // Validation
        if (!nama || !nim || !email || !whatsapp || !kategori || !referensi) {
            return res.status(400).json({
                success: false,
                error: 'Semua field wajib diisi'
            });
        }

        // Validate NIM format
        if (!/^\d+$/.test(nim)) {
            return res.status(400).json({
                success: false,
                error: 'NIM harus berupa angka'
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                error: 'Format email tidak valid'
            });
        }

        // Validate phone number
        const phoneRegex = /^[0-9+\-\s()]+$/;
        if (!phoneRegex.test(whatsapp)) {
            return res.status(400).json({
                success: false,
                error: 'Format nomor WhatsApp tidak valid'
            });
        }

        // Validate kategori
        const validKategori = ['Mahasiswa Baru', 'Panitia', 'Volunteer'];
        if (!validKategori.includes(kategori)) {
            return res.status(400).json({
                success: false,
                error: 'Kategori tidak valid'
            });
        }

        const paymentData = {
            nama,
            nim,
            email,
            whatsapp,
            kategori,
            referensi,
            catatan: catatan || ''
        };

        const result = await paymentBackend.savePaymentData(paymentData);

        res.json({
            success: true,
            message: 'Data pembayaran berhasil disimpan',
            data: result
        });

    } catch (error) {
        console.error('Error saving payment:', error);
        res.status(500).json({
            success: false,
            error: 'Gagal menyimpan data pembayaran'
        });
    }
});

// Upload payment proof
app.post('/api/upload', upload.single('bukti'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: 'File bukti transfer wajib diunggah'
            });
        }

        const { nim, nama } = req.body;
        if (!nim || !nama) {
            return res.status(400).json({
                success: false,
                error: 'NIM dan nama wajib disertakan'
            });
        }

        // Generate unique filename
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const fileExtension = path.extname(req.file.originalname);
        const fileName = `bukti_${nim}_${nama.replace(/\s+/g, '_')}_${timestamp}${fileExtension}`;

        const uploadResult = await paymentBackend.uploadPaymentProof(
            req.file.buffer,
            fileName,
            req.file.mimetype
        );

        res.json({
            success: true,
            message: 'Bukti transfer berhasil diunggah',
            data: uploadResult
        });

    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({
            success: false,
            error: 'Gagal mengunggah bukti transfer'
        });
    }
});

// Combined payment submission (payment data + file upload)
app.post('/api/submit', upload.single('bukti'), async (req, res) => {
    try {
        const {
            nama,
            nim,
            email,
            whatsapp,
            kategori,
            referensi,
            catatan
        } = req.body;

        // Validation (same as /api/payment)
        if (!nama || !nim || !email || !whatsapp || !kategori || !referensi) {
            return res.status(400).json({
                success: false,
                error: 'Semua field wajib diisi'
            });
        }

        let buktiFileName = 'Tidak tersedia';
        let uploadResult = null;

        // Upload file if provided
        if (req.file) {
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const fileExtension = path.extname(req.file.originalname);
            buktiFileName = `bukti_${nim}_${nama.replace(/\s+/g, '_')}_${timestamp}${fileExtension}`;

            uploadResult = await paymentBackend.uploadPaymentProof(
                req.file.buffer,
                buktiFileName,
                req.file.mimetype
            );
        }

        // Save payment data
        const paymentData = {
            nama,
            nim,
            email,
            whatsapp,
            kategori,
            referensi,
            buktiFileName,
            catatan: catatan || ''
        };

        const paymentResult = await paymentBackend.savePaymentData(paymentData);

        res.json({
            success: true,
            message: 'Data pembayaran dan bukti transfer berhasil disimpan',
            data: {
                payment: paymentResult,
                upload: uploadResult
            }
        });

    } catch (error) {
        console.error('Error submitting payment:', error);
        res.status(500).json({
            success: false,
            error: 'Gagal menyimpan data pembayaran'
        });
    }
});

// Get configuration (public endpoint)
app.get('/api/config', (req, res) => {
    res.json({
        success: true,
        data: {
            eventName: process.env.EVENT_NAME || "Ajang Perkenalan Sains Data (Analisa'25)",
            htm: parseInt(process.env.HTM) || 60000,
            waNumber: process.env.WA_NUMBER || '62895386208710',
            qrisImageUrl: `https://drive.google.com/uc?export=view&id=${process.env.QRIS_IMAGE_ID}`,
            adminEmail: process.env.ADMIN_EMAIL || 'admin@analisa25.com'
        }
    });
});

// =================================================================
// ERROR HANDLING
// =================================================================

// Handle multer errors
app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                error: 'Ukuran file terlalu besar. Maksimal 2MB.'
            });
        }
    }
    
    if (error.message.includes('Tipe file tidak didukung')) {
        return res.status(400).json({
            success: false,
            error: error.message
        });
    }

    console.error('Server error:', error);
    res.status(500).json({
        success: false,
        error: 'Terjadi kesalahan server'
    });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint tidak ditemukan'
    });
});

// Serve index.html for all other routes (SPA)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// =================================================================
// SERVER STARTUP
// =================================================================

app.listen(PORT, () => {
    console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
    console.log(`📁 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`💳 Event: ${process.env.EVENT_NAME || "Analisa'25"}`);
    console.log(`💰 HTM: Rp ${(parseInt(process.env.HTM) || 60000).toLocaleString('id-ID')}`);
    console.log(`📞 WhatsApp: ${process.env.WA_NUMBER || '62895386208710'}`);
    
    // Initialize spreadsheet headers if needed
    paymentBackend.createSpreadsheetHeaders().catch(error => {
        console.warn('⚠️ Warning: Could not create spreadsheet headers:', error.message);
    });
});

module.exports = app;

