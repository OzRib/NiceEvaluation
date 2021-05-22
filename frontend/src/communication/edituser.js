export default async function editUser(user){
	const req = await fetch('/editUser.php', {
		method: 'POST',
		body: new FormData(user)
	})

	const resp = await req.json()

	return resp
}
