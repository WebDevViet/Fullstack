import Content from './Content'
import Footer from './Footer'
import './Layout.css'

export default function Layout() {
  return (
    <>
      <div className='navbar'>Nav Bar</div>
      <div className='layout'>
        <div className='side__nav'>
          <h3 className='side__nav-title'>Side Nav</h3>
        </div>
        <Content />
      </div>
      <Footer />
    </>
  )
}
