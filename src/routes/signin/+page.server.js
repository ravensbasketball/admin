import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';

export const actions = {
	default: async ( { request } ) => {
		const form = await request.formData();

		const email = form.get( 'email' );
		const password = form.get( 'password' );

		const { data, error } = await supabase.auth.signInWithPassword( {
			email: email,
			password: password
		} );

		if( error ) {
			redirect( 303, '/signin' );
		}

		redirect( 303, '/secure/players' );
	}
};
