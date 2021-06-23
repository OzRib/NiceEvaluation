import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Theme, ContentBox } from './';
import { getThemes, getThemesExtra } from '../communication';

export default class ListThemes extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			loaded: false,
			temas: [],
			extra: {
				semTema: null,
				todas: null
			}
		}
	}

	async loadThemes(){
		const subjectId = this.props.subjectId
		const resp = await getThemes(subjectId)

		console.log('Temas:', resp)

		if(resp instanceof Array){
			this.setState({temas:resp})
			return true
		}else{
			return false
		}
	}

	async loadExtra(){
		const subjectId = this.props.subjectId
		const resp = await getThemesExtra(subjectId)

		console.log('Extra', resp)

		if(resp instanceof Object){
			setExtra(resp)
			return true
		}else{
			return false
		}
	}

	async loadData(){
		const loadedThemes = await this.loadThemes()
		const loadedExtra = await this.loadExtra()
		const loaded = loadedThemes && loadedExtra

		this.setState({loaded:loaded})
	}

	componentDidMount(){
		document.addEventListener('reload', ()=>{
			this.loadData()
			this.forceUpdate()
		})
		this.loadData()
	}

	render(){
		const subjectId = this.props.subjectId
		const { loaded, temas, extra } = this.state
		return(
		<ContentBox
			className="flexColumn JCCenter AICenter"
		>
			{!loaded && <Spinner animation="border" variant="danger"/>}
			{loaded && 
			<>
				<Theme
					questions={extra.todas}
					href={'/#/subject/'+subjectId+'/theme/all'}
				>
					Todas as questões
				</Theme>
				<Theme 
					questions={extra.semTema}
					href={'/#/subject/'+subjectId+'/theme/no-theme'}
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
}
