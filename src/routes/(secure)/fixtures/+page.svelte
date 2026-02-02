<script>
	let { data } = $props();

	const formatDate = new Intl.DateTimeFormat( 'en-GB', {
		weekday: 'short',
		day: 'numeric',
		month: 'short',
		year: 'numeric'
	} );

	const formatTipoff = new Intl.DateTimeFormat( 'en-GB', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true
	} );

	async function deleteRecord( record ) {
		const isConfirmed = window.confirm( `Are you sure you want to delete ${record.tipoff}?` );

		if ( isConfirmed ) {
			const formData = new FormData();

			formData.append( 'playerID', record.id );

			const response = await fetch("?/delete", {
				method: "POST",
				body: formData,
			} );

			location.href = '/fixtures';
		}
	}
</script>

<h1>Future Fixtures</h1>

<figure>
	<table>
		<thead>
			<tr>
				<th>Date</th>
				<th>Tip Off</th>
				<th>Home vs Away</th>
				<th>&nbsp;</th>
			</tr>
		</thead>

		<tbody>
			{#each data.futureFixtures as fixture}
				<tr>
					<td>{ formatDate.format( new Date( fixture.tipoff ) ) }</td>
					<td>{ formatTipoff.format( new Date( fixture.tipoff ) ) }</td>
					<td><a href="/fixtures/{ fixture.id }">{ fixture.homeTeam } vs { fixture.awayTeam }</a></td>
					<td><button onclick={ () => deleteRecord( fixture ) }>Delete</button></td>
				</tr>
			{/each}
		</tbody>
	</table>
</figure>

<h2>Past Fixtures</h2>

<figure>
	<table>
		<thead>
			<tr>
				<th>Date</th>
				<th>Tip Off</th>
				<th>Home vs Away</th>
				<th>&nbsp;</th>
			</tr>
		</thead>

		<tbody>
			{#each data.pastFixtures as fixture}
				<tr>
					<td>{ formatDate.format( new Date( fixture.tipoff ) ) }</td>
					<td>{ formatTipoff.format( new Date( fixture.tipoff ) ) }</td>
					<td><a href="/fixtures/{ fixture.id }">{ fixture.homeTeam } vs { fixture.awayTeam }</a></td>
					<td><button onclick={ () => deleteRecord( fixture ) }>Delete</button></td>
				</tr>
			{/each}
		</tbody>
	</table>
</figure>
