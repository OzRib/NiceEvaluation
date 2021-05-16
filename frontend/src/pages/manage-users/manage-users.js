import './manage-users.css';
import { Image, DropdownButton, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

export default function ManageUsers(){
    return(
        <div id="manage-users" className="flexColumn fullscreen">
            <div id="header" className="fullWidth flexRow AICenter">
                <div className="logoIcon">
                    <FontAwesomeIcon className="book" icon={faBookOpen}/>
                    <h6 className="boldText whiteText italicText">NiceEvaluation</h6>
                </div>
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
        </div>
    )
}