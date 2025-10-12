-- Create votes table for real-time voting on leaderboard categories
CREATE TABLE IF NOT EXISTS public.votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  category_id TEXT NOT NULL,
  category_title TEXT NOT NULL,
  vote_count INTEGER NOT NULL DEFAULT 1
);

-- Enable RLS
ALTER TABLE public.votes ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read votes (for real-time updates)
CREATE POLICY "Anyone can view votes"
ON public.votes
FOR SELECT
TO anon, authenticated
USING (true);

-- Allow anyone to insert votes (upsert will be handled in code)
CREATE POLICY "Anyone can vote"
ON public.votes
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow anyone to update vote counts
CREATE POLICY "Anyone can update votes"
ON public.votes
FOR UPDATE
TO anon, authenticated
USING (true)
WITH CHECK (true);

-- Create unique index on category_id for efficient lookups and preventing duplicates
CREATE UNIQUE INDEX IF NOT EXISTS idx_votes_category_id ON public.votes(category_id);

-- Enable realtime for votes table
ALTER PUBLICATION supabase_realtime ADD TABLE public.votes;