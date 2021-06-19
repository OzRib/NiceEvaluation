import React from 'react';
import { ListGenerateThemes, GenerateTheme, GenerateOptions } from './';
import { Form, Button } from 'react-bootstrap';
import { getThemes, getThemesExtra, sendToGenerate } from '../communication';

export default function GenerateForm({subjectId}){
	const [temas, setTemas] = React.useState([])
	const [valorMaximo, setValorMaximo] = React.useState(0)

	async function submit(event){
		event.preventDefault()
		
		const form = event.target
		const checkTemas = form['temas']
		const haveThemes = checkTemas? checkTemas.checked: false

		const themes = {}
		
		if(haveThemes){
			for(let tema of temas){
				const nome = tema.nome
				themes[nome] = parseInt(form[nome].value)
			}
		}

		const data = {
			geral: parseInt(form['geral'].value),
			temas: themes
		}

		const resp = await sendToGenerate(data, subjectId)

		console.log(resp)

		function base64ToUint8Array(str){
			const byteStr = atob(str)

			const byteNumbers = new Array(byteStr.length)
			for(let x=0; x<byteStr.length; x++){
				byteNumbers[x] = byteStr.charCodeAt(x)
			}

			const byteArray = new Uint8Array(byteNumbers)

			return byteArray
		}

		const pdfUint8Array = base64ToUint8Array(resp.prova)

		const pdf = new Blob([pdfUint8Array], {
			type:'application/pdf'
		})

		const link = document.createElement('a')
		link.href = window.URL.createObjectURL(pdf)
		link.download = 'prova.pdf'
		link.click()
	}

	async function loadData(){
		const themes = await getThemes(subjectId)
		const themesExtra = await getThemesExtra(subjectId)

		if(!(themes.error || themesExtra.error)){
			const maxValue = themesExtra.todas
			setTemas(themes)
			setValorMaximo(maxValue)
		}

		console.log('Temas', themes)
		console.log('Extra', themesExtra)
	}

	function List({valorMaximo, temas}){
		return(
		<ListGenerateThemes
			temas={temas}
			valorMaximo={valorMaximo}
		/>
		)
	}

	React.useEffect(async ()=>{
		await loadData()
	},[])

	return(
	<div
		className="flexColumn AICenter"
	>
		<h4>
			<center>
				Opções de geração
			</center>
		</h4>
		<Form 
			name="gerar"
			onSubmit={event =>{
				submit(event)
			}}
		>
			<List
				valorMaximo={valorMaximo}
				temas={temas}
			/><br/>
			<div
				className="flexColumn JCFlexEnd AIFlexEnd"
			>
				<GenerateOptions
					temas={temas}
				/>
			</div>
		</Form>
	</div>
	)
}

