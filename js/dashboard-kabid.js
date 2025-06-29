// Dashboard Kabid JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Protect route for kabid role
    AuthService.protectRoute(['kabid']);

    // Load user info
    const session = AuthService.getCurrentSession();
    if (session) {
        document.getElementById('userName').textContent = session.name;
        document.getElementById('userRole').textContent = 'Kabid';
    }

    // Load aduan data and update UI
    loadAduanStats();
    loadRecentAduan();
    loadPetugasOptions();

    // Initialize charts
    initStatusChart();
    initTrendChart();
});

let statusChart;
let trendChart;

function loadAduanStats() {
    const aduanList = DataService.getAduanList();

    const total = aduanList.length;
    const baru = aduanList.filter(a => a.status === 'baru').length;
    const proses = aduanList.filter(a => a.status === 'proses').length;
    const selesai = aduanList.filter(a => a.status === 'selesai').length;

    document.getElementById('totalAduan').textContent = total;
    document.getElementById('aduanBaru').textContent = baru;
    document.getElementById('aduanProses').textContent = proses;
    document.getElementById('aduanSelesai').textContent = selesai;

    // Update status chart data
    if (statusChart) {
        statusChart.data.datasets[0].data = [baru, proses, selesai];
        statusChart.update();
    }
}

function loadRecentAduan() {
    const aduanList = DataService.getAduanList();
    const recentAduan = aduanList.slice(-5).reverse();

    const tbody = document.getElementById('recentAduanTable');
    tbody.innerHTML = '';

    recentAduan.forEach(aduan => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${aduan.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${aduan.judul}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${new Date(aduan.tanggalLapor).toLocaleDateString('id-ID')}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    aduan.status === 'baru' ? 'bg-blue-100 text-blue-800' :
                    aduan.status === 'proses' ? 'bg-yellow-100 text-yellow-800' :
                    aduan.status === 'selesai' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }">${aduan.status.charAt(0).toUpperCase() + aduan.status.slice(1)}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${aduan.petugas || '-'}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm">
                <button onclick="openAssignModal('${aduan.id}')" class="text-primary hover:underline">Tugaskan</button>
            </td>
        `;

        tbody.appendChild(tr);
    });
}

function loadPetugasOptions() {
    const petugasList = DataService.getUsers().filter(u => u.role === 'petugas');
    const select = document.getElementById('assignPetugas');
    select.innerHTML = '<option value="">Pilih Petugas</option>';

    petugasList.forEach(petugas => {
        const option = document.createElement('option');
        option.value = petugas.username;
        option.textContent = petugas.name;
        select.appendChild(option);
    });
}

function openAssignModal(aduanId) {
    document.getElementById('assignAduanId').value = aduanId;
    document.getElementById('assignModal').classList.remove('hidden');
}

function closeAssignModal() {
    document.getElementById('assignModal').classList.add('hidden');
}

function handleAssignSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const aduanId = form.aduanId.value;
    const petugas = form.petugas.value;
    const prioritas = form.prioritas.value;
    const catatan = form.catatan.value;

    if (!petugas) {
        alert('Pilih petugas terlebih dahulu');
        return false;
    }

    // Update aduan data
    const aduan = DataService.getAduanById(aduanId);
    if (!aduan) {
        alert('Data aduan tidak ditemukan');
        return false;
    }

    aduan.petugas = petugas;
    aduan.prioritas = prioritas;
    aduan.status = 'proses';

    // Add log entry
    aduan.log.push({
        tanggal: new Date().toISOString().split('T')[0],
        petugas: 'kabid',
        aksi: `Pengaduan ditugaskan kepada ${petugas}. Catatan: ${catatan || '-'}`
    });

    DataService.updateAduan(aduanId, aduan);

    // Dummy email notification (console log)
    console.log(`Email dummy: Pengaduan ${aduanId} telah ditugaskan kepada ${petugas}`);

    // Refresh UI
    loadAduanStats();
    loadRecentAduan();

    closeAssignModal();

    alert('Pengaduan berhasil ditugaskan');

    return false;
}

function initStatusChart() {
    const ctx = document.getElementById('statusChart').getContext('2d');
    const aduanList = DataService.getAduanList();

    const baru = aduanList.filter(a => a.status === 'baru').length;
    const proses = aduanList.filter(a => a.status === 'proses').length;
    const selesai = aduanList.filter(a => a.status === 'selesai').length;

    statusChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Baru', 'Dalam Proses', 'Selesai'],
            datasets: [{
                data: [baru, proses, selesai],
                backgroundColor: ['#3B82F6', '#FBBF24', '#22C55E'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function initTrendChart() {
    const ctx = document.getElementById('trendChart').getContext('2d');
    const aduanList = DataService.getAduanList();

    // Group by month and count
    const countsByMonth = {};

    aduanList.forEach(aduan => {
        const month = new Date(aduan.tanggalLapor).toLocaleString('id-ID', { month: 'short', year: 'numeric' });
        countsByMonth[month] = (countsByMonth[month] || 0) + 1;
    });

    const labels = Object.keys(countsByMonth);
    const data = Object.values(countsByMonth);

    trendChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Jumlah Aduan',
                data: data,
                fill: false,
                borderColor: '#1E3A8A',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    precision: 0
                }
            }
        }
    });
}
