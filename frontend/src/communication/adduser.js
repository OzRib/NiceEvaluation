export default async function addUser(user){
	const req = await fetch('/addUser.php', {
		method: 'POST',
		body: new FormData(user)
	})

	const resp = await req.json()

	return resp

}
