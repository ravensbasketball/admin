<script lang="ts">
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	let selectedPlayers = new Set( data.assignedPlayers.map( p => p.player_id ) );
</script>

<h1>{ data.fixture ? 'Update' : 'Add' } Fixture</h1>

{#if form?.error}
	<p class="error">{ form.error }</p>
{/if}

<form action="?/update" method="POST">
	<label for="tipoff">Tip off *</label>
	<input id="tipoff" name="tipoff" type="datetime-local" value={ data.fixture?.tipoff || '' } required>

	<label for="homeTeam">Home team *</label>
	<select id="homeTeam" name="homeTeamID" required>
		<option value="">Select a home team...</option>

		{#each data.teams as team}
			<option value={ team.id } selected={ data.fixture?.hometeam_id === team.id }>
				{ team.name }
			</option>
		{/each}
	</select>

	<label for="awayTeam">Away team *</label>
	<select id="awayTeam" name="awayTeamID" required>
		<option value="">Select an away team...</option>

		{#each data.teams as team}
			<option value={ team.id } selected={ data.fixture?.awayteam_id === team.id }>
				{ team.name }
			</option>
		{/each}
	</select>

	<label for="homeScore">Home score</label>
	<input id="homeScore" name="homeScore" type="number" value={ data.fixture?.homeScore || 0 } >

	<label for="awayScore">Away score</label>
	<input id="awayScore" name="awayScore" type="number" value={ data.fixture?.awayScore || 0 } >

	<label for="venue">Venue</label>
	<input id="venue" name="venue" type="text" value={ data.fixture?.venue || '' } >

	<label for="mapLink">Map link</label>
	<input id="mapLink" name="mapLink" type="url" value={ data.fixture?.mapLink || '' }>

	<p>
		<label for="scoresheet">
			<input id="scoresheet" name="scoresheet" type="checkbox" checked={ data.fixture?.scoresheet ?? false }>
			Score sheet
		</label>

		<label for="stats">
			<input id="stats" name="stats" type="checkbox" checked={ data.fixture?.stats ?? false }>
			Stats
		</label>
	</p>

	<label for="videoURL">Video link</label>
	<input id="videoURL" name="videoURL" type="url" value={ data.fixture?.videoURL || '' } >

	<h3>Players</h3>

	{#each data.players as player}
		<label class="player-checkbox">
			<input name="chosenPlayers" type="checkbox" value={ player.id } checked={ selectedPlayers.has( player.id ) }>
			{ player.givenName } { player.familyName }
		</label>
	{/each}

	<br>
	<button>{data.fixture ? 'Update' : 'Add'} Fixture</button>
	<a href="/fixtures">cancel</a>
</form>
