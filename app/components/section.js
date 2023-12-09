import Main from './../components/main'
import Breadcrumbs from "./../components/breadcrumbs";

export default function Layout({ children, title }) {
  return (
    <>
        <Main>
            <div className="hero h-96" style={{backgroundImage: 'url(https://www.jagadhatrionline.co.in/wp-content/uploads/2021/07/web-bg.png)'}}>
                <div className="hero-overlay bg-opacity-70"></div>
                <div className="flex-col hero-content text-center text-white-content text-white p-0 pt-10">
                    <h1 className="text-3xl font-bold">{ title }</h1>
                    <Breadcrumbs />
                </div>
            </div>
            <div className="w-full flex justify-center bg-white">
                <div className="container p-16">
                    <div className="flex flex-col text-center justify-around">
                        <div className="uppercase font-bold">know more</div>
                        <div className="title text-[35px] font-bold">Who We <font color="#F4C040">Are</font></div>
                        <div className="divider w-10 self-center m-0 divider-warning"></div>
                    </div>
                    {children}
                </div>
            </div>
        </Main>
    </>
  )
}
