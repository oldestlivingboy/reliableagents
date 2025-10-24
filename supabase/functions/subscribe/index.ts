import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SubscribeRequest {
  email: string;
  subscription_type: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { email, subscription_type }: SubscribeRequest = await req.json();

    // Get client IP address
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';

    console.log(`Subscription attempt from IP: ${ip}, email: ${email}`);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.length > 255) {
      return new Response(
        JSON.stringify({ error: 'INVALID_EMAIL', message: 'Invalid email address' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Check rate limit - max 3 attempts per IP per hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    
    const { data: recentAttempts, error: rateLimitError } = await supabaseClient
      .from('subscription_rate_limits')
      .select('id')
      .eq('ip_address', ip)
      .gte('attempted_at', oneHourAgo);

    if (rateLimitError) {
      console.error('Rate limit check error:', rateLimitError);
    }

    if (recentAttempts && recentAttempts.length >= 3) {
      console.log(`Rate limit exceeded for IP: ${ip}`);
      return new Response(
        JSON.stringify({ 
          error: 'RATE_LIMIT_EXCEEDED', 
          message: 'Too many subscription attempts. Please try again later.' 
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Record this attempt
    await supabaseClient
      .from('subscription_rate_limits')
      .insert({
        ip_address: ip,
        email: email,
        subscription_type: subscription_type
      });

    // Attempt to insert subscription
    const { error: insertError } = await supabaseClient
      .from('subscribers')
      .insert({ email, subscription_type });

    if (insertError) {
      if (insertError.code === '23505') {
        return new Response(
          JSON.stringify({ 
            error: 'ALREADY_SUBSCRIBED', 
            message: 'This email is already subscribed' 
          }),
          { status: 409, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      console.error('Insert error:', insertError);
      throw insertError;
    }

    console.log(`Successfully subscribed: ${email}`);

    return new Response(
      JSON.stringify({ success: true, message: 'Successfully subscribed' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in subscribe function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'SERVER_ERROR', 
        message: 'An error occurred. Please try again.' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
