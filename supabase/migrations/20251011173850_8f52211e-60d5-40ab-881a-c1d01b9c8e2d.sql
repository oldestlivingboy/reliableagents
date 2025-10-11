-- Fix PUBLIC_DATA_EXPOSURE: Remove overly permissive SELECT policy
-- The subscribers table should not allow public reading of email addresses
-- Admin access should be handled through backend Edge Functions

DROP POLICY IF EXISTS "Users can view their own subscriptions" ON public.subscribers;