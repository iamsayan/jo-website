import classNames from 'classnames';
import NavBar from './navbar'
import Footer from './footer'

export default function Main({children, className, absolute = false}) {
    const classes = classNames( 'flex flex-col flex-wrap items-center justify-between', className );
  
    return (
        <>
            <NavBar />
            <main className={classes}>{children}</main>
            <Footer />
        </>
    )
}
