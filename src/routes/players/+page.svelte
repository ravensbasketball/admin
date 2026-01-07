<!--
https://youtu.be/j3aliHghr3E?si=aiGIn6Q0ytl5RXt1
https://youtu.be/d3mrdsJ0lJc?si=_waPfdFGk2dZCVcq
-->

<script>
	import { page } from '$app/state';

	let { data } = $props();
 	// $inspect( data );
</script>

<h1>Players ({ page.url.pathname })</h1>

<a href="/players/add/">Add Player</a>

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Shirt</th>
		</tr>
	</thead>

	<tbody>
		{#each data.players as player}
			<tr>
				<td><a href="/players/{ player.id }">{ player.givenName } { player.familyName }</a></td>
				<td>{ player.kit }</td>
			</tr>
		{/each}
	</tbody>
</table>
