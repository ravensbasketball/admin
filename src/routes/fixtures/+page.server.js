import { supabase } from '$lib/supabaseClient';

export async function load() {
	const { data } = await supabase.from( 'fixtures' )
		.select()
		.order( 'datetime', { ascending: true } );

	return {
		fixtures: data ?? [],
	};
}
