export default function ContentBox({children, className, ...props}){
    return(
        <div className={"bgcWhite mh10p p1o8 border-rad20p mt1p shadow "+className} {...props}>
            {children}
        </div>
    )
}
