import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export async function GET() {
	const { data, error } = await supabase.from( 'fixtures' )
		.select( `
			*,
			home_team:hometeam_id( name ),
			away_team:awayteam_id( name ),
			players( givenName, familyName, kit )
		` )
		.order( 'tipoff', { ascending: true } );

	return json( data ?? [] );
}
