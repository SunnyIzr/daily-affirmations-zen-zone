
-- Create the affirmations table
CREATE TABLE public.affirmations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  text TEXT NOT NULL,
  premium BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create the users table
CREATE TABLE public.users (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Populate the affirmations table with 20 affirmations (10 premium, 10 free)
INSERT INTO public.affirmations (text, premium) VALUES
  ('I am worthy of love and respect just as I am', false),
  ('Today brings new opportunities for growth and joy', false),
  ('I trust in my ability to overcome any challenge', false),
  ('My thoughts create my reality, and I choose positivity', false),
  ('I am grateful for all the abundance in my life', false),
  ('Every breath I take fills me with peace and calm', false),
  ('I deserve happiness and success in all areas of my life', false),
  ('My potential is limitless and I embrace new possibilities', false),
  ('I am strong, capable, and resilient in all situations', false),
  ('Love and kindness flow through me to everyone I meet', false),
  ('I release all fear and embrace courage in every moment', true),
  ('My inner wisdom guides me to make the best decisions', true),
  ('I am a magnet for miracles and wonderful experiences', true),
  ('Every cell in my body vibrates with perfect health and vitality', true),
  ('I attract abundance and prosperity with ease and grace', true),
  ('My dreams are valid and I have the power to manifest them', true),
  ('I forgive myself and others, freeing my heart from all burdens', true),
  ('The universe conspires to help me achieve my highest good', true),
  ('I am divinely protected and guided in all my endeavors', true),
  ('My life is a beautiful gift and I cherish every precious moment', true);

-- Populate the users table with sample users
INSERT INTO public.users (name, email) VALUES
  ('Sarah Johnson', 'sarah.johnson@example.com'),
  ('Michael Chen', 'michael.chen@example.com'),
  ('Emma Rodriguez', 'emma.rodriguez@example.com'),
  ('David Kim', 'david.kim@example.com');
