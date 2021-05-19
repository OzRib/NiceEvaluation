import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';

export default function IconLogo(){
    return(
        <div className="logoIcon">
                <FontAwesomeIcon className="book" icon={faBookOpen}/>
                <h6 className="boldText whiteText italicText">NiceEvaluation</h6>
        </div>
    )
}