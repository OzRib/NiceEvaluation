import React from 'react';
import './teacher-page.css';
import { Header, ContentBox, Search, ListSubjects } from '../../components'
import { LoadingPage } from '../';
import { checkLogin, userControl } from '../../communication';

export default function TeacherPage(){
	const [loaded, setLoaded] = React.useState(false)
	const [admin, setAdmin] = React.useState(false)

	return(
		<React.Fragment>
			<ContentBox className="flexColumn">
				<Search
					name="pesquisa"
					id="pesquisa"
					placeholder="Faça aqui uma pesquisa entre as matérias"
				/>
				<h6>Matérias: </h6>
				<ListSubjects/>
			</ContentBox>
		</React.Fragment>
	)	
}
