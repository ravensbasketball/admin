<script>
	import { page } from '$app/state';
	let { data, form } = $props();


// console.log({playerID})
// console.log(page)
// console.log(page.form)
// console.log(page.state)
// console.log(page.params)
// console.log(page.data)


</script>

<h1>Player</h1>

<form action="?/update" method="POST">
	<input name="playerID" type="hidden" value="{ page.params.playerID }">

	<label for="givenName">Given name *</label>
	<input id="givenName" name="givenName" type="text" value="{ data.givenName }" required>

	<label for="familyName">Family name *</label>
	<input id="familyName" name="familyName" type="text" value="{ data.familyName }" required>

	<label for="kit">Shirt no</label>
	<input id="kit" name="kit" type="text" value="{ data.shirtNumber }">

	<br>
	<button>Update Player</button>
</form>
