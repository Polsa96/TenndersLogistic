
import './App.scss';
import { BrowserRouter,Route, Routes } from "react-router-dom";
import { useState } from 'react';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import SignupPage from './pages/SingupPage/SignupPage';
import AboutPage from './pages/AboutPage/AboutPage';
import ContactPage from './pages/ContactPage/ContactPage';
import LogisticsPage from './pages/LogisticsPage/LogisticsPage';
import MainPage from './pages/MainPage/MainPage';
import { JwtContext } from './shared/context/JwtContext';
import LoginAuth from './shared/components/LoginAuth';
import RequireAuth from './shared/components/RequireAuth';

function App() {
  const [jwt, setJwt] = useState(localStorage.getItem('token') || null);
  return (
    <>
      <JwtContext.Provider value={{ jwt, setJwt }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/about" element={<AboutPage />}/>
            <Route path="/contact" element={<ContactPage />}/>
            <Route path="/login" element={<LoginAuth><LoginPage /></LoginAuth>}/>
            <Route path="/logistics" element={<RequireAuth><LogisticsPage /></RequireAuth>}/>
            <Route path="/register" element={<LoginAuth><SignupPage /></LoginAuth>}/>
            <Route path="/main" element={<RequireAuth><MainPage /></RequireAuth>}/>
          </Routes>
        </BrowserRouter>
      </JwtContext.Provider>
    </>
  );
}

export default App;
