import { Image, Dropdown, DropdownButton, } from 'react-bootstrap';
import IconLogo from './iconlogo';
import { logout } from '../communication';

export default function AdminHeader(){
    return(
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
