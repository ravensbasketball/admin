import { supabase } from '$lib/supabaseClient';

export const load = async () => {
	const { error } = await supabase.auth.signOut();
}
