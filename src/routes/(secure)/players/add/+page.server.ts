import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ( { params, locals: { supabase, safeGetSession } } ) => {
	const { session } = await safeGetSession();

	if ( !session ) {
		redirect( 303, '/' )
	}
}

export const actions: Actions = {
	add: async ( { request, locals: { supabase, safeGetSession } } ) => {
		const { session } = await safeGetSession();

		if ( !session ) {
			redirect( 303, '/' )
		}

		const formData = await request.formData();

		const givenName = formData.get( 'givenName' ) as string
		const familyName = formData.get( 'familyName' ) as string
		const kit = formData.get( 'kit' ) as string

		const { error } = await supabase.from( 'players' )
			.insert( {
				givenName: givenName.trim()
				,familyName: familyName.trim()
				,kit: kit.trim()
			} );

		if ( error ) {
			return fail( 500,
				{
					givenName
					,familyName
					,kit
				}
			)
		}

		redirect( 303, '/players/add' );
	},
	signout: async ( { locals: { supabase, safeGetSession } } ) => {
		const { session } = await safeGetSession();

		if ( session ) {
			await supabase.auth.signOut();

			redirect( 303, '/' )
		}
	}
}
