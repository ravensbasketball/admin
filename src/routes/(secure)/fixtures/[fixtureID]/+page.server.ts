import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import type { Team, Fixture } from '$lib/types';

export const load: PageServerLoad = async ( { params, locals: { supabase, safeGetSession } } ) => {
	const { session } = await safeGetSession();

	if ( !session ) {
		redirect( 303, '/' )
	}

	const { data: teams, error: teamsError } = await supabase
		.from('teams')
		.select('id, name')
		.order('name');

	if ( teamsError ) {
		console.error( 'Error loading teams:', teamsError );

		return { teams: [] as Team[], fixture: null };
	}

	if ( params.fixtureID != 'add' ) {
		const { data: fixture, error: fixtureError } = await supabase
			.from( 'fixtures' )
			.select( '*' )
			.eq( 'id', params.fixtureID )
			.single();

		if ( fixtureError ) {
			console.error( 'Error loading fixture:', fixtureError );

			return { teams: teams || [], fixture: null };
		}

		return {
			teams: teams || [],
			fixture: fixture as Fixture
		};
	}

	return {
		teams: teams || [],
		fixture: null
	};
}

export const actions: Actions = {
	update: async ( { request, params, locals: { supabase, safeGetSession } } ) => {
		const { session } = await safeGetSession();

		if ( !session ) {
			redirect( 303, '/' )
		}

		const formData = await request.formData();

		const tipoff = formData.get( 'tipoff' ).trim() as string
		const homeTeamID = formData.get( 'homeTeamID' ).trim() as string
		const awayTeamID = formData.get( 'awayTeamID' ).trim() as string
		const homeScore = formData.get( 'homeScore' ).trim() as string
		const awayScore = formData.get( 'awayScore' ).trim() as string
		const venue = formData.get( 'venue' ).trim() as string
		const mapLink = formData.get( 'mapLink' ).trim() as string
		const scoresheet = formData.get( 'scoresheet' ) as string
		const stats = formData.get( 'stats' ) as string
		const videoURL = formData.get( 'videoURL' ).trim() as string

		const { fixtureID } = params;

		if ( fixtureID === 'add' ) {
			const { error } = await supabase.from( 'fixtures' )
				.insert( {
					tipoff: new Date( tipoff ),
					hometeam_id: homeTeamID,
					awayteam_id: awayTeamID,
					homeScore: homeScore,
					awayScore: awayScore,
					venue: venue,
					mapLink: mapLink,
					scoresheet: scoresheet,
					stats: stats,
					videoURL: videoURL,
				} );

			if ( error ) {
				return fail( 500,
					{
						awayTeamID
					}
				)
			}

			redirect( 303, '/fixtures/add' );
		} else {
			const { error } = await supabase.from( 'fixtures' )
				.update( {
					tipoff: new Date( tipoff ),
					hometeam_id: homeTeamID,
					awayteam_id: awayTeamID,
					homeScore: homeScore,
					awayScore: awayScore,
					venue: venue,
					mapLink: mapLink,
					scoresheet: scoresheet,
					stats: stats,
					videoURL: videoURL,
				} )
				.eq( 'id', fixtureID );

			if ( error ) {
				return fail( 500,
					{
						tipoff
						,homeTeamID
						,awayTeamID
					}
				)
			}

			redirect( 303, '/fixtures' );
		}
	},
	signout: async ( { locals: { supabase, safeGetSession } } ) => {
		const { session } = await safeGetSession();

		if ( session ) {
			await supabase.auth.signOut();

			redirect( 303, '/' )
		}
	}
}
