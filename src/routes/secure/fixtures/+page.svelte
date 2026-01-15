<script>
	import { page } from '$app/state';
	export let data;
</script>

<h1>Fixtures ({ page.url.pathname })</h1>

<table>
	<thead>
		<tr>
			<th>Date</th>
			<th>Fixture</th>
		</tr>
	</thead>

	<tbody>
		{#each data.fixtures as fixture}
			<tr>
				<td>{ fixture.datetime }</td>
				<td>{ fixture.homeTeam } vs  { fixture.awayTeam }</td>
			</tr>
		{/each}
	</tbody>
</table>
