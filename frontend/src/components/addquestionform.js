import React from 'react';
import { addQuestion } from '../communication';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faShare } from '@fortawesome/free-solid-svg-icons';
import { Form, Button, InputGroup, ListGroup } from 'react-bootstrap';

export default class AddQuestionForm extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			showItems: false,
			items: []
		}
	}

	addItem(){
		const input = document.getElementById('item')
		const item = input.value
		const items = this.state.items
		if(item){
			items.push(item)
			this.setState({items: items})
			input.value = ''
		}
	}

	rmItem(){
		const items = this.state.items
		items.pop()
		this.setState({items: items})
	}

	async handleSubmit(event){
		event.preventDefault()
		const form = event.target
		const items = this.state.items
		const id = this.props.subjectId

		const resp = await addQuestion(form, items, id)
		
		console.log(resp)
	}
	
	handleShowItems(){
		const showItems = this.state.showItems
		this.setState({showItems: !showItems})
	}

	render(){
		const { showItems, items } = this.state

		function letter(number){
			const letter = String.fromCharCode(number+97)

			return letter
		}
		
		return(
		<Form name="addQuestion" onSubmit={event =>{this.handleSubmit(event)}}>
			<Form.Label htmlFor="corpo">
				Corpo:
			</Form.Label>
			<Form.Control
				as="textarea"
				name="corpo"
				id="corpo"
				placeholder="Crie o enunciado da questão aqui"
			/><br/>
			<Form.Check
				type="checkbox"
				id="checkItems"
				label="Itens"
				onChange={()=>{this.handleShowItems()}}
			/>
			{showItems ? 
			<>
				{items.length>0 ?
				<table className="border-rado25rem border-transp w100p flexColumn">
					{items.map((item, key)=>(
						<tr>
							<td className="pho8">
								{letter(key)})
							</td>
							<td className="w100p">
								{item}
							</td>
							<td>
								<Button
									variant="outline-danger"
									onClick={()=>{this.rmItem()}}
								>
									<FontAwesomeIcon icon={faMinus}/>
								</Button>
							</td>
						</tr>
					))}
				</table>:null}
				<InputGroup>
					<InputGroup.Prepend>
						<InputGroup.Text>
							{letter(items.length)})
						</InputGroup.Text>
					</InputGroup.Prepend>
					<Form.Control
						type="text"
						name="item"
						id="item"
						placeholder="Insira aqui o texto do item"
					/>
					<InputGroup.Append>
						<Button
							variant="outline-success"
							onClick={()=>{this.addItem()}}
						>
							<FontAwesomeIcon icon={faPlus}/>
						</Button>
					</InputGroup.Append>
				</InputGroup>
			</>:null}<br/>
			<Form.Label htmlFor="resposta">
				Resposta:
			</Form.Label>
			<Form.Control
				as="textarea"
				name="resposta"
				id="resposta"
				placeholder="Insira aqui a resposta da questão"
			/><br/>
			<div
				className="flexRow w100p JCFlexEnd"
			>
				<Button
					variant="primary"
					type="submit"
				>
					Enviar{' '}
					<FontAwesomeIcon icon={faShare}/>
				</Button>
			</div>
		</Form>
		)
	}
}
