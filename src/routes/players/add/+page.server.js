import { supabase } from '$lib/supabaseClient';

export const actions = {
	default: async ( { request } ) => {
		const data = await request.formData();

		const givenName = data.get( 'givenName' );
		const familyName = data.get( 'familyName' );
		const kit = data.get( 'kit' );

		const { error } = await supabase.from( 'players' )
			.insert( {
				givenName: givenName
				,familyName: familyName
				,kit: kit
			} );
	}
};
