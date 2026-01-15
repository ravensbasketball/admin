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
