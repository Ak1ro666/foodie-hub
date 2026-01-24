/*
  Warnings:

  - You are about to drop the column `activityLevel` on the `body_measurement` table. All the data in the column will be lost.
  - You are about to drop the column `nutritionGoal` on the `body_measurement` table. All the data in the column will be lost.
  - You are about to drop the column `ingredientId` on the `recipe_ingredients` table. All the data in the column will be lost.
  - You are about to drop the column `recipeId` on the `recipe_ingredients` table. All the data in the column will be lost.
  - You are about to drop the `Courier` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[recipe_id,ingridient_id]` on the table `recipe_ingredients` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_courier_id_fkey";

-- DropForeignKey
ALTER TABLE "recipe_ingredients" DROP CONSTRAINT "recipe_ingredients_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "recipe_ingredients" DROP CONSTRAINT "recipe_ingredients_recipeId_fkey";

-- DropIndex
DROP INDEX "recipe_ingredients_recipeId_ingredientId_key";

-- AlterTable
ALTER TABLE "body_measurement" DROP COLUMN "activityLevel",
DROP COLUMN "nutritionGoal",
ADD COLUMN     "activity_level" "ActivityLevel",
ADD COLUMN     "nutrition_goal" "NutritionGoal";

-- AlterTable
ALTER TABLE "recipe_ingredients" DROP COLUMN "ingredientId",
DROP COLUMN "recipeId",
ADD COLUMN     "ingridient_id" TEXT,
ADD COLUMN     "recipe_id" TEXT;

-- DropTable
DROP TABLE "Courier";

-- CreateTable
CREATE TABLE "couriers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "couriers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "recipe_ingredients_recipe_id_ingridient_id_key" ON "recipe_ingredients"("recipe_id", "ingridient_id");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_courier_id_fkey" FOREIGN KEY ("courier_id") REFERENCES "couriers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "recipe_ingredients_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipe_ingredients" ADD CONSTRAINT "recipe_ingredients_ingridient_id_fkey" FOREIGN KEY ("ingridient_id") REFERENCES "ingredients"("id") ON DELETE SET NULL ON UPDATE CASCADE;
