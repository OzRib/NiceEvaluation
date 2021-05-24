import { InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Search({...props}){
	return(
		<>
			<InputGroup>
				<InputGroup.Prepend className="mb-3 w100p">
					<InputGroup.Text>
						Pesquisar&nbsp;
						<FontAwesomeIcon icon={faSearch}/>
					</InputGroup.Text>
					<FormControl
						{...props}
					/>
				</InputGroup.Prepend>
				
			</InputGroup>
		</>
	)
}
