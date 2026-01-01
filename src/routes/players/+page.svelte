<script>
	import { page } from '$app/state';
	export let data;
</script>

<h1>Players</h1>

<ul>
	<li>here</li>
	{#each data.players as player}
		<li>{player.givenName}</li>
	{/each}
</ul>


<h1>Route - { page.url.pathname }</h1>
