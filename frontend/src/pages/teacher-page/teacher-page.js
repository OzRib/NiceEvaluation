import React from 'react';
import './teacher-page.css';
import { Header, ContentBox, Search, ListSubjects } from '../../components'
import { LoadingPage } from '../';
import { checkLogin, userControl } from '../../communication';

export default function TeacherPage(){
	const [loaded, setLoaded] = React.useState(false)
	const [admin, setAdmin] = React.useState(false)

	async function onLoad(){
		const actions = {
			'admin': function(){
				setAdmin(true)
				return true
			},
			'user': function(){
				setAdmin(false)
				return true
			},
			'error': function(){
				window.location.href = '/#/'
				return false
			}
		}

		const resp = await checkLogin()
		const action = await userControl(resp)
		if(actions[action.action] !== undefined)
			return actions[action.action]()
	}

	React.useEffect(async ()=>{
		setLoaded(await onLoad())
	},[])

	return(
		<div id="teacher-page" className="flexColumn fullscreen">
		{!loaded && <LoadingPage/>}
		{loaded &&
		<>
			<Header
				admin={admin}
			/>
			<ContentBox className="flexColumn">
				<Search
					name="pesquisa"
					id="pesquisa"
					placeholder="Faça aqui uma pesquisa entre as matérias"
				/>
				<h6>Matérias: </h6>
				<ListSubjects/>
			</ContentBox>
		</>}
		</div>
	)	
}
