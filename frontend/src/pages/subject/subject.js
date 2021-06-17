import React from 'react';
import './subject.css';
import { Header, Choice } from '../../components';
import { checkLogin, userControl } from '../../communication';
import { LoadingPage} from '../';

export default function Subject({match:{params}}){
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
		const action = userControl(resp)

		if(actions[action.action] !== undefined)
			return actions[action.action]()
	}

	React.useEffect(async ()=>{
		setLoaded(await onLoad())
	},[])

	return(
		<div  id="subject" className="flexColumn fullscreen">
			{!loaded && <LoadingPage/>}
			{loaded &&
			<>
				<Header/>
				<Choice 
					subjectId={params.id}	
				/>
			</>}
		</div>
	)
}
