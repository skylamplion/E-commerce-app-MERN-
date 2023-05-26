import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import "./App.css";
import Footer from './components/footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen'
import ProductDetails from './screens/ProductDetails';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';

function App() {
  return (

    <Router>

      <Header />
      <main className='my-3'>
        <Container>

          <Routes>

            <Route path="/" element={<HomeScreen />}></Route>
            <Route path="/login" element={<LoginScreen />}></Route>
            <Route path="/payment" element={<PaymentScreen />}></Route>
            <Route path="/order/:id" element={<OrderScreen />}></Route>
            <Route path="/shipping" element={<ShippingScreen />}></Route>
            <Route path="/placeorder" element={<PlaceOrderScreen />}></Route>
            <Route path="/profile" element={<ProfileScreen />}></Route>
            <Route path="/register" element={<RegisterScreen />}></Route>
            <Route path="/Product/:id" element={<ProductDetails />}></Route>
            <Route path="/cart/:id?" element={<CartScreen />} exact></Route>


          </Routes>

        </Container>
      </main>
      <Footer />
    </Router >

  )
}

export default App;
