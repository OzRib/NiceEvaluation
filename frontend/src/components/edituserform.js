import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

export default class EditUserForm extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			nome: this.props.usuario.nome,
			nomeUsuario: this.props.usuario.nomeUsuario,
			email: this.props.usuario.email
		}
	}
	
	handleChange(event){
		const obj = {}
		obj[event.target.name] = event.target.value
		this.setState(obj)
	}

	handleSubmit(){

	}

	render(){
		return(
			<Form name="editarUsuario">
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
		)
	}
}
