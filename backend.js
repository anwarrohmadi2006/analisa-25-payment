// backend.js - Backend Integration untuk Google Sheets
// File ini menggunakan Google Sheets API untuk menyimpan data pembayaran

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

class PaymentBackend {
    constructor() {
        this.credentialsPath = process.env.GOOGLE_CREDENTIALS_PATH || './credentials.json';
        this.spreadsheetId = process.env.GOOGLE_SHEETS_ID;
        this.folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
        this.auth = null;
        this.sheets = null;
        this.drive = null;
    }

    async initialize() {
        try {
            // Load credentials
            const credentials = JSON.parse(fs.readFileSync(this.credentialsPath));
            
            // Create auth client
            this.auth = new google.auth.GoogleAuth({
                credentials: credentials,
                scopes: [
                    'https://www.googleapis.com/auth/spreadsheets',
                    'https://www.googleapis.com/auth/drive.file'
                ]
            });

            // Initialize services
            this.sheets = google.sheets({ version: 'v4', auth: this.auth });
            this.drive = google.drive({ version: 'v3', auth: this.auth });

            console.log('✅ Google API services initialized successfully');
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize Google API services:', error.message);
            throw error;
        }
    }

    async savePaymentData(paymentData) {
        try {
            if (!this.sheets) {
                await this.initialize();
            }

            // Prepare data for spreadsheet
            const timestamp = new Date().toLocaleString('id-ID', {
                timeZone: 'Asia/Jakarta',
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });

            const rowData = [
                timestamp,
                paymentData.nama,
                paymentData.nim,
                paymentData.email,
                paymentData.whatsapp,
                paymentData.kategori || 'Mahasiswa Baru', // Default kategori
                paymentData.referensi,
                paymentData.buktiFileName || 'Tidak tersedia',
                'Menunggu Verifikasi', // Status default
                paymentData.catatan || ''
            ];

            // Append to spreadsheet
            const response = await this.sheets.spreadsheets.values.append({
                spreadsheetId: this.spreadsheetId,
                range: 'Sheet1!A:J', // Sesuaikan dengan kolom yang diperlukan
                valueInputOption: 'RAW',
                insertDataOption: 'INSERT_ROWS',
                resource: {
                    values: [rowData]
                }
            });

            console.log('✅ Payment data saved to Google Sheets:', response.data.updates);
            return {
                success: true,
                updatedRange: response.data.updates.updatedRange,
                updatedRows: response.data.updates.updatedRows
            };
        } catch (error) {
            console.error('❌ Failed to save payment data:', error.message);
            throw error;
        }
    }

    async uploadPaymentProof(fileBuffer, fileName, mimeType) {
        try {
            if (!this.drive) {
                await this.initialize();
            }

            const fileMetadata = {
                name: fileName,
                parents: [this.folderId]
            };

            const media = {
                mimeType: mimeType,
                body: fileBuffer
            };

            const response = await this.drive.files.create({
                resource: fileMetadata,
                media: media,
                fields: 'id, name, webViewLink'
            });

            console.log('✅ Payment proof uploaded to Google Drive:', response.data);
            return {
                success: true,
                fileId: response.data.id,
                fileName: response.data.name,
                webViewLink: response.data.webViewLink
            };
        } catch (error) {
            console.error('❌ Failed to upload payment proof:', error.message);
            throw error;
        }
    }

    async createSpreadsheetHeaders() {
        try {
            if (!this.sheets) {
                await this.initialize();
            }

            const headers = [
                'Timestamp',
                'Nama Lengkap',
                'NIM',
                'Email',
                'No. WhatsApp',
                'Kategori',
                'Jumlah Transfer',
                'Bukti Transfer',
                'Status Verifikasi',
                'Catatan'
            ];

            await this.sheets.spreadsheets.values.update({
                spreadsheetId: this.spreadsheetId,
                range: 'Sheet1!A1:J1',
                valueInputOption: 'RAW',
                resource: {
                    values: [headers]
                }
            });

            console.log('✅ Spreadsheet headers created successfully');
            return true;
        } catch (error) {
            console.error('❌ Failed to create spreadsheet headers:', error.message);
            throw error;
        }
    }

    async getPaymentStats() {
        try {
            if (!this.sheets) {
                await this.initialize();
            }

            const response = await this.sheets.spreadsheets.values.get({
                spreadsheetId: this.spreadsheetId,
                range: 'Sheet1!A:J'
            });

            const rows = response.data.values || [];
            const dataRows = rows.slice(1); // Skip header

            const stats = {
                totalEntries: dataRows.length,
                verified: dataRows.filter(row => row[8] === 'Terverifikasi').length,
                pending: dataRows.filter(row => row[8] === 'Menunggu Verifikasi').length,
                rejected: dataRows.filter(row => row[8] === 'Ditolak').length,
                categories: {
                    panitia: dataRows.filter(row => row[5] === 'Panitia').length,
                    volunteer: dataRows.filter(row => row[5] === 'Volunteer').length,
                    mahasiswaBaru: dataRows.filter(row => row[5] === 'Mahasiswa Baru').length
                }
            };

            console.log('📊 Payment Statistics:', stats);
            return stats;
        } catch (error) {
            console.error('❌ Failed to get payment statistics:', error.message);
            throw error;
        }
    }
}

// Export untuk digunakan sebagai module
module.exports = PaymentBackend;

// Untuk testing langsung
if (require.main === module) {
    const backend = new PaymentBackend();
    
    // Test initialization
    backend.initialize()
        .then(() => {
            console.log('Backend initialized successfully!');
            return backend.createSpreadsheetHeaders();
        })
        .then(() => {
            console.log('Headers created successfully!');
            return backend.getPaymentStats();
        })
        .catch(error => {
            console.error('Error during testing:', error);
        });
}

