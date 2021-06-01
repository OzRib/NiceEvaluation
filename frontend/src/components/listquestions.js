import React from 'react';
import { Button, FormCheck } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { ContentBox, Question } from './';
import { Spinner } from 'react-bootstrap';
import { checkLogin, userControl, getQuestions, deleteQuestions } from '../communication';

export default function ListQuestions({subjectId, theme}){
	const [loaded, setLoaded] = React.useState(false)
	const [showDel, setShowDel] = React.useState(false)
	const [del, setDel] = React.useState(false)
	const [toDel, setToDel] = React.useState([])
	const [data, setData] = React.useState([])

	async function checkAdmin(){
		const actions = {
			'admin': function(){
				setShowDel(true)
			},
			'user': function(){
				setShowDel(false)
			}
		}

		const resp = await checkLogin()
		const action = userControl(resp)
		if(actions[action.action] !== undefined)
			actions[action.action]()
	}
		
	async function loadData(){
		const resp = await getQuestions(subjectId, theme)

		console.log(resp)			

		if(resp instanceof Array){
			setData(resp)
			return true
		}else{
			return false
		}
	}

	async function onDelete(){
		const resp = await deleteQuestions(subjectId, toDel)
		
		setLoaded(await loadData())

		console.log(resp)
	}

	React.useEffect(async ()=>{
		await checkAdmin()

		setLoaded(await loadData())
	},[])

	return(
		<ContentBox className="flexColumn AICenter">
			{!loaded && <Spinner animation="border" variant="danger"/>}
			{loaded && data.length>0 && 
			<>	
				<div className="w100p flexRow JCFlexEnd">
					{del && 
					<Button variant="outline-danger"
						onClick={()=>{onDelete()}}
					>
						Remover Agora	
					</Button>}&nbsp;
					<Button variant="outline-danger"
						onClick={()=>{setDel(!del)}}
					>
						<FontAwesomeIcon icon={faTrashAlt}/>
					</Button>
				</div>
				{data.map((question, key)=>(
					<div className="w100p flexRow AICenter">
						{del && 
						<FormCheck onChange={event => {
							const { checked } = event.target
							let array = toDel
							if(checked){
								array.push(question.id)
							}else{
								array.filter((value, position)=>{
									if(value===question.id){
										delete array[position]
									}
									return true
								})
							}

							array = array.filter(value=>(value!==undefined))
							setToDel(array)
						}}/>}
						<Question
							position={key+1}
							questao={question}
						/>
					</div>
				))}
			</>
			}
			{loaded && data.length===0 && 
			<h4>
				Aqui não há questões
			</h4>}
		</ContentBox>
	)
}
