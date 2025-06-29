// Initial data structure
const initialData = {
    users: [
        { id: 1, username: 'admin', password: 'adminpdk', name: 'Super Admin', role: 'admin', email: 'admin@siapham.go.id' },
        { id: 2, username: 'kakanwil', password: 'kakanwilpdk', name: 'Kepala Kanwil', role: 'kakanwil', email: 'kakanwil@siapham.go.id' },
        { id: 3, username: 'kabid', password: 'kabidpdk', name: 'Kepala Bidang', role: 'kabid', email: 'kabid@siapham.go.id' },
        { id: 4, username: 'syafril', password: 'syafrilpdk', name: 'Syafril', role: 'petugas', email: 'syafril@siapham.go.id' },
        { id: 5, username: 'melky', password: 'melkypdk', name: 'Melky', role: 'petugas', email: 'melky@siapham.go.id' },
        { id: 6, username: 'putri', password: 'putripdk', name: 'Putri', role: 'petugas', email: 'putri@siapham.go.id' },
        { id: 7, username: 'intan', password: 'intanpdk', name: 'Intan', role: 'petugas', email: 'intan@siapham.go.id' },
        { id: 8, username: 'ade', password: 'adepdk', name: 'Ade', role: 'petugas', email: 'ade@siapham.go.id' },
        { id: 9, username: 'allan', password: 'allanpdk', name: 'Allan', role: 'petugas', email: 'allan@siapham.go.id' }
    ],
    aduanData: [
        {
            id: 'XNY002',
            judul: 'Diskriminasi Pelayanan Publik',
            pelapor: 'Ahmad Subarjo',
            kabupaten: 'Bandar Lampung',
            kecamatan: 'Tanjung Karang Pusat',
            prioritas: 'tinggi',
            tanggalLapor: '2024-01-15',
            status: 'proses',
            petugas: 'syafril',
            tahapan: [
                {
                    nama: 'Verifikasi Awal',
                    tanggalMulai: '2024-01-15',
                    deadline: '2024-01-22',
                    statusAjuan: 'selesai'
                },
                {
                    nama: 'Investigasi',
                    tanggalMulai: '2024-01-23',
                    deadline: '2024-02-06',
                    statusAjuan: 'proses'
                }
            ],
            log: [
                {
                    tanggal: '2024-01-15',
                    petugas: 'sistem',
                    aksi: 'Pengaduan diterima sistem'
                },
                {
                    tanggal: '2024-01-15',
                    petugas: 'kabid',
                    aksi: 'Pengaduan ditugaskan kepada Syafril'
                },
                {
                    tanggal: '2024-01-22',
                    petugas: 'syafril',
                    aksi: 'Verifikasi awal selesai'
                }
            ]
        },
        {
            id: 'XNY003',
            judul: 'Intimidasi dan Ancaman',
            pelapor: 'Siti Aminah',
            kabupaten: 'Lampung Selatan',
            kecamatan: 'Kalianda',
            prioritas: 'menengah',
            tanggalLapor: '2024-01-10',
            status: 'selesai',
            petugas: 'melky',
            tahapan: [
                {
                    nama: 'Verifikasi Awal',
                    tanggalMulai: '2024-01-10',
                    deadline: '2024-01-17',
                    statusAjuan: 'selesai'
                },
                {
                    nama: 'Investigasi',
                    tanggalMulai: '2024-01-18',
                    deadline: '2024-02-01',
                    statusAjuan: 'selesai'
                }
            ],
            log: [
                {
                    tanggal: '2024-01-10',
                    petugas: 'sistem',
                    aksi: 'Pengaduan diterima sistem'
                },
                {
                    tanggal: '2024-01-10',
                    petugas: 'kabid',
                    aksi: 'Pengaduan ditugaskan kepada Melky'
                },
                {
                    tanggal: '2024-02-01',
                    petugas: 'melky',
                    aksi: 'Kasus selesai ditangani'
                }
            ]
        }
    ],
    temuanData: [
        {
            id: 'TEM001',
            judul: 'Potensi Konflik Agraria',
            sumber: 'Monitoring Media',
            tanggal: '2024-01-05',
            kabupaten: 'Lampung Timur',
            kecamatan: 'Sukadana',
            status: 'terverifikasi',
            prioritas: 'tinggi',
            petugas: 'putri',
            log: [
                {
                    tanggal: '2024-01-05',
                    petugas: 'putri',
                    aksi: 'Temuan baru diinput'
                },
                {
                    tanggal: '2024-01-07',
                    petugas: 'kabid',
                    aksi: 'Temuan diverifikasi'
                }
            ]
        }
    ],
    settings: {
        appName: 'SIAP HAM',
        logo: null, // Base64 string of logo if uploaded
        lastBackup: null
    }
};

// Initialize data in localStorage if not exists
function initializeData() {
    if (!localStorage.getItem('siapham_users')) {
        localStorage.setItem('siapham_users', JSON.stringify(initialData.users));
    }
    if (!localStorage.getItem('siapham_aduan')) {
        localStorage.setItem('siapham_aduan', JSON.stringify(initialData.aduanData));
    }
    if (!localStorage.getItem('siapham_temuan')) {
        localStorage.setItem('siapham_temuan', JSON.stringify(initialData.temuanData));
    }
    if (!localStorage.getItem('siapham_settings')) {
        localStorage.setItem('siapham_settings', JSON.stringify(initialData.settings));
    }
}

// Data access functions
const DataService = {
    // User related functions
    getUsers: () => JSON.parse(localStorage.getItem('siapham_users') || '[]'),
    getUserByUsername: (username) => {
        const users = JSON.parse(localStorage.getItem('siapham_users') || '[]');
        return users.find(user => user.username === username);
    },
    updateUser: (userId, userData) => {
        let users = JSON.parse(localStorage.getItem('siapham_users') || '[]');
        users = users.map(user => user.id === userId ? {...user, ...userData} : user);
        localStorage.setItem('siapham_users', JSON.stringify(users));
    },

    // Aduan related functions
    getAduanList: () => JSON.parse(localStorage.getItem('siapham_aduan') || '[]'),
    getAduanById: (id) => {
        const aduanList = JSON.parse(localStorage.getItem('siapham_aduan') || '[]');
        return aduanList.find(aduan => aduan.id === id);
    },
    createAduan: (aduanData) => {
        const aduanList = JSON.parse(localStorage.getItem('siapham_aduan') || '[]');
        aduanList.push(aduanData);
        localStorage.setItem('siapham_aduan', JSON.stringify(aduanList));
    },
    updateAduan: (id, updateData) => {
        let aduanList = JSON.parse(localStorage.getItem('siapham_aduan') || '[]');
        aduanList = aduanList.map(aduan => aduan.id === id ? {...aduan, ...updateData} : aduan);
        localStorage.setItem('siapham_aduan', JSON.stringify(aduanList));
    },

    // Temuan related functions
    getTemuanList: () => JSON.parse(localStorage.getItem('siapham_temuan') || '[]'),
    getTemuanById: (id) => {
        const temuanList = JSON.parse(localStorage.getItem('siapham_temuan') || '[]');
        return temuanList.find(temuan => temuan.id === id);
    },
    createTemuan: (temuanData) => {
        const temuanList = JSON.parse(localStorage.getItem('siapham_temuan') || '[]');
        temuanList.push(temuanData);
        localStorage.setItem('siapham_temuan', JSON.stringify(temuanList));
    },
    updateTemuan: (id, updateData) => {
        let temuanList = JSON.parse(localStorage.getItem('siapham_temuan') || '[]');
        temuanList = temuanList.map(temuan => temuan.id === id ? {...temuan, ...updateData} : temuan);
        localStorage.setItem('siapham_temuan', JSON.stringify(temuanList));
    },

    // Settings related functions
    getSettings: () => JSON.parse(localStorage.getItem('siapham_settings') || '{}'),
    updateSettings: (settings) => {
        localStorage.setItem('siapham_settings', JSON.stringify(settings));
    },

    // Utility functions
    generateAduanId: () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        let id = 'X';
        id += chars.charAt(Math.floor(Math.random() * chars.length));
        id += chars.charAt(Math.floor(Math.random() * chars.length));
        id += nums.charAt(Math.floor(Math.random() * nums.length));
        id += nums.charAt(Math.floor(Math.random() * nums.length));
        id += nums.charAt(Math.floor(Math.random() * nums.length));
        return id;
    },

    // Backup & Restore
    createBackup: () => {
        const backup = {
            users: JSON.parse(localStorage.getItem('siapham_users') || '[]'),
            aduan: JSON.parse(localStorage.getItem('siapham_aduan') || '[]'),
            temuan: JSON.parse(localStorage.getItem('siapham_temuan') || '[]'),
            settings: JSON.parse(localStorage.getItem('siapham_settings') || '{}'),
            timestamp: new Date().toISOString()
        };
        return backup;
    },
    restoreBackup: (backupData) => {
        localStorage.setItem('siapham_users', JSON.stringify(backupData.users));
        localStorage.setItem('siapham_aduan', JSON.stringify(backupData.aduan));
        localStorage.setItem('siapham_temuan', JSON.stringify(backupData.temuan));
        localStorage.setItem('siapham_settings', JSON.stringify(backupData.settings));
    }
};

// Initialize data when the script loads
initializeData();
