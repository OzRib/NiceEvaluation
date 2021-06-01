import React from 'react';
import { Header, ContentBox, AddQuestion, ListThemes } from '../../components';
import { LoadingPage } from '../';
import { checkLogin, userControl } from '../../communication';

export default function ShowQuestions({match:{params}}){
	const [loaded, setLoaded] = React.useState(false)
	const [showAdd, setShowAdd] = React.useState(false)

	async function onLoad(){
		const actions = {
			'admin': function(){
				setShowAdd(true)
			},
			'user': function(){
				setShowAdd(false)
			}
		}

		const redirect = {
			'error': '/#/'
		}

		const resp = await checkLogin()
		const action = userControl(resp)
		if(actions[action.action] !== undefined){
			actions[action.action]()
			setLoaded(true)
			return true
		}else{
			window.location.href = redirect[action.action]
			return false
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
			{showAdd &&
			<ContentBox>
				<AddQuestion
					subjectId={params.id}
				/>
			</ContentBox>}
			<ListThemes
				subjectId={params.id}
			/>
		</>}
		</div>
	)
}
