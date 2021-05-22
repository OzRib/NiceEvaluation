export default async function rmUser(email){
	const req = await fetch('/rmUser.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: `email=${email}`
	});

	const resp = await req.json()

	return resp
}
