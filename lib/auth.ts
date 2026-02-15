import { supabase } from "@/lib/supabase";

export async function signUp(email: string, password: string) {
  if (!supabase) {
    return { data: null, error: new Error("Supabase not configured") as unknown as { message: string } };
  }
  const { data, error } = await supabase.auth.signUp({ email, password });
  return { data, error: error ? { message: error.message } : null };
}

export async function signIn(email: string, password: string) {
  if (!supabase) {
    return { data: null, error: new Error("Supabase not configured") as unknown as { message: string } };
  }
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error: error ? { message: error.message } : null };
}
