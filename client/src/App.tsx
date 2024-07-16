import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import DrRegister from './pages/Doctor/Register';
import DrLogin from './pages/Doctor/Login';
import PtRegister from './pages/Patient/Register';
import PtLogin from './pages/Patient/Login';
import DrHome from './pages/Doctor/Home';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dr-register" element={<DrRegister></DrRegister>}> </Route>
        <Route path="/dr-login" element={<DrLogin></DrLogin>}></Route>
        <Route path="/pt-register" element={<PtRegister></PtRegister>}></Route>
        <Route path="pt-login" element={<PtLogin></PtLogin>}></Route>
        <Route path="/" element={<DrHome></DrHome>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
