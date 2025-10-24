-- Fix vote manipulation vulnerability
-- Create atomic vote increment function
CREATE OR REPLACE FUNCTION increment_vote(
  p_category_id TEXT,
  p_category_title TEXT
)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count INTEGER;
BEGIN
  INSERT INTO votes (category_id, category_title, vote_count)
  VALUES (p_category_id, p_category_title, 1)
  ON CONFLICT (category_id)
  DO UPDATE SET vote_count = votes.vote_count + 1
  RETURNING vote_count INTO new_count;
  
  RETURN new_count;
END;
$$;

-- Grant execute permission to anonymous and authenticated users
GRANT EXECUTE ON FUNCTION increment_vote TO anon, authenticated;

-- Remove unsafe UPDATE policy that allows direct vote manipulation
DROP POLICY IF EXISTS "Anyone can update votes" ON votes;

-- Remove unsafe INSERT policy (will use function instead)
DROP POLICY IF EXISTS "Anyone can vote" ON votes;

-- Create rate limiting table for tracking subscription attempts
CREATE TABLE IF NOT EXISTS subscription_rate_limits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address TEXT NOT NULL,
  email TEXT NOT NULL,
  subscription_type TEXT NOT NULL,
  attempted_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add index for performance
CREATE INDEX IF NOT EXISTS idx_rate_limits_ip_time ON subscription_rate_limits(ip_address, attempted_at);
CREATE INDEX IF NOT EXISTS idx_rate_limits_email_time ON subscription_rate_limits(email, attempted_at);

-- Enable RLS on rate limits table
ALTER TABLE subscription_rate_limits ENABLE ROW LEVEL SECURITY;

-- Only allow service role to manage rate limits
CREATE POLICY "Service role can manage rate limits"
ON subscription_rate_limits
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);