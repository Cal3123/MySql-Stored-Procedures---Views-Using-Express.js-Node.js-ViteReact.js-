import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Add_pilot_role from "./Pages/Add_pilot_role"
import Home_Page from './Pages/Home_Page';
import Add_drone from './Pages/Add_drone'
import Add_employee from './Pages/Add_employee'
import Add_ingredient from './Pages/Remove_pilot_role';
import Add_location from './Pages/Add_location';
import Add_owner from './Pages/Add_owner';
import Add_restaurant from './Pages/Add_restaurant';
import Add_service from './Pages/Add_service';
import Add_worker_role from './Pages/Add_worker_role';
import Start_funding from './Pages/Start_funding';
import Takeover_drone from './Pages/Takeover_drone';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
       <Route path='/' element={<Home_Page/>} />
       <Route path='*' element={<Home_Page/>} />
       <Route path='/add_drone' element={<Add_drone />} />
       <Route path='/add_employee' element={<Add_employee />} />
       <Route path='/add_ingredient' element={<Add_ingredient />} />
       <Route path='/add_location' element={<Add_location />} />
       <Route path='/add_owner' element={<Add_owner />} />
       <Route path='/add_pilot_role' element={<Add_pilot_role />} />
       <Route path='/add_restaurant' element={<Add_restaurant />} />
       <Route path='/add_service' element={<Add_service />} />
       <Route path='/add_worker_role' element={<Add_worker_role />} />
       <Route path='/start_funding' element={<Start_funding />} />
       <Route path='/takeover_drone' element={<Takeover_drone />} />
      </Routes>
		</BrowserRouter>
  );
}

export default App