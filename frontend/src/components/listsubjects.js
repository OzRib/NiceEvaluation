import React from 'react';
import Subject from './subject';
import { Spinner } from 'react-bootstrap';

export default class ListSubjects extends React.Component{
	constructor(props){
		super(props)

		this.state = {
			loaded: false,
			data: [],
			result: []
		}
	}

	async loadData(){
		const req = await fetch('/getSubjects.php')
		const resp = await req.json()

		if(resp instanceof Array){
			this.setState({
				data: resp,
				result: resp
			})
			return true
		}else
			return false
	}

	async componentDidMount(){
		const loaded = await this.loadData()
		this.setState({loaded: loaded})

		const search = document.getElementById('pesquisa')

		search.onkeyup = event =>{
			const value = event.target.value

			function filter(element){
				const cleanedName = element.nome.toUpperCase()
				const cleanedValue = value.toUpperCase()

				return cleanedName.indexOf(cleanedValue)>=0
			}

			this.setState({result: this.state.data.filter(filter)})
		}
	}

	render(){
		return(
			<div className="flexColumn AICenter">
				{!this.state.loaded && <Spinner animation="border" variant="danger"/>}
				{this.state.loaded && this.state.result.length<=0 &&
				<>
					<div className="w100p flexColumn AICenter">
						<h5>Não há matérias correspondentes à pesquisa</h5>
					</div>
				</>
				}
				{this.state.loaded && this.state.result.length>0 &&
				<>
					{this.state.result.map((obj, key)=>(
						<Subject 
							materia={obj}
							key={key}
							id={obj.id}
						/>
					))}
				</>}
			</div>
		)
	}
}
