// The marketing site's only Supabase touchpoint: a plain anon-key client
// for the /website-audit intake form to insert directly into
// matjarx-platform's website_audit_requests table. No auth, no session,
// just a public, RLS-gated insert (see that table's insert policy, which
// allows anon inserts but nothing else).

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
