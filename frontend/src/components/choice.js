import { Button } from 'react-bootstrap';
import { ContentBox } from './';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faListAlt } from '@fortawesome/free-solid-svg-icons';

export default function Choice({subjectId, ...props}){
	return(
		<ContentBox
			style={{
				marginTop: '10%'
			}}
			{...props}
		>
			<Button 
				as="a"
				href={"/#/subject/"+subjectId+"/show-questions"}
				variant="outline-success"
				className="w100p"
			>
				Ver Questões{' '}
				<FontAwesomeIcon icon={faBook}/>
			</Button>
			<Button
				as="a"
				href={"/#/subject/"+subjectId+"/generate"}
				variant="outline-success"
				className="w100p mt5p"
			>
				Gerar Prova{' '}
				<FontAwesomeIcon  icon={faListAlt}/>
			</Button>
		</ContentBox>
	)
}
