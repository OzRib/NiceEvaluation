import React from 'react';
import AddQuestionForm from './addquestionform';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default class AddQuestion extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			show: false
		}
	}

	handleClick(){
		this.setState({show:true})
	}

	handleClose(){
		this.setState({show:false})
	}

	render(){
		const show = this.state.show
		const id = this.props.subjectId

		return(
		<>
			<Button
				className="w50p"
				variant="outline-success"
				onClick={()=>{this.handleClick()}}
			>
				<FontAwesomeIcon icon={faPlus}/>{' '}
				Adicionar Questão
			</Button>
			<Modal 
				show={show} 
				onHide={()=>{this.handleClose()}}
				size="lg"
			>
				<Modal.Header closeButton>
					<Modal.Title>
						Adicionar Questão
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<AddQuestionForm
						subjectId={id}
					/>	
				</Modal.Body>
			</Modal>
		</>
		)
	}
}
