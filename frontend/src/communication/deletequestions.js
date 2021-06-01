export default async function deleteQuestions(subjectId, questions){
	const data = 'materia='+subjectId+'&questoes='+JSON.stringify(questions)

	const req = await fetch('/deleteQuestions.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: data
	})

	const resp = await req.json()

	return resp
}
