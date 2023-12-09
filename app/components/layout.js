import Main from './../components/main'
import Breadcrumbs from "./../components/breadcrumbs";
import { paytoneOne } from "@/app/fonts";

export default function Layout({ children, title }) {
    return (
        <>
            <Main>
                <div className="hero h-96" style={{backgroundImage: 'url(https://www.jagadhatrionline.co.in/wp-content/uploads/2021/07/web-bg.png)'}}>
                    <div className="hero-overlay bg-opacity-70"></div>
                    <div className="flex-col hero-content text-center text-white-content text-white p-0 pt-10">
                        <h1 className={ `text-3xl ${paytoneOne.className}` }>{ title }</h1>
                        <Breadcrumbs />
                    </div>
                </div>
                {children}
            </Main>
        </>
    )
}
