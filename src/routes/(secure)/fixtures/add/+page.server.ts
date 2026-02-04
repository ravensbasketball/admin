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

		const tipoff = formData.get( 'tipoff' ) as string
		const homeTeam = formData.get( 'homeTeam' ) as string
		const awayTeam = formData.get( 'awayTeam' ) as string
		const homeScore = formData.get( 'homeScore' ) as string
		const awayScore = formData.get( 'awayScore' ) as string
		const venue = formData.get( 'venue' ) as string
		const mapLink = formData.get( 'mapLink' ) as string
		const scoresheet = formData.get( 'scoresheet' ) as string
		const stats = formData.get( 'stats' ) as string
		const videoURL = formData.get( 'videoURL' ) as string

		const { error } = await supabase.from( 'fixtures' )
			.insert( {
				tipoff: new Date( tipoff.trim() ),
				homeTeam: homeTeam.trim(),
				awayTeam: awayTeam.trim(),
				homeScore: homeScore.trim(),
				awayScore: awayScore.trim(),
				venue: venue.trim(),
				mapLink: mapLink.trim(),
				scoresheet: scoresheet,
				stats: stats,
				videoURL: videoURL.trim(),
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

		redirect( 303, '/fixtures/add' );
	},
	signout: async ( { locals: { supabase, safeGetSession } } ) => {
		const { session } = await safeGetSession();

		if ( session ) {
			await supabase.auth.signOut();

			redirect( 303, '/' )
		}
	}
}
