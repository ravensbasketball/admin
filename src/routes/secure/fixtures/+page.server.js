import { supabase } from '$lib/supabaseClient';

export const load = async ( { parent }) => {
	await parent();

	const { data } = await supabase.from( 'fixtures' )
		.select()
		.order( 'datetime', { ascending: true } );

	return {
		fixtures: data ?? []
	};
}
