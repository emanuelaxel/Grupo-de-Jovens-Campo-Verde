import { createClient } from '@supabase/supabase-js'

// Provide fallback values for the environment variables to prevent crashes.
// In a real production environment, these should be set securely.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-project-id.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key"

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl.includes('your-project-id')) {
  const errorMsg = "Supabase environment variables not set. Please provide NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.";
  console.error(errorMsg);
  // We don't throw an error anymore to allow the app to load, 
  // but functionality will be limited.
  // throw new Error(errorMsg);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)