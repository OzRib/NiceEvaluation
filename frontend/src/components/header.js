import React from 'react';
import { Dropdown, DropdownButton, } from 'react-bootstrap';
import IconLogo from './iconlogo';
import { logout } from '../communication';

export default function Header({admin}){
    async function handleClick(){
	const resp = await logout()
	if(resp.logged === false)
	    window.location.href = '/#/'
    }

    return(
        <div className="fullWidth flexRow AICenter bgcRoyal shadow">
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
                        <Dropdown.Item onClick={()=>{handleClick()}}>
                            Sair
                        </Dropdown.Item>
			<Dropdown.Item as="a" href='/#/home/teacher-page'>
	    		    Página dos Professores
			</Dropdown.Item>
	    		{admin===true &&
			<Dropdown.Item as="a" href="/#/home/manage-users">
	    		    Gerenciar usuários
	    		</Dropdown.Item>}
                    </DropdownButton>
                </div>
            </div>
        </div>
    )
}
