import {Home, Preinv} from './pages'
import { Reset } from 'styled-reset';
import {
  BrowserRouter as Router,Routes,Route
  
} from "react-router-dom";

const App = () => {
  return (
    <>
      <Reset/>
      <Router>
        <Routes>
            <Route path='/preinv' element={<Preinv />}/>
            <Route path='/' element={<Home/>} />
        </Routes>
          
      </Router> 
    </>
  )
}

export default App