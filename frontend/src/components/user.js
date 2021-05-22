import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import EditUserForm from './edituserform.js';
import ShowUser from './showuser';

export default function User(props){
    const [edit, setEdit] = React.useState(false)
    const [show, setShow] = React.useState(false)

    function success(message){
	props.onSuccess(message)
    }

    return(
        <>
            <div 
	        className="user flexRow mh20p w100p border-rad20p po8 mt1p focus bgcWhite"
	    >
		<div 
	    	    className="flexColumn w100p"
	    	    onClick={()=>{
			setShow(true)
		    }}
	        >
		    <h5 className="boldText">
			{props.usuario.nome}
		    </h5>
		    <div className="text-muted">Nome de usuário: {props.usuario.nomeUsuario}</div>
		    <div className="text-muted">{props.usuario.tipoUsuario}</div>
		</div>
		<Button 
	    	    variant="success" 
	    	    onClick={()=>{
		        setEdit(true)
		    }}
	        >
		    Editar
		    <FontAwesomeIcon icon={faPencilAlt}/>
		</Button>
	    </div>
	    <Modal 
	        show={edit} 
		onHide={()=>{
		    setEdit(false)
		}}
	    >
 		<Modal.Header>
		    <Modal.Title>Editar usuário</Modal.Title>
		</Modal.Header>
		<Modal.Body>
		    <EditUserForm 
	    		usuario={props.usuario}
	    		onSuccess={
			    message =>{
				setEdit(false)
				success(message)
			    
			    }
			}
	    	    />
		</Modal.Body>
	    </Modal>
	    <Modal
		show={show}
	    	onHide={()=>{
		    setShow(false)
		}}
	    >
	        <Modal.Header>
		    <Modal.Title>{props.usuario.nome}</Modal.Title>
	        </Modal.Header>
	    	<Modal.Body>
		    <ShowUser 
	    		usuario={props.usuario} 
	    		onSuccess={message =>{
			    setShow(false)
			    success(message)
			}}
	    	    />
	        </Modal.Body>
	    </Modal>
	</>
    )
}

