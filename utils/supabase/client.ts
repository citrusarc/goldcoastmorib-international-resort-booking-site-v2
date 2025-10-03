import { createClient } from "@supabase/supabase-js";

// // Use service role key for server-side operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string);

export const supabase = createClient(supabaseUrl, supabaseKey);
