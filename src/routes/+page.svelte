<script>
	import { page } from '$app/state';
	export let data;
</script>

<h1>Players</h1>

<ul>
	{#each data.players as player}
		<li>{player.givenName}</li>
	{/each}
</ul>


<h1>Route - { page.url.pathname }</h1>
