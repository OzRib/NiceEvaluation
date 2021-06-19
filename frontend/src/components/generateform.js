import React from 'react';
import { ListGenerateThemes, GenerateTheme, GenerateOptions } from './';
import { Form, Button } from 'react-bootstrap';
import { getThemes, getThemesExtra, sendToGenerate } from '../communication';

export default function GenerateForm({subjectId}){
	const [temas, setTemas] = React.useState([])
	const [valorMaximo, setValorMaximo] = React.useState(0)

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

