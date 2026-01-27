<!--
https://youtu.be/j3aliHghr3E
https://youtu.be/d3mrdsJ0lJc

https://www.youtube.com/@HunterScript/playlists
-->

<script lang="ts">
	import { enhance } from '$app/forms'
	import type { ActionData, SubmitFunction } from './$types.js'

	interface Props {
		form: ActionData
	}

	let { form }: Props = $props()

	let loading = $state(false)

	const handleSubmit: SubmitFunction = () => {
		loading = true

		return async ( { update } ) => {
			update()
			loading = false
		}
	}
</script>

<svelte:head>
	<title>User Management</title>
</svelte:head>

<h1>Sign In</h1>

<form method="POST" use:enhance={handleSubmit}>
	{#if form?.message !== undefined}
		<div>
			{form?.message}
		</div>
	{/if}

	<label for="email">Email address</label>
	<input id="email" name="email" type="email" value={form?.email ?? ''} required>

	{#if form?.errors?.email}
		<span>
			{form?.errors?.email}
		</span>
	{/if}

	<label for="password">Password</label>
	<input id="password" name="password" type="password" value={form?.password ?? ''} required>

	<br>

	<button>
		{ loading ? 'Loading' : 'Sign In' }
	</button>
</form>

