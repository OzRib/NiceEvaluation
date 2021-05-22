import React from 'react';
import { Alert } from 'react-bootstrap';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { editUser } from '../communication';

export default class EditUserForm extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			nome: this.props.usuario.nome,
			nomeUsuario: this.props.usuario.nomeUsuario,
			email: this.props.usuario.email,
			showError: false,
			error: null
		}
	}
	
	handleChange(event){
		const targetName = event.target.name
		const targetValue = event.target.value

		const newState = {}

		const calibrate = {
			'nomeUsuario': function(form){
				form.setState({email: form.props.usuario.email})
			},
			'email': function(form){
				form.setState({nomeUsuario: form.props.usuario.nomeUsuario})
			}
		}
		
		if(calibrate[targetName] !== undefined)
			calibrate[targetName](this)
			
		newState[targetName] = targetValue
		this.setState(newState)
	}

	async handleSubmit(event){
		event.preventDefault()
		const form = event.target
		
		const resp = await editUser(form)

		if(resp.edited)
			this.props.onSuccess('Usuário atualizado com sucesso')
		else{
			this.setState({
				error: resp.error,
				showError: true
			})
		}
	}

	render(){
		return(
			<>
				<Alert 
					variant="danger"
					show={this.state.showError}
				>
					{this.state.error}
				</Alert>
				<Form name="editarUsuario" onSubmit={event => this.handleSubmit(event)}>
					<Form.Label htmlFor="nome">Nome completo</Form.Label>
					<Form.Control
						type="nome"
						name="nome"
						id="nome"
						placeholder="Insira um novo nome"
						value={this.state.nome}
						onChange={event => this.handleChange(event)}
					/>
					<Form.Label htmlFor="nomeUsuario">Nome de usuário</Form.Label>
					<Form.Control
						type="nomeUsuario"
						name="nomeUsuario"
						id="nomeUsuario"
						placeholder="Insira um novo nome de usuário"
						value={this.state.nomeUsuario}
						onChange={event => this.handleChange(event)}
					/>
					<Form.Label htmlFor="email">Email</Form.Label>
					<Form.Control
						type="email"
						name="email"
						id="email"
						placeholder="Insira um novo email"
						value={this.state.email}
						onChange={event => this.handleChange(event)}
					/><br/>
					<div className="flexRow w100p JCFlexEnd">
						<Button variant="primary" type="submit">
							Salvar{' '}
							<FontAwesomeIcon icon={faSave}/>
						</Button>
					</div>
				</Form>
			</>
		)
	}
}
