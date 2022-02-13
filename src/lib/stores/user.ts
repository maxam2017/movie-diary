import { supabase } from '$lib/supabase';
import type { User } from '@supabase/supabase-js';
import { readable } from 'svelte/store';

export const user = readable<User>(null, function start(set) {
  set(supabase.auth.user());

  supabase.auth.onAuthStateChange((evt) => {
    if (evt === 'SIGNED_IN') set(supabase.auth.user());
    if (evt === 'SIGNED_OUT') set(null);
  });
});
