// Modal handling functions
function showPengaduanModal() {
    const modal = document.getElementById('pengaduanModal');
    modal.classList.remove('hidden');
    
    // Inject modal content
    modal.querySelector('.bg-white').innerHTML = `
        <div class="p-6">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold">Buat Pengaduan Baru</h3>
                <button onclick="closePengaduanModal()" class="text-gray-500 hover:text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            
            <form id="pengaduanForm" onsubmit="return handlePengaduanSubmit(event)" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Judul Pengaduan</label>
                    <input type="text" name="judul" required
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Masukkan judul pengaduan">
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nama Pelapor</label>
                    <input type="text" name="pelapor" required
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Masukkan nama lengkap">
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Kabupaten/Kota</label>
                        <select name="kabupaten" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                            <option value="">Pilih Kabupaten/Kota</option>
                            <option value="Bandar Lampung">Bandar Lampung</option>
                            <option value="Lampung Selatan">Lampung Selatan</option>
                            <option value="Lampung Tengah">Lampung Tengah</option>
                            <option value="Lampung Timur">Lampung Timur</option>
                            <option value="Lampung Utara">Lampung Utara</option>
                            <option value="Lampung Barat">Lampung Barat</option>
                            <option value="Tulang Bawang">Tulang Bawang</option>
                            <option value="Way Kanan">Way Kanan</option>
                            <option value="Pesawaran">Pesawaran</option>
                            <option value="Pringsewu">Pringsewu</option>
                            <option value="Mesuji">Mesuji</option>
                            <option value="Tulang Bawang Barat">Tulang Bawang Barat</option>
                            <option value="Pesisir Barat">Pesisir Barat</option>
                            <option value="Metro">Metro</option>
                        </select>
                    </div>
                    
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Kecamatan</label>
                        <input type="text" name="kecamatan" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                            placeholder="Masukkan kecamatan">
                    </div>
                </div>
                
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Uraian Pengaduan</label>
                    <textarea name="uraian" required rows="4"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Jelaskan secara detail kronologi kejadian"></textarea>
                </div>
                
                <div class="flex justify-end space-x-3">
                    <button type="button" onclick="closePengaduanModal()"
                        class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                        Batal
                    </button>
                    <button type="submit"
                        class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                        Kirim Pengaduan
                    </button>
                </div>
            </form>
        </div>
    `;
}

function showLacakModal() {
    const modal = document.getElementById('lacakModal');
    modal.classList.remove('hidden');
    
    // Inject modal content
    modal.querySelector('.bg-white').innerHTML = `
        <div class="p-6">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-bold">Lacak Status Pengaduan</h3>
                <button onclick="closeLacakModal()" class="text-gray-500 hover:text-gray-700">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            
            <form id="lacakForm" onsubmit="return handleLacakSubmit(event)" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Nomor Pengaduan</label>
                    <input type="text" name="nomorAduan" required
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Contoh: XNY002">
                </div>
                
                <div class="flex justify-end space-x-3">
                    <button type="button" onclick="closeLacakModal()"
                        class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                        Batal
                    </button>
                    <button type="submit"
                        class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                        Lacak Status
                    </button>
                </div>
            </form>
            
            <div id="hasilLacak" class="mt-4 hidden">
                <!-- Result will be injected here -->
            </div>
        </div>
    `;
}

function closePengaduanModal() {
    document.getElementById('pengaduanModal').classList.add('hidden');
}

function closeLacakModal() {
    document.getElementById('lacakModal').classList.add('hidden');
}

// Form submission handlers
function handlePengaduanSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Create new aduan object
    const aduanData = {
        id: DataService.generateAduanId(),
        judul: formData.get('judul'),
        pelapor: formData.get('pelapor'),
        kabupaten: formData.get('kabupaten'),
        kecamatan: formData.get('kecamatan'),
        uraian: formData.get('uraian'),
        tanggalLapor: new Date().toISOString().split('T')[0],
        status: 'baru',
        prioritas: 'belum_ditentukan',
        petugas: null,
        tahapan: [],
        log: [
            {
                tanggal: new Date().toISOString().split('T')[0],
                petugas: 'sistem',
                aksi: 'Pengaduan diterima sistem'
            }
        ]
    };
    
    // Save to localStorage
    DataService.createAduan(aduanData);
    
    // Show success message
    const modalContent = document.querySelector('#pengaduanModal .bg-white');
    modalContent.innerHTML = `
        <div class="p-6 text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
            <h3 class="text-xl font-bold mb-2">Pengaduan Berhasil Dikirim</h3>
            <p class="text-gray-600 mb-4">Nomor Pengaduan Anda:</p>
            <p class="text-2xl font-bold text-primary mb-6">${aduanData.id}</p>
            <p class="text-sm text-gray-500 mb-6">Simpan nomor pengaduan ini untuk melacak status pengaduan Anda</p>
            <button onclick="closePengaduanModal()"
                class="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                Tutup
            </button>
        </div>
    `;
    
    return false;
}

function handleLacakSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const nomorAduan = form.nomorAduan.value;
    
    // Get aduan data
    const aduan = DataService.getAduanById(nomorAduan);
    
    const hasilLacak = document.getElementById('hasilLacak');
    
    if (!aduan) {
        hasilLacak.innerHTML = `
            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                <p class="text-red-700">Pengaduan dengan nomor ${nomorAduan} tidak ditemukan</p>
            </div>
        `;
    } else {
        // Format status
        const statusMap = {
            'baru': 'Baru',
            'proses': 'Dalam Proses',
            'selesai': 'Selesai',
            'ditolak': 'Ditolak'
        };
        
        hasilLacak.innerHTML = `
            <div class="border border-gray-200 rounded-lg">
                <div class="p-4 border-b border-gray-200">
                    <h4 class="font-bold mb-2">Detail Pengaduan</h4>
                    <p class="text-sm text-gray-600">Nomor: ${aduan.id}</p>
                    <p class="text-sm text-gray-600">Tanggal: ${new Date(aduan.tanggalLapor).toLocaleDateString('id-ID')}</p>
                    <p class="text-sm text-gray-600">Status: ${statusMap[aduan.status]}</p>
                </div>
                
                <div class="p-4">
                    <h4 class="font-bold mb-2">Riwayat Penanganan</h4>
                    <div class="space-y-3">
                        ${aduan.log.map(log => `
                            <div class="flex items-start space-x-3">
                                <div class="w-2 h-2 bg-primary rounded-full mt-2"></div>
                                <div>
                                    <p class="text-sm text-gray-600">${new Date(log.tanggal).toLocaleDateString('id-ID')}</p>
                                    <p class="text-sm">${log.aksi}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }
    
    hasilLacak.classList.remove('hidden');
    
    return false;
}

// Initialize when document loads
document.addEventListener('DOMContentLoaded', () => {
    // Check if we need to initialize data
    if (!localStorage.getItem('siapham_initialized')) {
        initializeData();
        localStorage.setItem('siapham_initialized', 'true');
    }
});
