export default async function sendToGenerate(subjectId, data, downloadCallback){
	return new Promise((resolve, reject)=>{
		const req = new XMLHttpRequest()
		req.open('POST', '/generate.php', true)
		req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
		req.responseType = 'json'

		req.addEventListener('load', ()=>{
			if(req.status !== 200){
				reject('Erro no servidor: '+req.statusText)
				return
			}

			const resp = req.response
			if(resp){
				downloadCallback['computable'] = true
				downloadCallback['percent'] = 100
				resolve(resp)
			}else{
				reject('Sem resposta')
			}
		}, false)

		req.addEventListener('progress', (archive)=>{
			if(downloadCallback){
				const computable = archive.lengthComputable
				const { loaded, total } = archive
				const percent = (loaded*100)/total

				if(computable && loaded>0){
					downloadCallback['computable'] = true
					downloadCallback['percent'] = percent
				}else{
					downloadCallback['computable'] = false
				}
			}
		})

		req.addEventListener('error', ()=>{
			reject('Erro no ajax')
		})

		const themes = data.temas? JSON.stringify(data.temas): '[]'
		const general = data.geral || '0'
		
		const dataToSend = `materia=${subjectId}&temas=${themes}&geral=${general}`

		req.send(dataToSend)
	})
}
