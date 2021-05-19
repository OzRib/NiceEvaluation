import React from 'react';
import './manage-users.css';
import { Image, DropdownButton, Dropdown, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { checkLogin, userControl } from '../../communication';
import { IconLogo, ContentBox } from '../../components';

export default function ManageUsers(){
    const [infos, setInfos] = React.useState(<Spinner animation="border" variant="danger"/>)  
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
    }

    async function logout(){
        const req = await fetch('/logout.php')

        const resp = await req.json()

        if(resp.logged === false)
            window.location.href = '/#/'
        else
            console.log(resp.error)
    }

    onLoad()
    return(
        <div id="manage-users" className="flexColumn fullscreen">
            <div id="header" className="fullWidth flexRow AICenter shadow">
                <IconLogo/>
                <div 
                    className="perfil flexRow w100p JCFlexEnd"
                >
                    <div className="flexRow mh2p">
                        <DropdownButton 
                            variant="success" 
                            title="Minha Conta" 
                            className="mh2p"
                            menuAlign="right"
                        >
                            <Dropdown.Item onClick={logout}>
                                Sair
                            </Dropdown.Item>
                        </DropdownButton>
                        <Image 
                            src="https://lh3.google.com/u/0/ogw/ADGmqu-29XApp4ZRMCdtbI14go0QlAt40j9XeCue7tyy=s32-c-mo" 
                            height="40rem" 
                            width="40rem"
                            roundedCircle
                            className="mh2p"
                        />
                    </div>
                </div>
            </div>
            <ContentBox className="flexColumn">
                <Button variant="outline-success w100p" className="w100p">
                    <FontAwesomeIcon icon={faPlus}/>{'  '}
                    Adicionar Usuário
                </Button>            
            </ContentBox>
            <ContentBox className="flexColumn AICenter">
                {infos}
            </ContentBox>            
       </div>
    )
}