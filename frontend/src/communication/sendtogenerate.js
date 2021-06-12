export default async function sendToGenerate(data, subjectId){
	const themes = data.temas? JSON.stringify(data.temas): '' 
	const general = data.geral || ''

	const dataToSend = `materia=${subjectId}&temas=${themes}&geral=${general}`

	const req = await fetch('/generate.php', {
		method: 'POST',
		headers:{
			'Content-Type': 'application/json'
		},
		body: dataToSend
	})

	const resp = await req.json()

	return resp
}
