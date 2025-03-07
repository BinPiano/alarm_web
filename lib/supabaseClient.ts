// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// 환경변수로 Supabase URL과 Anon Key를 가져옵니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
