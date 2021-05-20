export default async function logout(){
	const req = await fetch('/logout.php')

	const resp = await req.json()

	return resp
}
