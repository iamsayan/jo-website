import classNames from 'classnames';
import NavBar from './navbar'
import Footer from './footer'

export default function Main({ children, className }) {
  const classes = classNames( 'flex flex-col flex-wrap items-center justify-between container mx-auto py-6 px-3 text-center', className );
  
  return (
    <div className='bg-amber-50'>
      <NavBar />
      <main className={classes}>{children}</main>
      <Footer />
    </div>
  )
}
