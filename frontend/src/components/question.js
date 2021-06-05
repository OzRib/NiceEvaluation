import React from 'react';
import { Modal, Badge } from 'react-bootstrap';
import { ListThemeBadges } from './';

export default function Question({questao, position}){
	const { id, corpo, itens, resposta, temas } = questao

	const [show, setShow] = React.useState(false)
	const [themes, setThemes] = React.useState(temas)

	function deleteTheme(theme){
		console.log('deleted', theme)
	}

	return(
	<>
		<div 
			className="border-transp border-rad20p flexColumn w100p po8 mt1p"
			onClick={()=>{
				setShow(true)
			}}
		>
			<h5 className="boldText">Questão Nº {position}</h5>
			<h6
				className="text-muted"
			>
				Id da questão: {id}
			</h6>
			<h5>{corpo}</h5>
			{itens ? 
			<p>
				{Object.keys(itens).map(key =>(
				<>
					{key}) {itens[key]}<br/>
				</>
				))}
			</p>:null}
			<b>Resposta:</b>
			<p>
				{resposta}
			</p>
		</div>
		<Modal 
			show={show}
			onHide={()=>{
				setShow(false)
			}}
		>
			<Modal.Header closeButton>
				<Modal.Title>
					Questão {position}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Temas:
				<ListThemeBadges
					themes={themes}
					onDelete={theme =>{
						deleteTheme(theme)
					}}
				/>	
			</Modal.Body>
		</Modal>
	</>
	)
}
