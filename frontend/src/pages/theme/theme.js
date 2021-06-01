import React from 'react';
import { Header, ListQuestions } from '../../components';
import { checkLogin, userControl } from '../../communication';
import { LoadingPage } from '../';

export default function Theme({match:{params}}){
	const [loaded, setLoaded] = React.useState(false)
	const { subjId, theme } = params

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
		<div className="flexColumn fullscreen bgcPrimary">
			{!loaded && <LoadingPage/>}
			{loaded &&
			<>
				<Header/>
				<ListQuestions
					subjectId={subjId}
					theme={theme}
				/>
			</>}
		</div>
	)
}
