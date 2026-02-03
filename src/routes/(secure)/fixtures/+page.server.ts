import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ( { locals: { supabase, safeGetSession } } ) => {
	const { session } = await safeGetSession()

	if ( !session ) {
		redirect( 303, '/' )
	}

	let now = new Date();

	const { data: futureFixtures, error } = await supabase.from( 'fixtures' )
		.select()
		.gt( 'tipoff', now.toISOString() )
		.order( 'tipoff', { ascending: true } );

	const { data: pastFixtures } = await supabase.from( 'fixtures' )
		.select()
		.order( 'tipoff', { ascending: false } )
		.lt( 'tipoff', now.toISOString() );

	return { futureFixtures: futureFixtures ?? [], pastFixtures: pastFixtures ?? [] }
}

export const actions: Actions = {
	delete: async ( { request, locals: { supabase, safeGetSession } } ) => {
		const { session } = await safeGetSession();

		if ( !session ) {
			redirect( 303, '/' )
		}

		const formData = await request.formData();

		const fixtureID = formData.get( 'fixtureID' );

		const { error } = await supabase.from('fixtures')
			.delete()
			.eq( 'id', fixtureID );

		redirect( 303, '/fixtures' );
	},
	signout: async ( { locals: { supabase, safeGetSession } } ) => {
		const { session } = await safeGetSession();

		if ( session ) {
			await supabase.auth.signOut();

			redirect( 303, '/' )
		}
	}
}
