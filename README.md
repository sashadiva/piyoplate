<p align="center">
  <a href="" target="blank"><img src="./frontend/mobile_app/assets/images/LogoPiyoPlate.png" width="500" alt="Piyoplate Logo" /></a>
</p>

<p align="center">
  <strong>PiyoPlate</strong> — Solusi cerdas pelacak kalori dan berbagi resep sehat dalam satu genggaman.
  <br />
  <i>"Plate your health, track your life."</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
</p>

---

## 📖 Tentang Project
Aplikasi PiyoPlate (Calorie Tracker & Recipe Sharing). Dibangun menggunakan NestJS, Prisma ORM, dan PostgreSQL. 

PiyoPlate dikembangkan dengan landasan kontribusi terhadap *Sustainable Development Goals (SDG) ke-3*, yaitu Kehidupan Sehat dan Sejahtera (Good Health and Well-Being). Tujuan global ini menekankan pentingnya akses terhadap informasi kesehatan yang andal serta upaya pencegahan penyakit, termasuk penyakit tidak menular yang erat kaitannya dengan pola makan yang tidak terkontrol.
Secara lebih spesifik, PiyoPlate berkontribusi pada beberapa target turunan SDG 3, di antaranya:
- Mengurangi angka kematian dini akibat penyakit tidak menular melalui upaya pencegahan berbasis pemantauan pola makan sehari-hari.
- Mendukung akses terhadap layanan dan informasi kesehatan yang esensial, dalam hal ini informasi kalori, secara gratis dan mudah dijangkau melalui aplikasi mobile.
- Memperkuat kapasitas individu dalam manajemen risiko kesehatan pribadi melalui teknologi digital, seperti estimasi kalori berbasis AI dan ringkasan asupan harian yang dipersonalisasi.
Dengan fitur pencatatan kalori, ringkasan asupan harian, serta status kalori yang ditampilkan secara real-time, PiyoPlate mendorong penggunanya untuk lebih sadar terhadap pola makan masing-masing, sehingga selaras dengan semangat pencegahan dini yang menjadi inti dari SDG 3.
Selain SDG 3, PiyoPlate secara tidak langsung juga turut mendukung SDG 12 (Responsible Consumption and Production), khususnya pada aspek konsumsi pangan yang lebih sadar dan terukur.

<p align="center">
  <a href="" target="blank"><img src="./frontend/mobile_app/assets/images/6.png" width="1000" alt="Piyoplate Logo" /></a>
</p>

Aplikasi ini dibangun dengan tujuan tertentu yang diantaranya : 
- Menyediakan satu platform bagi pengguna untuk menemukan, melihat, dan membuat resep, termasuk bahan-bahan, petunjuk langkah demi langkah, waktu persiapan, informasi kalori per porsi, serta mencatat kalori secara otomatis ke dalam pelacak nutrisi pribadi melalui tiga metode input yang berbeda.
- Merancang dan mengimplementasikan arsitektur yang secara jelas memisahkan presentasi sisi klien dari logika aplikasi menggunakan kerangka kerja NestJS, validasi DTO, dan akses basis data PostgreSQL melalui Prisma ORM, sehingga setiap lapisan dapat dimodifikasi atau diuji secara independen.
- Mengevaluasi sistem yang dihasilkan berdasarkan metrik kualitas perangkat lunak ISO/IEC 25010.

<p align="center">
  <a href="" target="blank"><img src="./frontend/mobile_app/assets/images/8.png" width="1000" alt="Piyoplate Logo" /></a>
</p>

---


## ✨ Fitur Utama

* 🔐 **Authentication System**: Pendaftaran dan masuk akun yang aman menggunakan enkripsi Bcrypt.
* 🍳 **Recipe Management**: Berbagi resep (Create, Read, Search, Delete) dengan detail nutrisi per porsi.
* 📊 **Calorie Tracking**: Pencatatan log makanan harian yang terintegrasi dengan target kalori individu.
* 👤 **Profile Analytics**: Ringkasan asupan harian (Sisa kalori, total konsumsi, dan status gizi).
* 🚀 **Prisma Integration**: Akses database super cepat dan aman dengan Prisma ORM.

<p align="center">
  <a href="" target="blank"><img src="./frontend/mobile_app/assets/images/9.png" width="1000" alt="Piyoplate Logo" /></a>
</p>

---

##  Architecture
<p align="center">
  <a href="" target="blank"><img src="./frontend/mobile_app/assets/images/19.png" width="1000" alt="Piyoplate Logo" /></a>
</p>

---

## 🛠️ Tech Stack

| Komponen | Teknologi |
| :--- | :--- |
| **Framework** | NestJS (Node.js) |
| **Database** | PostgreSQL |
| **ORM** | Prisma |
| **Security** | Bcrypt & Validation Pipes |
| **Documentation** | Postman & README |

---

## 🚀 Memulai Project

### 1. Prasyarat
Pastikan kamu sudah menginstall:
- [Node.js](https://nodejs.org/) (v16 atau terbaru)
- [PostgreSQL](https://www.postgresql.org/)
- Flutter SDK

### 2. Instalasi
1. Clone Project

```bash
$ git clone https://github.com/sashadiva/piyoplate.git
$ cd piyoplate/piyoplate-backend
```

2. Install Dependencies
```bash
$ npm install
```

3. Konfigurasi Environment
   
Buat file .env di root folder backend dan masukkan kode di bawah ini:
```env
# ganti seluruh tulisan yang dalam bentuk CAPSLOCK (USER, PASSWORD, NAMA_DATABASE) sesuai dengan pengaturan database yang dimiliki.
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/piyoplate?schema=public"

# API Key dapat diisi dengan key yang diberikan melalui .txt file
GEMINI_API_KEY=
```

4. Setup Database (PostGreSQL & Prisma)
```bash
# Jalankan pada terminal yang dapat mengakses `psql`
# Pada Windows, jika 'psql' tidak dikenali, buka folder PostgreSQL `bin`
# contoh: C:\Program Files\PostgreSQL\18\bin
$ psql -U postgres -c "CREATE DATABASE piyoplate;"

# Ganti path berikut dengan lokasi file `piyoplate_backup.sql`
$ psql -U postgres -d piyoplate -f "C:\path\to\piyoplate_backup.sql"
```

```bash
# dilakukan di path piyoplate-backend
$ npx prisma generate
```

5. Setup Frontend
```bash
$ cd frontend/mobile_app
$ flutter pub get
```

6. Jalankan Aplikasi
```bash
# Terminal 1 (Backend)
$ cd piyoplate-backend
$ npm run start:dev

# Terminal 2 (Frontend)
$ cd frontend/mobile_app
$ flutter run
```

*kode ini dirancang untuk dijalankan pada Android Emulator
