import React from 'react';
import './manage-users.css';
import { Image, DropdownButton, Dropdown, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { checkLogin, userControl } from '../../communication';
import { IconLogo, ContentBox, ListUsers, AdminHeader, AddUser } from '../../components';
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

    async function logout(){
        const req = await fetch('/logout.php')

        const resp = await req.json()

        if(resp.logged === false)
            window.location.href = '/#/'
        else
            console.log(resp.error)
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
