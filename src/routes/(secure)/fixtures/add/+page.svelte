<script>
	import { page } from '$app/state';
	let { data } = $props();
</script>

<h1>Fixture</h1>

<form action="?/add" method="POST">
	<input name="fixtureID" type="hidden" value="{ page.params.fixtureID }">

	<label for="tipoff">Tip off *</label>
	<input id="tipoff" name="tipoff" type="datetime-local" value="{ data.tipoff }" required>

	<label for="homeTeam">Home team *</label>
	<input id="homeTeam" name="homeTeam" type="text" value="{ data.homeTeam }" required>

	<label for="awayTeam">Away team *</label>
	<input id="awayTeam" name="awayTeam" type="text" value="{ data.awayTeam }" required>

	<label for="homeScore">Home score *</label>
	<input id="homeScore" name="homeScore" type="number" value="{ data.homeScore }" required>

	<label for="awayScore">Away score *</label>
	<input id="awayScore" name="awayScore" type="number" value="{ data.awayScore }" required>

	<label for="venue">Venue *</label>
	<input id="venue" name="venue" type="text" value="{ data.venue }" required>

	<label for="mapLink">Map link *</label>
	<input id="mapLink" name="mapLink" type="url" value="{ data.mapLink }" required>

	<label for="scoresheet">Score sheet</label>
	<input id="scoresheet" name="scoresheet" type="checkbox" value="{ data.scoresheet }">

	<label for="stats">Stats</label>
	<input id="stats" name="stats" type="checkbox" value="{ data.stats }">

	<label for="videoURL">Video link</label>
	<input id="videoURL" name="videoURL" type="url" value="{ data.videoURL }">

	<br>
	<button>Add Fixture</button>
	<a href="/fixtures">cancel</a>
</form>
