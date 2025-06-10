
-- Enable RLS on affirmations table
ALTER TABLE public.affirmations ENABLE ROW LEVEL SECURITY;

-- Enable RLS on users table  
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- RLS policies for affirmations table
-- Allow everyone to read affirmations (since they seem to be public content)
CREATE POLICY "Anyone can view affirmations" 
  ON public.affirmations 
  FOR SELECT 
  USING (true);

-- Only authenticated users can insert affirmations
CREATE POLICY "Authenticated users can create affirmations" 
  ON public.affirmations 
  FOR INSERT 
  TO authenticated
  WITH CHECK (true);

-- Only authenticated users can update affirmations
CREATE POLICY "Authenticated users can update affirmations" 
  ON public.affirmations 
  FOR UPDATE 
  TO authenticated
  USING (true);

-- Only authenticated users can delete affirmations
CREATE POLICY "Authenticated users can delete affirmations" 
  ON public.affirmations 
  FOR DELETE 
  TO authenticated
  USING (true);

-- RLS policies for users table
-- Users can only view their own profile
CREATE POLICY "Users can view their own profile" 
  ON public.users 
  FOR SELECT 
  TO authenticated
  USING (lightswitch_user_id = auth.jwt() ->> 'sub' OR id = auth.uid());

-- Users can only insert their own profile
CREATE POLICY "Users can create their own profile" 
  ON public.users 
  FOR INSERT 
  TO authenticated
  WITH CHECK (lightswitch_user_id = auth.jwt() ->> 'sub' OR id = auth.uid());

-- Users can only update their own profile
CREATE POLICY "Users can update their own profile" 
  ON public.users 
  FOR UPDATE 
  TO authenticated
  USING (lightswitch_user_id = auth.jwt() ->> 'sub' OR id = auth.uid());

-- Users can only delete their own profile
CREATE POLICY "Users can delete their own profile" 
  ON public.users 
  FOR DELETE 
  TO authenticated
  USING (lightswitch_user_id = auth.jwt() ->> 'sub' OR id = auth.uid());
