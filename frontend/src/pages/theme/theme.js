import React from 'react';
import { Header, ListQuestions } from '../../components';
import { checkLogin, userControl } from '../../communication';
import { LoadingPage } from '../';

export default function Theme({match:{params}}){
	const [loaded, setLoaded] = React.useState(false)
	const [admin, setAdmin] = React.useState(false)
	const { subjId, theme } = params

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
		const action = userControl(resp)

		if(actions[action.action] !== undefined)
			return actions[action.action]()
	}

	React.useEffect(async ()=>{
		setLoaded(await onLoad())
	},[])

	return(
		<div className="flexColumn fullscreen bgcPrimary">
			{!loaded && <LoadingPage/>}
			{loaded &&
			<>
				<Header
					admin={admin}
				/>
				<ListQuestions
					subjectId={subjId}
					theme={theme}
				/>
			</>}
		</div>
	)
}
