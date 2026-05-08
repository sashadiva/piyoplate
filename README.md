<p align="center">
  <a href="" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Piyoplate Logo" /></a>
</p>

🥗 PiyoPlate

#BACKEND  : 

Backend API untuk aplikasi PiyoPlate (Calorie Tracker & Recipe Sharing). Dibangun menggunakan NestJS, Prisma ORM, dan PostgreSQL.

🚀 Fitur Utama
- Auth: Register & Login dengan enkripsi password (Bcrypt).
- Users: Manajemen profil dan target kalori harian.
- Recipes: CRUD resep, fitur pencarian, dan relasi ke author.
- Nutrition: Log makanan harian dan kalkulasi sisa kuota kalori otomatis.

🛠️ Tech Stack
- Framework: NestJS
- Database: PostgreSQL
- ORM: Prisma
- Validation: Class-validator & Class-transformer
- Language: TypeScript

📦 Cara Install & Menjalankan

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
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/piyoplate?schema=public"

4. Setup Database (Prisma)

```bash
$ npx prisma generate
$ npx prisma db push
```
5. Jalankan Aplikasi
```bash
$ npm run start:dev
```