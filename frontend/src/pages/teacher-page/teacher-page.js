import './teacher-page.css';
import { Header, ContentBox, Search, ListSubjects } from '../../components'

export default function TeacherPage(){
	return(
		<div id="teacher-page" className="flexColumn fullscreen">
			<Header/>
			<ContentBox className="flexColumn">
				<Search
					name="pesquisa"
					id="pesquisa"
					placeholder="Faça aqui uma pesquisa entre as matérias"
				/>
				<h6>Matérias: </h6>
				<ListSubjects/>
			</ContentBox>
		</div>
	)	
}
