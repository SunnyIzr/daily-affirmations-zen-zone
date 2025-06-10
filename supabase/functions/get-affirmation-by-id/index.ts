
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const affirmationId = url.searchParams.get('id');

    if (!affirmationId) {
      return new Response(
        JSON.stringify({ error: "Missing affirmation ID" }), 
        { 
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log(`Fetching affirmation with ID: ${affirmationId}`);

    // Create Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { data: affirmation, error } = await supabase
      .from('affirmations')
      .select('*')
      .eq('id', affirmationId)
      .single();

    if (error) {
      console.error('Error fetching affirmation:', error);
      return new Response(
        JSON.stringify({ error: error.message }), 
        { 
          status: error.code === 'PGRST116' ? 404 : 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    console.log('Successfully fetched affirmation:', affirmation);

    return new Response(JSON.stringify(affirmation), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error in get-affirmation-by-id function:", err);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }), 
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
