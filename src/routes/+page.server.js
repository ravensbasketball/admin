import { supabase } from '$lib/supabaseClient';

export async function load() {
	const { data } = await supabase.from( 'players' )
		.select();

	return {
		players: data ?? [],
	};
}
