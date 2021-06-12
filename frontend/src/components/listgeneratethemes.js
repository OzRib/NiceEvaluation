import React from 'react';
import { GenerateTheme } from './';
import { FormCheck } from 'react-bootstrap';

export default class ListGenerateThemes extends React.Component{
	constructor(props){
		super(props)
		const { temas, valorMaximo } = this.props

		this.state = {
			show: false,
			questions: 0,
			generalValue: 0,
			maxValue: valorMaximo || 0,
			themes: temas || [],
			themesValues: temas? [...temas].fill(0): []
		}
	}

	updateQuestions(){
		const { maxValue, themesValues, generalValue } = this.state

		let questions = 0

		for(let x in themesValues){
			questions+=parseInt(themesValues[x])
		}

		questions+=parseInt(generalValue)
		this.setState({questions: questions})
	}

	onChange(event){
		const { themes, themesValues, generalValue, maxValue, questions } = this.state
		const target = event.target
		const name = target.name
		const value = parseInt(target.value) || 0
		const isGeneral = name==='geral'
		
		const goingToUp = {
			'general': function(){
				return generalValue<value
			},
			'theme': function(key){
				return themesValues[key]<value
			}
		}

		const updateValue = {
			true: function(list){
				const toUp = goingToUp['general']()
				const update = maxValue>questions || !toUp

				if(update){
					list.setState({generalValue: value})
					list.forceUpdate(list.updateQuestions)
				}
			},
			false: function(list){
				var toUp = Boolean()

				themes.map((theme, key)=>{
					const label = target.labels[0]
					const themeName = label.innerText

					if(theme.nome === themeName){
						toUp = goingToUp['theme'](key)
						const update = maxValue>questions || !toUp

						if(update)
							themesValues[key] = value
					}
				})	
				const update = maxValue>questions || !toUp

				if(update){
					list.setState({themesValues: themesValues})
					list.forceUpdate(list.updateQuestions)
				}
			}
		}

		updateValue[isGeneral](this)
	}

	showThemes(event){
		const target = event.target
		const checked = target.checked

		this.setState({show: checked})
	}

	render(){
		const { show, questions, generalValue, maxValue, themes, themesValues } = this.state

		return(
		<>
			<h5>
				Total de questões: {questions}
			</h5>
			<h5>
				Máximo: {maxValue}
			</h5>
			<table>
				<GenerateTheme
					name="geral"
					value={generalValue}
					max={maxValue}
					onChange={event => {
						this.onChange(event)
					}}
				>
					Questões Gerais
				</GenerateTheme>
				{themes.length>0 && 
					<FormCheck
						label="Temas"
						name="temas"
						onChange={event => {
							this.showThemes(event)
						}}
					/>}
				{show && themes.map((theme, key)=>(
					<GenerateTheme
						key={key}
						name={theme.nome}
						value={themesValues[key]}
						min={0}
						max={theme.questoes}
						onChange={event =>{
							this.onChange(event)
						}}
					>
						{theme.nome}
					</GenerateTheme>
				))}
			</table>
		</>
		)
	}
}
