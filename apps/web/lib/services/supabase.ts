import { createClient } from '@supabase/supabase-js';
import type { SupabaseClient as SupabaseClientType } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey && supabaseServiceKey);

// Client for frontend (uses anon key — only needs public vars)
export const supabase = !!(supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null as unknown as ReturnType<typeof createClient>;

// Admin client for server-side operations (uses service role key)
export const supabaseAdmin = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null as unknown as ReturnType<typeof createClient>;

// Type
export type SupabaseClient = SupabaseClientType;

// Test connection
export async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('resources')
      .select('id, name, type')
      .limit(5);

    if (error) throw error;
    console.log('✅ Supabase connection successful!');
    console.log('📋 Available resources:', data);
    return { success: true, data };
  } catch (error) {
    console.error('❌ Supabase connection failed:', error);
    return { success: false, error };
  }
}

// Generic insert
export async function insert(table: string, data: Record<string, unknown>) {
  const { data: result, error } = await supabaseAdmin
    .from(table)
    .insert(data)
    .select()
    .single();

  if (error) throw error;
  return result;
}

// Generic update
export async function update(table: string, id: string, data: Record<string, unknown>) {
  const { data: result, error } = await supabaseAdmin
    .from(table)
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return result;
}

// Generic delete
export async function remove(table: string, id: string) {
  const { error } = await supabaseAdmin
    .from(table)
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Get by ID
export async function getById(table: string, id: string) {
  const { data, error } = await supabaseAdmin
    .from(table)
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

// List with filters
export async function list(table: string, filters?: Record<string, unknown>) {
  let query = supabaseAdmin.from(table).select('*');

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}