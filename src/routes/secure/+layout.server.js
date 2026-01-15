import { supabase } from '$lib/supabaseClient';
import { redirect } from "@sveltejs/kit"

export const load = async () => {
	const { data: { user } } = await supabase.auth.getUser();

	if( !user ) {
		redirect( 303, '/signin' );
	}
}
