import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave } from '@fortawesome/free-solid-svg-icons';

export default function AddUser(){
    const [show, setShow] = React.useState(false)
    function handleClick(){
        setShow(true)
    }

    function handleClose(){
        setShow(false)
    }

    async function handleSubmit(event){
        event.preventDefault()
        const form = event.target

        const req = await fetch('/addUser.php', {
		method: 'POST',
		body: new FormData(form)
	})

        const resp = await req.text()
        console.log(resp) 
    }

    return(
        <>
            <Button className="w100p" variant="outline-success" onClick={()=>{handleClick()}}>
                <FontAwesomeIcon icon={faPlus}/>{'  '}
                Adicionar Usuário
            </Button>
            <Modal show={show} onHide={()=>{handleClose()}}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Adicionar Usuário
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form name="addUser" onSubmit={event => {handleSubmit(event)}}>
                        <Form.Label htmlFor="nome">Nome Completo</Form.Label>
                        <Form.Control 
                            type="text"
                            name="nome"
                            id="nome"
                            placeholder="Insira aqui o nome completo do usuário"
                        />
                        <Form.Label htmlFor="nomeUsuario">Nome de Usuário</Form.Label>
                        <Form.Control
                            type="text"
                            name="nomeUsuario"
                            id="nomeUsuario"
                            placeholder="Insira aqui o nome de usuário"
                        />
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control
                            type="text"
                            name="email"
                            id="email"
                            placeholder="Insira aqui o email do usuário"
                        />
                        <Form.Label htmlFor="senha">Senha</Form.Label>
                        <Form.Control
                            type="password"
                            name="senha"
                            id="senha"
                            placeholder="Insira aqui a senha do usuário"
                        /><br/>
                        <div className="w100p flexColumn AICenter">
                            <div>
                                <Form.Check
                                    type="radio"
                                    id="Administrador"
                                    label="Administrador"
                                    name="admin"
                                    value={1}
                                />
                                <Form.Check
                                    type="radio"
                                    id="Professor"
                                    label="Professor"
                                    name="admin"
                                    value={0}
                                />
                            </div>
                            <div className="w100p flexRow JCFlexEnd">
                                <Button variant="success" type="submit">
                                    Criar{' '}
                                    <FontAwesomeIcon icon={faSave}/>
                                </Button>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}
