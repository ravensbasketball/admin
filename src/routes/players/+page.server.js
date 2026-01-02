import { supabase } from '$lib/supabaseClient';

export async function load() {
	const { data } = await supabase.from( 'players' )
		.select()
		.order( 'givenName', { ascending: true } )
		.order( 'familyName', { ascending: true } );

	return {
		players: data ?? [],
	};
}
