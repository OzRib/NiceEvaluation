import React from 'react';
import './manage-users.css';
import { checkLogin, userControl } from '../../communication';
import { ContentBox, ListUsers, AdminHeader, AddUser } from '../../components';
import { LoadingPage } from '../';

export default function ManageUsers(){
    const [loaded, setLoaded] = React.useState(false)
    async function onLoad(){
        const actions = {
            'user': function(){
                window.location.href = '/#/teacher-page'
            },
            'error': function(){
                window.location.href = '/#/'
            }
        }

        const resp = await checkLogin()
        const action = userControl(resp)
        if(actions[action.action] !== undefined)
            actions[action.action]()
	setLoaded(true)
    }

    React.useEffect(async ()=>{
	await onLoad()
    }, [])
    
    return(
        <div id="manage-users" className="flexColumn fullscreen">
	    {!loaded && <LoadingPage/>}
	    {loaded && 
	    <>
		<AdminHeader/>	
		<ContentBox className="flexColumn">
		    <AddUser/>
		</ContentBox>
		<ContentBox className="flexColumn AICenter">
		    <h6>Usuários:</h6>
                    <ListUsers/>
		</ContentBox>
	    </>}            
       </div>
    )
}
