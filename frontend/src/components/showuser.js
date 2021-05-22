import React from 'react';
import { Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'; 
import { rmUser } from '../communication'

export default function ShowUser(props){
	const [show, setShow] = React.useState(false)
	const [error, setError] = React.useState(null)

	async function deleteUser(){
		const resp = await rmUser(props.usuario.email)
		
		if(!resp.deleted){
			setError(resp.error)
			setShow(true)
		}else{
			props.onSuccess('Usuário removido')
		}
	}

	return(
		<>
			<table className="w100p">
				<tr>
					<th>
						Nome:
					</th>
					<td>
						{props.usuario.nome}
					</td>
				</tr>
				<tr>
					<th>
						Nome de usuário:
					</th>
					<td>
						{props.usuario.nomeUsuario}
					</td>
				</tr>
				<tr>
					<th>
						Email:
					</th>
					<td>
						{props.usuario.email}
					</td>
				</tr>
				<tr>
					<th>
						Usuário: 
					</th>
					<td>
						{props.usuario.tipoUsuario}
					</td>
				</tr>
			</table><br/>
			<div className="flexRow JCFlexEnd">
				<Button 
					variant="danger"
					onClick={()=>{deleteUser()}}
				>
					Excluir{' '}
					<FontAwesomeIcon icon={faTrashAlt}/>
				</Button>
			</div><br/>
			<Alert variant="danger" show={show}>
				{error}
			</Alert>
		</>
	)
}
