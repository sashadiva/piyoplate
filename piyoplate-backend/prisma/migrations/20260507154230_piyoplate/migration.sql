-- CreateEnum
CREATE TYPE "users_role" AS ENUM ('admin', 'user');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "full_name" VARCHAR(100),
    "daily_calorie_goal" INTEGER NOT NULL DEFAULT 2000,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "users_role" DEFAULT 'user',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipes" (
    "id" SERIAL NOT NULL,
    "author_id" INTEGER NOT NULL,
    "title" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "calories_per_serving" INTEGER NOT NULL,
    "cook_time_minutes" INTEGER,
    "ingredients" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "image_url" VARCHAR(255),
    "video_url" VARCHAR(255),
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recipes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nutrition_logs" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "recipe_id" INTEGER NOT NULL,
    "calories_added" INTEGER NOT NULL,
    "logged_at" TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "nutrition_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "username" ON "users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "email" ON "users"("email");

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutrition_logs" ADD CONSTRAINT "nutrition_logs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "nutrition_logs" ADD CONSTRAINT "nutrition_logs_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
