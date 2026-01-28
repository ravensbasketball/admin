import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ( { params, locals: { supabase, safeGetSession } } ) => {
	const { session } = await safeGetSession();

	if ( !session ) {
		redirect( 303, '/' )
	}

	const { playerID } = params;

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
}

export const actions: Actions = {
	update: async ( { request, params, locals: { supabase, safeGetSession } } ) => {
		const { session } = await safeGetSession();

		if ( !session ) {
			redirect( 303, '/' )
		}

		const formData = await request.formData();

		const givenName = formData.get( 'givenName' ) as string
		const familyName = formData.get( 'familyName' ) as string
		const kit = formData.get( 'kit' ) as string

		const { playerID } = params;

		const { error } = await supabase.from( 'players' )
			.update( {
				givenName: givenName.trim()
				,familyName: familyName.trim()
				,kit: kit.trim()
			} )
			.eq( 'id', playerID );

		if ( error ) {
			return fail( 500,
				{
					givenName
					,familyName
					,kit
				}
			)
		}

		redirect( 303, '/players' );
	},
	signout: async ( { locals: { supabase, safeGetSession } } ) => {
		const { session } = await safeGetSession();

		if ( session ) {
			await supabase.auth.signOut();

			redirect( 303, '/' )
		}
	}
}
