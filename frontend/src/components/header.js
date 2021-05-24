import { Image, Dropdown, DropdownButton, } from 'react-bootstrap';
import IconLogo from './iconlogo';
import { logout } from '../communication';

export default function Header(){
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
                    </DropdownButton>
                    <Image 
                        src="https://avatars.githubusercontent.com/u/73843439?s=48&v=4" 
                        height="40rem" 
                        width="40rem"
                        roundedCircle
                        className="mh2p"
                    />
                </div>
            </div>
        </div>
    )
}
