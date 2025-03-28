import './App.css'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Pagenotfound from './Pages/Client/Pagenotfound'
import Homepage from './Pages/Client/Homepage'
import Cartpage from './Pages/Client/Cartpage'
import Checkoutpage from './Pages/Client/Checkoutpage'
import Loginpage from './Pages/Client/Loginpage'
import Signuppage from './Pages/Client/Signuppage'
import Productdetailspage from './Pages/Client/Productdetailspage'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { checkUserAsync, selectLoggedInUser, selectloggedinusertoken } from './Features/Authslice'
import { fechItemByProductIdAsync } from './Features/Cartslice'
import Ordersuccesspage from './Pages/Client/Ordersuccesspage'
import Orderpage from './Pages/Client/Userorderpage'
import Userprofilepage from './Pages/Client/Userprofilepage'
import Logoutpage from './Pages/Client/Logoutpage'
import Forgotpasswordpage from './Pages/Client/Forgotpasswordpage'
import Adminhomepage from './Pages/Admin/Adminhomepage'
import Adminproductformpage from './Pages/Admin/Adminproductformpage'
import AdminOrders from './Pages/Admin/Adminorderpage'
import { fetchLoggedInUserAsync, fetchUserOrderToAsync } from './Features/Userslice'
import Admindashboardpage from './Pages/Admin/Admindashboardpage'

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(() => {
    // Check if user exists and has an id before dispatching the fetch action
    if (user) {
      dispatch(fechItemByProductIdAsync(user));
    }
  }, [dispatch, user]);

  useEffect(() => {

    dispatch(fetchLoggedInUserAsync(user));
  },[])

    useEffect(() => {
      
      dispatch(fetchUserOrderToAsync(user))
    }, [])




  useEffect(() => {
    // Check if the token and role are in localStorage when the page loads
    const token = localStorage.getItem('token');
    const role = JSON.parse(localStorage.getItem('role'));

    // If both token and role exist, dispatch the login check action
    if (token && role) {
      dispatch(checkUserAsync({ token, role})); // Check user data with token and role
    }
  }, [dispatch]);

  return (
    <>
    <BrowserRouter>
    <Routes>

      <Route path='/' element={<Homepage/>}/>
      <Route path='*' element={<Pagenotfound/>}/>
      <Route path='/Cartpage' element={<Cartpage/>}/>
      <Route path='/Loginpage' element={<Loginpage/>}/>
      <Route path='/Signuppage' element={<Signuppage/>}/>
      <Route path='/Checkoutpage' element={<Checkoutpage/>}/>
      <Route path='/Productdetailspage/:id' element={<Productdetailspage/>}/>
      <Route path='/Ordersuccesspage' element={<Ordersuccesspage/>}/>
      <Route path='/Orderpage.jsx' element={<Orderpage/>}/>
      <Route path='/Userprofilepage' element={<Userprofilepage/>}/>
      <Route path='/Logoutpage' element={<Logoutpage/>}/>
      <Route path='/Forgotpasswordpage' element={<Forgotpasswordpage/>}/>



      <Route path='/Adminhomepage' element={<Adminhomepage/>}/>
      <Route path='/Admindashboardpage' element={<Admindashboardpage/>}/>

      <Route path='/Adminproductformpage' element={<Adminproductformpage/>}/>
      <Route path='/Adminproductformpage/edit/:id' element={<Adminproductformpage/>}/>
      <Route path='/Adminorderpage' element={<AdminOrders/>}/>

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
