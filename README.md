# PutraaLabs — Digital Systems & Software Engineering Studio 🌐⚡

Website Company Profile resmi untuk **PutraaLabs**, sebuah studio rekayasa piranti lunak independen yang dirancang sebagai representasi bisnis impian 5 tahun ke depan dalam bidang pengembangan web modern, aplikasi mobile, dan otomatisasi sistem digital.

> **Tugas Mata Kuliah:** Pembuatan Website Company Profile Bisnis Impian 5 Tahun ke Depan  
> **Nama Pengembang:** Allam Permata Putra  
> **NIM:** 260558302016  
> **Program Studi:** Rekayasa Perangkat Lunak (TRPL)  

---

## 📌 Deskripsi Singkat Proyek

**PutraaLabs** dibangun dengan pendekatan *modern editorial minimalist* (bebas dari gaya generik *AI-slop*), mengedepankan tipografi berbobot tinggi, kanvas bersih `#FAFAFC`, serta transparansi teknis. Website ini berfungsi sebagai portal portofolio komersial dan etalase layanan rekayasa sistem yang terintegrasi secara dinamis dengan data waktu nyata dari GitHub API.

### Fitur Utama:
- **Editorial Asymmetric Layout**: Pembagian dua kolom bergaya majalah arsitektur Swiss (panel kiri pengenalan & kontak statis, panel kanan katalog proyek terkurasi).
- **GitHub API Live Synchronization**: Sinkronisasi repositori otomatis untuk menampilkan karya terverifikasi lengkap dengan metrik, bahasa pemrograman, dan waktu pembaruan.
- **Katalog & Filter Interaktif**: Filter kategori instan (*Semua Karya*, *Web Platform*, *Mobile Apps*) serta fitur pencarian kata kunci secara instan tanpa memuat ulang halaman (*zero-reload*).
- **Showcase & Tautan Langsung**: Tautan langsung menuju kode sumber di GitHub serta akses demo/rilis aplikasi aktif.
- **Akses Komunikasi Cepat**: Tautan terhubung langsung ke kanal WhatsApp resmi, email studio, dan profil GitHub pengembang.

---

## 🛠️ Teknologi yang Digunakan

Proyek ini dibangun menggunakan arsitektur modern berkinerja tinggi:

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router Architecture)
- **UI Library**: [React 19](https://react.dev/)
- **Bahasa Pemrograman**: [TypeScript](https://www.typescriptlang.org/) (Strict type-checking)
- **Styling & Desain**: [Tailwind CSS v4](https://tailwindcss.com/) dengan `@tailwindcss/turbopack`
- **Tipografi**: Geist Sans & Geist Mono
- **Integrasi Data**: GitHub REST API v3 dengan fallback *local static cache* (`projects.json`)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Bundler / Compiler**: Turbopack

---

## 🚀 Langkah Menjalankannya

Ikuti langkah-langkah berikut untuk menjalankan proyek ini di lingkungan lokal Anda:

### 1. Prasyarat Sistem
Pastikan perangkat Anda telah terpasang:
- **Node.js** versi 20.x atau lebih baru
- **pnpm** versi 9.x / 10.x / 12.x (atau gunakan `corepack enable pnpm`)
- **Git**

### 2. Kloning Repositori
```bash
git clone https://github.com/allam1768/project-company_profile-260558302016.git
cd project-company_profile-260558302016
```

### 3. Instalasi Dependensi
Jalankan perintah berikut untuk mengunduh seluruh dependensi yang diperlukan:
```bash
pnpm install
```

### 4. Sinkronisasi Data Proyek (Opsional)
Untuk memperbarui daftar repositori langsung dari akun GitHub pengembang:
```bash
pnpm sync
```
*(Langkah ini otomatis mengeksekusi skrip `scripts/sync.mjs` dan memperbarui `src/data/projects.json`)*

### 5. Menjalankan Server Pengembangan
Jalankan server pengembangan lokal:
```bash
pnpm dev
```
Buka peramban web dan akses:
```text
http://localhost:3000
```

### 6. Build & Jalankan Mode Produksi
Untuk menguji performa optimasi produksi:
```bash
# Build aplikasi
pnpm build

# Jalankan server produksi
pnpm start
```
Aplikasi siap melayani akses pada port default atau kustom (`pnpm start -p 3000`).
