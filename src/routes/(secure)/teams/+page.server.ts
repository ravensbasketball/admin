import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ( { locals: { supabase, safeGetSession } } ) => {
	const { session } = await safeGetSession();

	if ( !session ) {
		redirect( 303, '/' );
	}

	const { data } = await supabase.from( 'teams' )
		.select()
		.order( 'name', { ascending: true } );

	if ( data.length === 0 ) {
		redirect( 303, '/teams/add' );
	}

	return { teams: data ?? [] }
}

export const actions: Actions = {
	delete: async ( { request, locals: { supabase, safeGetSession } } ) => {
		const { session } = await safeGetSession();

		if ( !session ) {
			redirect( 303, '/' );
		}

		const formData = await request.formData();

		const teamID = formData.get( 'teamID' );

		const { error } = await supabase.from( 'teams' )
			.delete()
			.eq( 'id', teamID );

		redirect( 303, '/teams' );
	},
	signout: async ( { locals: { supabase, safeGetSession } } ) => {
		const { session } = await safeGetSession();

		if ( session ) {
			await supabase.auth.signOut();

			redirect( 303, '/' );
		}
	}
}
