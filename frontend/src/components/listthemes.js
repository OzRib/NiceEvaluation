import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Theme, ContentBox } from './';
import { getThemes, getThemesExtra } from '../communication';

export default function ListThemes({id, subjectId}){
	const [loaded, setLoaded] = React.useState(false)
	const [temas, setTemas] = React.useState([])
	const [extra, setExtra] = React.useState({
		semTema:null, 
		todas:null
	})

	async function loadThemes(){
		const resp = await getThemes(subjectId)

		console.log('Temas:', resp)

		if(resp instanceof Array){
			setTemas(resp)
			return true
		}else{
			return false
		}
	}

	async function loadExtra(){
		const resp = await getThemesExtra(subjectId)

		console.log('Extra', resp)

		if(resp instanceof Object){
			setExtra(resp)
			return true
		}else{
			return false
		}
	}

	React.useEffect(async ()=>{
		const loadedThemes = await loadThemes()
		const loadedExtra = await loadExtra()
		const loaded = loadedThemes && loadedExtra

		setLoaded(loaded)
	},[])

	return(
	<ContentBox
		className="flexColumn JCCenter AICenter"
	>
		{!loaded && <Spinner animation="border" variant="danger"/>}
		{loaded && 
		<>
			<Theme
				questions={extra.todas}
				href={'/#/subject/'+subjectId+'/all'}
			>
				Todas as questões
			</Theme>
			<Theme 
				questions={extra.semTema}
				href={'/#/subject/'+subjectId+'/no-theme'}
			>
				Questões sem temas
			</Theme>
			{temas.map((obj, key)=>(
				<Theme 
					questions={obj.questoes} 
					key={key}
					href={'/#/subject/'+subjectId+'/theme/'+obj.id}
				>
					{obj.nome}
				</Theme>
			))}
		</>}
	</ContentBox>
	)
}
