-- Update users table to add OAuth columns
ALTER TABLE IF EXISTS users
ADD COLUMN IF NOT EXISTS email TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS display_name TEXT,
ADD COLUMN IF NOT EXISTS profile_picture TEXT,
ADD COLUMN IF NOT EXISTS google_id TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS github_id TEXT UNIQUE,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP;

-- Make password column nullable to support OAuth users
ALTER TABLE users
ALTER COLUMN password DROP NOT NULL;