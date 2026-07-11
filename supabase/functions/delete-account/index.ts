// ============================================================
// delete-account — Supabase Edge Function
//
// Permanently deletes the CALLING user's auth account. Because every
// user-owned table references auth.users(id) with ON DELETE CASCADE,
// removing the auth user also wipes their trips, experiences, ratings,
// notes, challenge progress, and ride logs.
//
// Security model:
//   - The user id is taken from the verified JWT, never from the request
//     body — a caller can only ever delete THEIR OWN account.
//   - The service-role key lives only in the function's environment
//     (auto-injected by Supabase). It is never sent to the browser.
//
// Deploy:  supabase functions deploy delete-account
// (JWT verification is on by default, which is what we want.)
// ============================================================

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

Deno.serve(async (req) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing authorization header' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
    const ANON_KEY     = Deno.env.get('SUPABASE_ANON_KEY')!
    const SERVICE_KEY  = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    // 1. Verify the caller and derive their id from the token (not the body).
    const userClient = createClient(SUPABASE_URL, ANON_KEY, {
      global: { headers: { Authorization: authHeader } },
    })
    const { data: { user }, error: userErr } = await userClient.auth.getUser()

    if (userErr || !user) {
      return new Response(JSON.stringify({ error: 'Invalid or expired session' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // 2. Delete the auth user with admin privileges — cascades to all data.
    const admin = createClient(SUPABASE_URL, SERVICE_KEY)
    const { error: delErr } = await admin.auth.admin.deleteUser(user.id)

    if (delErr) {
      console.error('deleteUser failed:', delErr)
      return new Response(JSON.stringify({ error: 'Could not delete account' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (e) {
    console.error('Unexpected error:', e)
    return new Response(JSON.stringify({ error: 'Unexpected error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
