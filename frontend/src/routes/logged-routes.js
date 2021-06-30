import React from 'react';
import { Route } from 'react-router-dom';
import { Header } from '../components';
import { AdminRoutes, PrivilegedRoutes } from './';
import { checkLogin, userControl } from '../communication';
import {
	ManageUsers,
	TeacherPage,
	Subject,
	Generate,
	ShowQuestions,
	Theme,
	LoadingPage
} from '../pages';

export default function LoggedRoutes(){
	const [loaded, setLoaded] = React.useState(false)
	const [logged, setLogged] = React.useState(false)
	const [admin, setAdmin] = React.useState(false)

	async function loadData(){
		const actions = {
			'admin': function(){
				setAdmin(true)
				setLogged(true)
			},
			'user': function(){
				setAdmin(false)
				setLogged(true)
			},
			'error': function(){
				setAdmin(false)
				setLogged(false)
				window.location.href = '/#/'
			}
		}

		const resp = await checkLogin()
		const action = userControl(resp)
		if(actions[action.action] !== undefined){
			actions[action.action]()
			return true
		}
	}

	async function onLoad(){
		setLoaded(await loadData())
	}

	React.useEffect(()=>{
		onLoad()
	},[])

	return(
	<div className="flexColumn fullscreen bgcPrimary">
		{!loaded && <LoadingPage/>}
		{loaded && logged &&
		<React.Fragment>
			<Header admin={admin}/>
			<AdminRoutes admin={admin}/>
			<PrivilegedRoutes admin={admin}/>
			<Route exact path='/home/teacher-page' component={TeacherPage}/>
			<Route exact path='/home/subject/:id' component={Subject}/>
			<Route exact path='/home/subject/:id/generate' component={Generate}/>
			<Route exact path='/home/subject/:subjId/theme/:theme' component={Theme}/>
		</React.Fragment>}
	</div>
	)
}
