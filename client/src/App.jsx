import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Add_pilot_role from "./Pages/Add_pilot_role"
import Home_Page from './Pages/Home_Page';
import Add_drone from './Pages/Add_drone'
import Add_employee from './Pages/Add_employee'
import Add_ingredient from './Pages/Add_ingredient';
import Add_location from './Pages/Add_location';
import Add_owner from './Pages/Add_owner';
import Add_restaurant from './Pages/Add_restaurant';
import Add_service from './Pages/Add_service';
import Add_worker_role from './Pages/Add_worker_role';
import Display_employee_view from './Pages/Display_employee_view';
import Display_ingredient_view from './Pages/Display_ingredient_view';
import Display_location_view from './Pages/Display_location_view';
import Display_owner_view from './Pages/Display_owner_view';
import Display_pilot_view from './Pages/Display_pilot_view';
import Display_service_view from './Pages/Display_service_view';
import Fire_employee from './Pages/Fire_employee';
import Fly_drone from './Pages/Fly_drone';
import Hire_employee from './Pages/Hire_employee';
import Join_swarm from './Pages/Join_swarm';
import Leave_swarm from './Pages/Leave_swarm';
import Load_drone from './Pages/Load_drone';
import Manage_service from './Pages/Manage_service';
import Purchase_ingredient from './Pages/Purchase_ingredient';
import Refuel_drone from './Pages/Refuel_drone';
import Remove_drone from './Pages/Remove_drone';
import Remove_ingredient from './Pages/Remove_ingredient';
import Remove_pilot_role from './Pages/Remove_pilot_role';

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
       <Route path='/display_employee_view' element={<Display_employee_view/>}/>
       <Route path='/display_ingredient_view' element={<Display_ingredient_view/>}/> 
       <Route path='/display_location_view' element={<Display_location_view/>}/> 
       <Route path='/display_owner_view ' element={<Display_owner_view />}/> 
       <Route path='/display_pilot_view' element={<Display_pilot_view/>}/> 
       <Route path='/display_service_view' element={<Display_service_view/>}/> 
       <Route path='/fire_employee' element={<Fire_employee/>}/> 
       <Route path='/fly_drone ' element={<Fly_drone />}/> 
       <Route path='/hire_employee' element={<Hire_employee/>}/> 
       <Route path='/join_swarm' element={<Join_swarm/>}/> 
       <Route path='/leave_swarm' element={<Leave_swarm/>}/> 
       <Route path='/load_drone' element={<Load_drone/>}/> 
       <Route path='/manage_service' element={<Manage_service/>}/> 
       <Route path='/purchase_ingredient' element={<Purchase_ingredient/>}/> 
       <Route path='/refuel_drone' element={<Refuel_drone/>}/> 
       <Route path='/remove_drone' element={<Remove_drone/>}/> 
       <Route path='/remove_ingredient' element={<Remove_ingredient/>}/> 
        <Route path='/remove_pilot_role' element={<Remove_pilot_role/>}/> 
       <Route path='/start_funding' element={<Start_funding />} />
       <Route path='/takeover_drone' element={<Takeover_drone />} />
      </Routes>
		</BrowserRouter>
  );
}

export default App