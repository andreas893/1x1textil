import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://vyljehnlnqdsagpzpfbr.supabase.co"
const supabaseAnonKey = "sb_publishable_WubtwKot920KCj7Y9YOp-g_9v1owSSR"

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase