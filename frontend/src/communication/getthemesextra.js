export default async function getThemesExtra(subjectId){
	const data = 'materia='+subjectId

	const req = await fetch('/getThemesExtra.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body:data
	})

	const resp = await req.json()

	return resp
}
