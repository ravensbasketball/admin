import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export const load = async ( event ) => {
	const { playerID } = event.params;

	const { data } = await supabase.from( 'players' )
		.select()
		.eq( 'id', playerID )
		.limit( 1 )
		.single();

	return {
		givenName: data.givenName
		,familyName: data.familyName
		,shirtNumber: data.kit
	};
};

export const actions = {
	update: async ( { request } ) => {
		const data = await request.formData();

		const playerID = data.get( 'playerID' );
		const givenName = data.get( 'givenName' );
		const familyName = data.get( 'familyName' );
		const kit = data.get( 'kit' );

		const { error } = await supabase.from('players')
			.update( {
				givenName: givenName
				,familyName: familyName
				,kit: kit
			} )
			.eq( 'id', playerID );

		redirect( 303, '/players' );
	}
};
