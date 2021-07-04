import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Options, LoadingEvaluation } from './';
import { sendToGenerate } from '../communication';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

export default class GenerateOptions extends React.Component{
	initialState = {
		loadConfigs: {
			computable: false,
			percent: null
		},
		show: false,
		loaded: false,
		provaLink: undefined,
		gabaritoLink: undefined
	}

	constructor(props){
		super(props)
		const initialState = this.initialState

		this.state = {
			...initialState,
			loadConfigs: {...initialState.loadConfigs}
		}
	}

	handleClose(){
		const { provaLink, gabaritoLink } = this.state
		const initialState = this.initialState

		try{
			window.URL.revokeObjectURL(provaLink)
			window.URL.revokeObjectURL(gabaritoLink)
		}catch(err){}

		this.setState({
			...initialState,
			loadConfigs: {...initialState.loadConfigs}
		})
	}

	base64ToPdf(str){
		const byteStr = atob(str)

		const byteNumbers = new Array(byteStr.length)
		for(let x=0; x<byteStr.length; x++){
			byteNumbers[x] = byteStr.charCodeAt(x)
		}

		const byteArray = new Uint8Array(byteNumbers)

		const pdf = new Blob([byteArray], {
			type: 'application/pdf'
		})

		return pdf
	}

	getData(){
		const temas = this.props.temas

		const form = document.forms.gerar
		const checkTemas = form['temas']
		const haveThemes = checkTemas? checkTemas.checked : false
		const themes = {}

		if(haveThemes){
			for(let tema of temas){
				const nome = tema.nome
				const value = form[nome].value
				themes[nome] = parseInt(value)
			}
		}
	
		const generalQuestions = form['geral'].value

		const data = {
			geral: parseInt(generalQuestions),
			temas: themes
		}

		return data
	}

	async handleClick(){
		const loadConfigs = this.state.loadConfigs
		const data = this.getData()
		const subjectId = this.props.subjectId

		this.setState({show: true})

		const pdfs = {}
		const base64Pdfs = await sendToGenerate(subjectId, data, loadConfigs)
		for(let x in base64Pdfs){
			pdfs[x] = this.base64ToPdf(base64Pdfs[x])
		}
		const provaLink = window.URL.createObjectURL(pdfs.prova)
		const gabaritoLink = window.URL.createObjectURL(pdfs.gabarito)

		this.setState({
			provaLink: provaLink,
			gabaritoLink: gabaritoLink,
			loaded: true
		})
	}

	render(){
		const { show, loaded, provaLink, gabaritoLink, loadConfigs } = this.state

		return(
		<>
			<Button
				onClick={()=>{
					this.handleClick()
				}}
			>
				Gerar Prova{' '}
				<FontAwesomeIcon icon={faCog}/>
			</Button>
			<Modal 
				show={show}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header>
					<div className="w100p flexRow JCFlexEnd">
						<Button 
							variant="danger"
							onClick={()=>{
								this.handleClose()
							}}
						>
							Fechar
						</Button>
					</div>
				</Modal.Header>
				<Modal.Body>
					{<>
						<LoadingEvaluation
							configs={loadConfigs}
							loaded={loaded}
						/>
						<br/>
					</>}
					{loaded && 
					<Options
						links={[provaLink, gabaritoLink]}
					/>}
				</Modal.Body>
			</Modal>
		</>
		)
	}
}
