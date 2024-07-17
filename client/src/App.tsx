import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import DrRegister from './pages/Doctor/Register';
import DrLogin from './pages/Doctor/Login';
import PtRegister from './pages/Patient/Register';
import PtLogin from './pages/Patient/Login';
import DrHome from './pages/Doctor/Home';
import AvailablePatient from './pages/Doctor/AvailablePatient';
import AssignedPatient from './pages/Doctor/AssignedPatient';
import AvailablePdf from './pages/Doctor/AvailablePdf';
import PtHome from './pages/Patient/Home';
function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dr/register" element={<DrRegister></DrRegister>}> </Route>
        <Route path="/dr/login" element={<DrLogin></DrLogin>}></Route>
        <Route path='/dr/available-patient' element={<AvailablePatient></AvailablePatient>}></Route>
        <Route path='/dr/assigned-patient' element={<AssignedPatient></AssignedPatient>}></Route>
        <Route path='/dr/available-pdf' element={<AvailablePdf></AvailablePdf>}></Route>
        <Route path="/dr" element={<DrHome></DrHome>}></Route>
        <Route path="/pt/register" element={<PtRegister></PtRegister>}></Route>
        <Route path="pt/login" element={<PtLogin></PtLogin>}></Route>
        <Route path="/pt" element={<PtHome></PtHome>}></Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
