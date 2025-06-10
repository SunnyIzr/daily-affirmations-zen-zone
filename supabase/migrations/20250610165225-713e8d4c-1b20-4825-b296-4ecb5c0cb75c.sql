
-- Add topic column to affirmations table
ALTER TABLE public.affirmations 
ADD COLUMN topic TEXT NOT NULL DEFAULT 'self-love';

-- Update affirmations with topics based on their content
UPDATE public.affirmations SET topic = 'self-love' WHERE text LIKE '%worthy%' OR text LIKE '%love%';
UPDATE public.affirmations SET topic = 'abundance' WHERE text LIKE '%abundance%' OR text LIKE '%prosperity%' OR text LIKE '%attract%';
UPDATE public.affirmations SET topic = 'health' WHERE text LIKE '%health%' OR text LIKE '%body%' OR text LIKE '%breath%' OR text LIKE '%peace%';
UPDATE public.affirmations SET topic = 'success' WHERE text LIKE '%success%' OR text LIKE '%potential%' OR text LIKE '%dreams%' OR text LIKE '%achieve%';
UPDATE public.affirmations SET topic = 'relationships' WHERE text LIKE '%kindness%' OR text LIKE '%forgive%' OR text LIKE '%meet%';

-- Update any remaining affirmations that didn't match patterns with random topics
UPDATE public.affirmations SET topic = 'abundance' WHERE text LIKE '%opportunities%' OR text LIKE '%grateful%';
UPDATE public.affirmations SET topic = 'success' WHERE text LIKE '%trust%' OR text LIKE '%overcome%' OR text LIKE '%strong%' OR text LIKE '%capable%';
UPDATE public.affirmations SET topic = 'health' WHERE text LIKE '%fills me%' OR text LIKE '%calm%';
UPDATE public.affirmations SET topic = 'relationships' WHERE text LIKE '%flow%' OR text LIKE '%everyone%';
UPDATE public.affirmations SET topic = 'success' WHERE text LIKE '%deserve%' OR text LIKE '%happiness%';
UPDATE public.affirmations SET topic = 'abundance' WHERE text LIKE '%limitless%' OR text LIKE '%possibilities%';
UPDATE public.affirmations SET topic = 'success' WHERE text LIKE '%resilient%';
UPDATE public.affirmations SET topic = 'success' WHERE text LIKE '%fear%' OR text LIKE '%courage%';
UPDATE public.affirmations SET topic = 'success' WHERE text LIKE '%wisdom%' OR text LIKE '%decisions%';
UPDATE public.affirmations SET topic = 'abundance' WHERE text LIKE '%magnet%' OR text LIKE '%miracles%';
UPDATE public.affirmations SET topic = 'success' WHERE text LIKE '%universe%' OR text LIKE '%conspires%';
UPDATE public.affirmations SET topic = 'success' WHERE text LIKE '%protected%' OR text LIKE '%guided%';
UPDATE public.affirmations SET topic = 'self-love' WHERE text LIKE '%beautiful%' OR text LIKE '%gift%' OR text LIKE '%cherish%';
