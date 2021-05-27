export default async function getThemes(subjectId){
	const data = 'materia='+subjectId

	const req = await fetch('/getThemes.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: data
	})

	const resp = await req.json()

	return resp
}
