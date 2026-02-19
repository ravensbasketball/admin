import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'
import type { Team, Fixture } from '$lib/types';

export const load: PageServerLoad = async ( { params, locals: { supabase, safeGetSession } } ) => {
	const { session } = await safeGetSession();

	if ( !session ) {
		throw redirect( 303, '/' )
	}

	const { data: teams, error: teamsError } = await supabase
		.from( 'teams' )
		.select( 'id, name' )
		.order( 'name' );

	const { data: players, error: playersError } = await supabase
		.from( 'players' )
		.select( '*' )
		.order( 'givenName', { ascending: true } )
		.order( 'familyName', { ascending: true } );

	const { data: assignedPlayers, error: assignedPlayersError } = await supabase
		.from('fixture_players')
		.select( 'player_id' )
		.eq( 'fixture_id', params.fixtureID );

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

			return {
				teams: teams || [],
				players: players || [],
				fixture: null
			};
		}

		return {
			teams: teams || [],
			players: players || [],
			assignedPlayers: assignedPlayers || [],
			fixture: fixture as Fixture,
		};
	}

	return {
		teams: teams || [],
		players: players || [],
		assignedPlayers: assignedPlayers || [],
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

		const tipoff = formData.get( 'tipoff' ) as string
		const homeTeamID = formData.get( 'homeTeamID' ) as string
		const awayTeamID = formData.get( 'awayTeamID' ) as string
		const homeScore = formData.get( 'homeScore' ) as string
		const awayScore = formData.get( 'awayScore' ) as string
		const venue = formData.get( 'venue' ) as string
		const mapLink = formData.get( 'mapLink' ) as string
		const scoresheet = formData.get( 'scoresheet' ) as boolean
		const stats = formData.get( 'stats' ) as boolean
		const videoURL = formData.get( 'videoURL' ) as string
		const chosenPlayers = formData.getAll( 'chosenPlayers' )

		const { fixtureID } = params;

		const fixtureData = {
			tipoff: tipoff as string,
			hometeam_id: homeTeamID.trim() as string,
			awayteam_id: awayTeamID.trim() as string,
			homeScore: homeScore.trim() as string,
			awayScore: awayScore.trim() as string,
			venue: venue.trim() as string,
			mapLink: mapLink.trim() as string,
			scoresheet: scoresheet as string,
			stats: stats as string,
			videoURL: videoURL.trim() as string,
		};

		if ( fixtureID === 'add' ) {
			const { data, error } = await supabase.from( 'fixtures' )
				.insert( fixtureData )
				.select( 'id' )
				.single();

			if ( error ) {
				return fail( 500, {
					error: error.message
				} );
			}

			const fixture_players = chosenPlayers.map( chosenPlayer => ( {
				fixture_id: data.id,
				player_id: chosenPlayer
			} ) );

			const { errorPlayers } = await supabase.from( 'fixture_players' )
				.insert( fixture_players );

			throw redirect( 303, '/fixtures/add' );
		} else {
			const { error } = await supabase.from( 'fixtures' )
				.update( fixtureData )
				.eq( 'id', fixtureID );

			if ( error ) {
				return fail( 500, {
					error: error.message
				} );
			}

			const { errorPlayersDelete } = await supabase.from( 'fixture_players' )
				.delete()
				.eq( 'fixture_id', fixtureID );

			const fixture_players = chosenPlayers.map( chosenPlayer => ( {
				fixture_id: fixtureID,
				player_id: chosenPlayer
			} ) );

			const { errorPlayers } = await supabase.from( 'fixture_players' )
				.insert( fixture_players );

			if ( errorPlayers ) {
				return fail( 500, {
					error: errorPlayers.message
				} );
			}

			throw redirect( 303, '/fixtures' );
		}
	},
	signout: async ( { locals: { supabase, safeGetSession } } ) => {
		const { session } = await safeGetSession();

		if ( session ) {
			await supabase.auth.signOut();

			throw redirect( 303, '/' );
		}
	}
}
