import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'; 

export default function ShowUser(props){
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
				<Button variant="danger">
					Excluir{' '}
					<FontAwesomeIcon icon={faTrashAlt}/>
				</Button>
			</div>
		</>
	)
}
