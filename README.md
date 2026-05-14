<p align="center">
  <a href="" target="blank"><img src="./frontend/mobile_app/assets/images/6ec1c941-9d8b-4175-abae-155482b40c38 1.svg" width="120" alt="Piyoplate Logo" /></a>
</p>

# 🥗 PiyoPlate Back-End API

<p align="center">
  http://googleusercontent.com/image_generation_content/0
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
| **Database** | PostgreSQL / MySQL |
| **ORM** | Prisma |
| **Security** | Bcrypt & Validation Pipes |
| **Documentation** | Postman & README |

---

## 🚀 Memulai Project

### 1. Prasyarat
Pastikan kamu sudah menginstall:
- [Node.js](https://nodejs.org/) (v16 atau terbaru)
- [PostgreSQL](https://www.postgresql.org/)

### 2. Instalasi
1. Clone Project

```bash
$ git clone https://github.com/sashadiva/piyoplate.git
$ cd piyoplate-backend
```

2. Install Dependencies
```bash
$ npm install
```

3. Konfigurasi Environment
Buat file .env di root folder dan masukkan URL database : 
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/NAMA_DATABASE?schema=public"

-> ganti seluruh tulisan yang dalam bentuk CAPSLOCK (USER, PASSWORD, NAMA_DATABASE) sesuai dengan pengaturan database yang dimiliki.

5. Setup Database (Prisma)

```bash
$ npx prisma generate
$ npx prisma db push
```
5. Jalankan Aplikasi
```bash
$ npm run start:dev
```
