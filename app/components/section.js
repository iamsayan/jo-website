import classNames from 'classnames';
import { paytoneOne } from "@/app/fonts";

export default function Section({ children, title, description, className }) {
    const classes = classNames( 'w-full flex justify-center bg-light-yellow1', className );

    return (
        <div className={classes}>
            <div className="container py-16 px-5 md:px-0">
                <div className={`flex flex-col text-center justify-around ${ paytoneOne.className }`}>
                    <div className="uppercase text-xs md:text-base text-slate-600">{title}</div>
                    <h1 className="title text-3xl md:text-4xl !leading-snug">{description}</h1>
                    <div className="divider w-10 self-center m-0 divider-warning"></div>
                </div>
                {children}
            </div>
        </div>
    )
}
