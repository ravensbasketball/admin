import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export async function GET() {
	const { data, error } = await supabase.from( 'players' )
		.select( 'givenName, familyName, kit' )
		.order( 'givenName', { ascending: true } )
		.order( 'familyName', { ascending: true } );

	return json( data ?? [] );
}
