<script>
	let { data } = $props();

	async function deleteRecord( record ) {
		const isConfirmed = window.confirm( `Are you sure you want to delete "${record.name}"?` );

		if ( isConfirmed ) {
			const formData = new FormData();

			formData.append( 'teamID', record.id );

			const response = await fetch("?/delete", {
				method: "POST",
				body: formData,
			} );

			location.href = '/teams';
		}
	}
</script>

<h1>Teams</h1>

<p><a href="/teams/add/" class="button">Add Team</a></p>

<figure>
	<table>
		<thead>
			<tr>
				<th>Name</th>
				<th>&nbsp;</th>
			</tr>
		</thead>

		<tbody>
			{#each data.teams as team}
				<tr>
					<td><a href="/teams/{ team.id }">{ team.name }</a></td>
					<td><button onclick={ () => deleteRecord( team ) }>Delete</button></td>
				</tr>
			{/each}
		</tbody>
	</table>
</figure>
