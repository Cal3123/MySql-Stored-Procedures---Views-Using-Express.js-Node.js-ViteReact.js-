import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Add_pilot_role from "./Pages/Add_pilot_role"
import Home_Page from './Pages/Home_Page';
import Add_drone from './Pages/Add_drone'
import Add_employee from './Pages/Add_employee'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
       <Route path='/' element={<Home_Page/>} />
       <Route path='/add_pilot_role' element={<Add_pilot_role />} />
       <Route path='/add_drone' element={<Add_drone />} />
      </Routes>
		</BrowserRouter>
  );
}

export default App