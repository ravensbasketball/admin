import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ( { locals: { supabase, safeGetSession } } ) => {
	const { session } = await safeGetSession()

	if ( !session ) {
		redirect( 303, '/' )
	}

	const { data } = await supabase.from( 'players' )
		.select()
		.order( 'givenName', { ascending: true } )
		.order( 'familyName', { ascending: true } );

	return { session, players: data ?? [] }
}

export const actions: Actions = {
	delete: async ( { request, locals: { supabase, safeGetSession } } ) => {
		const { session } = await safeGetSession();

		if ( !session ) {
			redirect( 303, '/' )
		}

		const formData = await request.formData();

		const playerID = formData.get( 'playerID' );

		const { error } = await supabase.from('players')
			.delete()
			.eq( 'id', playerID );

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
