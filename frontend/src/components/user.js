import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faSave } from '@fortawesome/free-solid-svg-icons';

export default class User extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            nome: this.props.usuario.nome,
            nomeUsuario: this.props.usuario.nomeUsuario,
            email: this.props.usuario.email,
            edit: false,
            show: false
        }
    }

    handleChange(event){
        const obj = {}
        obj[event.target.name] = event.target.value
        this.setState(obj)
    }

    handleClick(){
        this.setState({edit:true})
    }

    handleClose(){
        this.setState({edit:false})
    }

    render(){
        return(
            <>
                <div className="user flexRow mh20p w100p border-rad20p po8 mt1p">
                    <div className="flexColumn w100p">
                        <h5 className="boldText">
                            {this.props.usuario.nome}
                        </h5>
                        <div className="text-muted">Nome de usuário: {this.props.usuario.nomeUsuario}</div>
			<div className="text-muted">{this.props.usuario.tipoUsuario}</div>
                    </div>
                    <Button variant="success" onClick={() => {this.handleClick()}}>
                        Editar<FontAwesomeIcon icon={faPencilAlt}/>
                    </Button>
                </div>
                <Modal show={this.state.edit} onHide={()=>{this.handleClose()}}>
                    <Modal.Body>
                        <Form name="editarUsuario">
                            <Form.Label htmlFor="nome">Nome completo</Form.Label>
                            <Form.Control 
                                type="text" 
                                name="nome" 
                                id="nome" 
                                placeholder="Insira um novo nome"
                                value={this.state.nome}
                                onChange={event => this.handleChange(event)}
                            />
                            <Form.Label htmlFor="nomeUsuario">Nome de usuário</Form.Label>
                            <Form.Control
                                type="text"
                                name="nomeUsuario"
                                id="nomeUsuario"
                                placeholder="Insira um novo nome de usuário"
                                value={this.state.nomeUsuario}
                                onChange={event => this.handleChange(event)}
                            />
                            <Form.Label htmlFor="email">Email</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                id="email"
                                placeholder="Insira um novo email"
                                value={this.state.email}
                                onChange={event => this.handleChange(event)}
                            />
                            <div
                                className="flexRow JCFlexEnd w100p"
                            >
                                <Button variant="primary mt1p">
                                    Salvar{'    '}
                                    <FontAwesomeIcon icon={faSave}/>
                                </Button>
                            </div>
                        </Form>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}
