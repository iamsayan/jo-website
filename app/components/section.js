import { paytoneOne } from "@/app/fonts";
import { cn } from "@/app/utils/functions";

export default function Section({ children, title, description, className, ...props }) {
    const classes = cn( 'w-full flex justify-center', className );

    return (
        <div className={classes} {...props}>
            <div className="container py-16 px-5 lg:px-0">
                {title && <div className={`flex flex-col text-center items-center justify-around ${paytoneOne.className}`}>
                    <div className="uppercase text-xs md:text-base text-slate-600">{title}</div>
                    <h1 className="title text-3xl md:text-4xl !leading-snug text-center overflow-ellipsis overflow-hidden whitespace-nowrap max-w-[600px]">{description}</h1>
                    <div className="divider w-10 self-center m-0 divider-warning"></div>
                </div>}
                {children}
            </div>
        </div>
    )
}
