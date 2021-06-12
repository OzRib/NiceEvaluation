import { ThemeBadge } from './';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function ListThemeBadges({questionId, themes, onDelete}){
	return(
		<div
			className="flexRow"
			style={{
				flexWrap: 'wrap'
			}}
		>
			{themes.map((theme, key)=>{
				const variants = ['primary', 'success', 'danger', 'info', 'dark']
				const variantPosition = key%5
				const variant = variants[variantPosition]
				return(
				<>
					<ThemeBadge
						variant={variant}
						onDelete={()=>{
							onDelete(theme)
						}}
					>
						{theme}
					</ThemeBadge>
					<h6>
						<FontAwesomeIcon 
							icon={faPlus}
							className="btn-outline-success border-rado25rem"
						/>
					</h6>
				</>
				)
			})}
		</div>
	)
}
