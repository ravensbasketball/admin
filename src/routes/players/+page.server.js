import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export const load = async () => {
	const { data } = await supabase.from( 'players' )
		.select()
		.order( 'givenName', { ascending: true } )
		.order( 'familyName', { ascending: true } );

	return {
		players: data ?? [],
	};
}

export const actions = {
	delete: async ( { request } ) => {
		// alert( 'Are you sure?' );

		const data = await request.formData();

		const playerID = data.get( 'playerID' );

		const { error } = await supabase.from('players')
			.delete()
			.eq( 'id', playerID );

		redirect( 303, '/players' );
	}
};
