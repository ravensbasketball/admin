<script>
	import { page } from '$app/state';
	let { data } = $props();
</script>

<h1>Team</h1>

<form method="POST">
	<input name="teamID" type="hidden" value="{ page.params.teamID }">

	<label for="name">Name *</label>
	<input id="name" name="name" type="text" value="{ data.name }" required>

	<br>
	<button>{ page.params.teamID === 'add' ? 'Add' : 'Update' } Team</button>
	<a href="/teams">cancel</a>
</form>
