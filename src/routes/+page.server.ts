import { fail, redirect } from '@sveltejs/kit'
import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ( { url, locals: { safeGetSession } } ) => {
	const { session } = await safeGetSession();

	// if the user is already logged in return them to the fixtures page
	if ( session ) {
		redirect( 303, '/fixtures' );
	}

	return { url: url.origin };
}

export const actions: Actions = {
	default: async ( event ) => {
		const {
			url,
			request,
			locals: { supabase }
		} = event

		const formData = await request.formData();

		const email = formData.get( 'email' ) as string
		const validEmail = /^[\w-\.+]+@([\w-]+\.)+[\w-]{2,8}$/.test( email );

		if ( !validEmail ) {
			return fail( 400, { errors: { email: 'Please enter a valid email address' }, email } )
		}

		const password = formData.get( 'password' ) as string

		const { data, error } = await supabase.auth.signInWithPassword( {
			email: email,
			password: password
		} );

		if ( error ) {
			return fail( 400, {
				success: false,
				email,
				message: `There was an issue, Please contact support.`
			} );
		}

		redirect( 303, '/fixtures' );
	}
}
