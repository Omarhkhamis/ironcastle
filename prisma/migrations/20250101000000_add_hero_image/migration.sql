-- Add heroImageUrl column to settings
ALTER TABLE "Setting" ADD COLUMN IF NOT EXISTS "heroImageUrl" TEXT;
