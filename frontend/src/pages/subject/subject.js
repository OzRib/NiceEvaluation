import React from 'react';
import './subject.css';
import { Header, Choice } from '../../components';
import { checkLogin, userControl } from '../../communication';
import { LoadingPage} from '../';

export default function Subject({match:{params}}){
	const [loaded, setLoaded] = React.useState(false)

	async function onLoad(){
		const actions = {
			'error': function(){
				window.location.href = '/#/'
			}
		}

		const resp = await checkLogin()
		const action = userControl(resp)

		if(actions[action.action] !== undefined){
			actions[action.action]()
			return false
		}else{
			return true
		}

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
