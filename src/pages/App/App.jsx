import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import WishListPage from '../WishListPage/WishListPage';
import NavBar from '../../components/NavBar/NavBar';
import CartPage from '../CartPage/CartPage';
import SellPage from '../SellPage/SellPage';
import BuyPage from '../BuyPage/BuyPage';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      { user ?
          <>
          <span>Welcome, {user.name}</span>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              {/* Route components in here */}
              <Route path="/orders/wish" element={<WishListPage />} />
              <Route path="/orders" element={<CartPage />} />
              <Route path="/orders/buy" element={<BuyPage />} />
              <Route path="/orders/sell" element={<SellPage />} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}
