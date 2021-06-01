export default async function getQuestions(subjectId, theme){
	const extraReqs = {
		'all': {
			'url': 'getAllQuestions.php'
		},
		'no-theme': {
			'url': 'getNoThemeQuestions.php'
		}
	}

	const extraData = extraReqs[theme] ? '': '&tema='+theme

	console.log(extraData)

	const configs = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		body: 'materia='+subjectId+extraData
	}

	const url = extraReqs[theme] ? extraReqs[theme].url : 'getQuestions.php'

	const req = await fetch(url, configs)

	const resp = await req.json()

	return resp	
}
