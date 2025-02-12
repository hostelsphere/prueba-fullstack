-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "general";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "monitoring";

-- CreateEnum
CREATE TYPE "monitoring"."status" AS ENUM ('INFO', 'WARN', 'OK', 'FAIL');

-- CreateTable
CREATE TABLE "general"."properties" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "monitoring"."logs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "service" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "property_id" UUID NOT NULL,
    "datetime" DATE NOT NULL,
    "status" "monitoring"."status" NOT NULL,

    CONSTRAINT "logs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "monitoring"."logs" ADD CONSTRAINT "logs_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "general"."properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
