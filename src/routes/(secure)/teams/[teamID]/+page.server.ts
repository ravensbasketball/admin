import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ( { params, locals: { supabase, safeGetSession } } ) => {
	const { session } = await safeGetSession();

	if ( !session ) {
		redirect( 303, '/' );
	}

	const { teamID } = params;

	const { data } = await supabase.from( 'teams' )
		.select()
		.eq( 'id', teamID )
		.limit( 1 )
		.single();

	return data;
}

export const actions: Actions = {
	default: async ( { params, request, locals: { supabase, safeGetSession } } ) => {
		const { session } = await safeGetSession();

		if ( !session ) {
			redirect( 303, '/' );
		}

		const { teamID } = params;

		const formData = await request.formData();

		const name = formData.get( 'name' ) as string;

		if ( teamID === 'add' ) {
			const { error } = await supabase.from( 'teams' )
				.insert( {
					name: name.trim(),
				} );

			redirect( 303, '/teams/add' );
		} else {
			const { error } = await supabase.from( 'teams' )
				.update( {
					name: name.trim(),
				} )
				.eq( 'id', teamID );

			redirect( 303, '/teams' );
		}
	},
	signout: async ( { locals: { supabase, safeGetSession } } ) => {
		const { session } = await safeGetSession();

		if ( session ) {
			await supabase.auth.signOut();

			redirect( 303, '/' );
		}
	}
}
