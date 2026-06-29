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
---

## ✨ Fitur Utama

* 🔐 **Authentication System**: Pendaftaran dan masuk akun yang aman menggunakan enkripsi Bcrypt.
* 🍳 **Recipe Management**: Berbagi resep (Create, Read, Search) dengan detail nutrisi per porsi.
* 📊 **Calorie Tracking**: Pencatatan log makanan harian yang terintegrasi dengan target kalori individu.
* 👤 **Profile Analytics**: Ringkasan asupan harian (Sisa kalori, total konsumsi, dan status gizi).
* 🚀 **Prisma Integration**: Akses database super cepat dan aman dengan Prisma ORM.

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
