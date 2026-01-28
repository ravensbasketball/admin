<h1>Players</h1>

<form action="?/add" method="POST">
	<label for="givenName">Given name *</label>
	<input id="givenName" name="givenName" type="text" required>

	<label for="familyName">Family name *</label>
	<input id="familyName" name="familyName" type="text" required>

	<label for="kit">Shirt no</label>
	<input id="kit" name="kit" type="text">

	<br>

	<button>Add Player</button>
	<a href="/players">cancel</a>
</form>
