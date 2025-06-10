
-- Add lightswitch_user_id column to users table
ALTER TABLE public.users 
ADD COLUMN lightswitch_user_id text;
