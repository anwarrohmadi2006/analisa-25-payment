// config.js - Konfigurasi Aplikasi
// Dalam implementasi production, nilai-nilai ini akan dibaca dari environment variables
// Untuk demo, kita simulasikan pembacaan dari .env file

class Config {
    constructor() {
        // Simulasi pembacaan dari .env file
        // Dalam implementasi nyata, gunakan dotenv untuk Node.js backend
        this.loadConfig();
    }

    loadConfig() {
        // Google Drive & Sheets Configuration
        this.GOOGLE_DRIVE_FOLDER_ID = '1Hf2K2MfUers-2motRL5b4BVL51xX03lt';
        this.GOOGLE_SHEETS_ID = '1DKSHxFTE7YQWLgqrXM64VS9xyFLaQ4KVMWzEdgXKERU';
        this.GOOGLE_CREDENTIALS_PATH = 'C:\\Users\\user\\Downloads\\trading_bot_package_updated\\trading_bot_package_updated\\credentials.json';
        
        // Event Configuration
        this.EVENT_NAME = 'Ajang Perkenalan Sains Data (Analisa\'25)';
        this.HTM = 60000;
        this.WA_NUMBER = '62895386208710';
        this.QRIS_IMAGE_ID = '1SYXZruKlznw71U6VIrw3yjVwCWcp5TDW';
        this.ADMIN_EMAIL = 'admin@analisa25.com';
    }

    // Getter methods untuk akses yang aman
    get googleDriveFolderId() { return this.GOOGLE_DRIVE_FOLDER_ID; }
    get googleSheetsId() { return this.GOOGLE_SHEETS_ID; }
    get googleCredentialsPath() { return this.GOOGLE_CREDENTIALS_PATH; }
    get eventName() { return this.EVENT_NAME; }
    get htm() { return this.HTM; }
    get waNumber() { return this.WA_NUMBER; }
    get qrisImageUrl() { return `https://drive.google.com/uc?export=view&id=${this.QRIS_IMAGE_ID}`; }
    get adminEmail() { return this.ADMIN_EMAIL; }

    // Method untuk memvalidasi konfigurasi
    validateConfig() {
        const requiredFields = [
            'GOOGLE_DRIVE_FOLDER_ID',
            'GOOGLE_SHEETS_ID', 
            'EVENT_NAME',
            'HTM',
            'WA_NUMBER',
            'QRIS_IMAGE_ID'
        ];

        for (const field of requiredFields) {
            if (!this[field]) {
                throw new Error(`Missing required configuration: ${field}`);
            }
        }
        return true;
    }

    // Method untuk logging konfigurasi (tanpa data sensitif)
    logConfig() {
        console.log('🔧 Configuration loaded:');
        console.log(`   Event: ${this.eventName}`);
        console.log(`   HTM: Rp ${this.htm.toLocaleString('id-ID')}`);
        console.log(`   QRIS Image: ${this.QRIS_IMAGE_ID ? '✓ Set' : '✗ Missing'}`);
        console.log(`   Google Drive: ${this.googleDriveFolderId ? '✓ Connected' : '✗ Missing'}`);
        console.log(`   Google Sheets: ${this.googleSheetsId ? '✓ Connected' : '✗ Missing'}`);
    }
}

// Export instance untuk digunakan di seluruh aplikasi
const config = new Config();
config.validateConfig();
config.logConfig();

// Untuk browser environment
if (typeof window !== 'undefined') {
    window.AppConfig = config;
}

// Untuk Node.js environment
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
}

