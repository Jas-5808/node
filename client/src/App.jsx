import './App.css'
import { Outlet} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import "./i18n";

function App() {

  return (
    <>
        <div className="wrapper">
          <Header />
          <div className="main">
            <Outlet />
          </div>
          <Footer />
        </div>
    </>
  )
}

export default App
