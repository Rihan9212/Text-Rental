import {Routes, Route } from 'react-router-dom'
import Home from './pages/user/Home'
import Booking from './pages/user/Booking'
import Vehicles from './pages/user/Vehicles'
import MyBooking from './pages/user/MyBooking'
import Contact from './pages/user/Contact'
import Dashboard from './pages/admin/Dashboard'
import MangeBookings from './pages/admin/MangeBookings'
import ManageVehicles from './pages/admin/ManageVehicles'
import MangeDrivers from './pages/admin/MangeDrivers'


const App = () => {
  return (
    <>
    <Routes>

      {/* users */}
        <Route path='/' element={<Home/>} />
        <Route path='/vehicles' element={<Vehicles/>} />
        <Route path='/booking/:id' element={<Booking/>} />
        <Route path='/my-bookings' element={<MyBooking/>} />
        <Route path='/contact' element={<Contact/>} />

        {/* admin */}
        <Route path='/' element={<Dashboard/>} />
        <Route path='/mange-bookings' element={<MangeBookings/>} />
        <Route path='/manage-vehicles' element={<ManageVehicles/>} />
        <Route path='/mange-driver' element={<MangeDrivers/>} />




    </Routes>
    
    
    </>
  )
}

export default App