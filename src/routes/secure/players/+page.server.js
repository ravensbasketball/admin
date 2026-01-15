import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export const load = async ( { parent }) => {
	await parent();

	const { data } = await supabase.from( 'players' )
		.select()
		.order( 'givenName', { ascending: true } )
		.order( 'familyName', { ascending: true } );

	return {
		players: data ?? []
	};
}

export const actions = {
	delete: async ( { request } ) => {
		const data = await request.formData();

		const playerID = data.get( 'playerID' );

		const { error } = await supabase.from('players')
			.delete()
			.eq( 'id', playerID );

		redirect( 303, '/secure/players' );
	}
};
