import React from 'react';
import './teacher-page.css';
import { Header, ContentBox, Search, ListSubjects } from '../../components'
import { LoadingPage } from '../';
import { checkLogin, userControl } from '../../communication';

export default function TeacherPage(){
	const [loaded, setLoaded] = React.useState(false)

	async function onLoad(){
		const actions = {
			'error': function(){
				window.location.href = '/#/'
			}
		}

		const resp = await checkLogin()
		const action = await userControl(resp)
		if(actions[action.action] !== undefined)
			actions[action.action]()
		else
			setLoaded(true)
	}

	React.useEffect(async ()=>{
		await onLoad()
	},[])

	return(
		<div id="teacher-page" className="flexColumn fullscreen">
		{!loaded && <LoadingPage/>}
		{loaded &&
		<>
			<Header/>
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
