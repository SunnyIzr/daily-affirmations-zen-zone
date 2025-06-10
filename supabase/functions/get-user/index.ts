
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const jwt = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!jwt) {
    return new Response(
      JSON.stringify({ error: "Missing JWT" }), 
      { 
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }

  const url = "https://sensa-draft-be-e0abe22a7b4d.herokuapp.com/api/v1/sdk/server/me";

  try {
    console.log("Fetching user data from external API");
    
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${jwt}`,
        "X-App-Slug": Deno.env.get("X_APP_SLUG")!,
        "X-Secret-Key": Deno.env.get("X_SECRET_KEY")!,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Failed to fetch user: ${errorText}`);
      return new Response(
        JSON.stringify({ error: `Failed to fetch user: ${errorText}` }), 
        { 
          status: res.status,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const userData = await res.json();
    console.log("Successfully fetched user data");
    
    return new Response(JSON.stringify(userData), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error fetching user:", err);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }), 
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
