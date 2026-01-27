<script>
	let { data } = $props();

	async function deleteRecord( record ) {
		const isConfirmed = window.confirm( `Are you sure you want to delete ${record.givenName}?` );

		if ( isConfirmed ) {
			const formData = new FormData();

			formData.append( 'playerID', record.id );

			const response = await fetch("?/delete", {
				method: "POST",
				body: formData,
			} );

			location.href = '/players';
		}
	}
</script>

<h1>Players</h1>

<a href="/players/add/">Add Player</a>

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Shirt</th>
			<th>&nbsp;</th>
		</tr>
	</thead>

	<tbody>
		{#each data.players as player}
			<tr>
				<td>
					<a href="/players/{ player.id }">{ player.givenName } { player.familyName }</a>
				</td>
				<td>{ player.kit }</td>
				<td>
					<button onclick={ () => deleteRecord( player ) }>Delete</button>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
