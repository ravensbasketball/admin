<script>
	import { page } from '$app/state';
	export let data;
</script>

<h1>Players ({ page.url.pathname })</h1>

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
				<td>{ player.givenName } { player.familyName }</td>
				<td>{ player.kit }</td>
			</tr>
		{/each}
	</tbody>
</table>
