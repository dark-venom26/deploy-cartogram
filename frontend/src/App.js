import './scss/App.scss';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom'
import MainLayout from './layout/mainLayout/MainLayout';
import Home from './pages/home/Home';
// import About from './pages/about/About';
// import Contact from './pages/contact/Contact';
import Product from './pages/product/Product';
import Signup from './pages/signup/Signup';
import ForgetPassword from './pages/forgetPassword/ForgetPassword';
import Dashboard from './component/dashboard/Dashboard';
import DashboardLayout from './layout/dashboardLayout/DashboardLayout';
import { useEffect, useState } from 'react';
import store from "./redux/store";
import { loadUser } from './redux/actions/userAction';
import { useSelector } from 'react-redux';
import Profile from './pages/profile/Profile';
import UpdatePassword from './pages/updatePassword/UpdatePassword';
import Order from './pages/order/Order';
import ResetPassword from './pages/resetPassword/ResetPassword';
import Cart from './pages/cart/Cart';
import Shipping from './pages/shipping/Shipping';
import ConfirmOrder from './pages/confirmOrder/ConfirmOrder';
import StripePayment from './pages/stripePayment/stripePayment';
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import OrderSuccess from './pages/orderSuccess/OrderSuccess';
import DashboardProducts from './component/dashboard-products/DashboardProducts';
import DashboardOrders from './component/dashboard-orders/DashboardOrders';
import DashboardUsers from './component/dashboard-users/DashboardUsers';
import DashboardReviews from './component/dashboard-reviews/DashboardReviews';
import NewProduct from './component/new-product/NewProduct';
import UpdateProduct from './component/update-product/UpdateProduct';
import ProcessOrder from './component/process-order/ProcessOrder';
import UpdateUser from './component/update-user/UpdateUser';
import NotFound from './component/not-found/NotFound';

function App() {

  const {isAuthenticated, user} = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const {data} = await axios.get("/api/v1/stripeapikey");
    
    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
      store.dispatch(loadUser());

      getStripeApiKey()
  }, [])
    
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<MainLayout/>}>
            <Route index element={<Home/>} />
            <Route path='product/:productId' element={<Product/>} />
            <Route path='signup' element={<Signup/>} />
            <Route path='password/forget' element={isAuthenticated ? <Navigate to="/" /> : <ForgetPassword/>}/>
            <Route path='password/update' element={isAuthenticated ? <UpdatePassword/> : <Navigate to="/" />}/>
            <Route path='password/reset/:token' element={isAuthenticated ? <Navigate to="/" /> : <ResetPassword/> }/>
            <Route path='account' element={isAuthenticated ? <Profile/>: <Navigate to="/" />} />
            <Route path='orders' element={isAuthenticated ? <Order/>: <Navigate to="/" />} />
            <Route path='success' element={isAuthenticated ? <OrderSuccess/>: <Navigate to="/" />} />
            <Route path='shipping' element={isAuthenticated ? <Shipping/>: <Navigate to="/signup" />} />
            <Route path='order/confirm' element={isAuthenticated ? <ConfirmOrder/>: <Navigate to="/signup" />} />
            <Route path='cart' element={<Cart/>} />
            {/* <Route path='about' element={<About/>} />
            <Route path='contact' element={<Contact/>} /> */}
            {
              stripeApiKey && 
              <Route path='process/stripe/payment' element={isAuthenticated ? 
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <StripePayment/>
                </Elements>
              : <Navigate to="/signup" />} />
            }
            <Route path="*" element={<NotFound/>} />
          </Route>
          <Route path='/admin' element={isAuthenticated && user.role==="admin" ? <DashboardLayout/> : <Navigate to="/"/>}>
            <Route index element={<Dashboard/>} />
            <Route path='product' element={<NewProduct/>} />
            <Route path='product/:productId' element={<UpdateProduct/>} />
            <Route path='products' element={<DashboardProducts/>} />
            <Route path='orders' element={<DashboardOrders/>} />
            <Route path='order/:orderId' element={<ProcessOrder/>} />
            <Route path='users' element={<DashboardUsers/>} />
            <Route path='user/:userId' element={<UpdateUser/>} />
            <Route path='reviews' element={<DashboardReviews/>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
