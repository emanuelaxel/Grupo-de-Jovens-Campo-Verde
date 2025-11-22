import { createClient } from '@supabase/supabase-js'

// Use import.meta.env for Vite compatibility instead of process.env
// Fallback values provided for demo purposes/prevention of immediate crash
const env = (import.meta as any).env;

const supabaseUrl = env?.VITE_SUPABASE_URL || "https://your-project-id.supabase.co"
const supabaseAnonKey = env?.VITE_SUPABASE_ANON_KEY || "your-anon-key"

if (!env?.VITE_SUPABASE_URL || !env?.VITE_SUPABASE_ANON_KEY) {
  console.warn("Supabase environment variables (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY) not set.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
