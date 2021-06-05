import { ThemeBadge } from './';

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
					<ThemeBadge
						variant={variant}
						onDelete={()=>{
							onDelete(theme)
						}}
					>
						{theme}
					</ThemeBadge>
				)
			})}
		</div>
	)
}
