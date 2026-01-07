/** @type { import( './$types' ).PageServerLoad } */

import { supabase } from '$lib/supabaseClient';

export const load = async () => {
	const { data } = await supabase.from( 'players' )
		.select()
		.order( 'givenName', { ascending: true } )
		.order( 'familyName', { ascending: true } );



	// console.log(data);



	return {
		players: data ?? [],
	};
}
