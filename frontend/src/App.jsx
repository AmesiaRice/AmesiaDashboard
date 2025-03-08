import React from 'react'
import './App.css';
import Navbar from './components/Navbar';
import {Routes,Route,BrowserRouter, useLocation} from 'react-router-dom';
import Home from './pages/Home';
import SheetData from './pages/SheetData';
import LiveLocation from './pages/LiveLocation';
// import LoginPage from './pages/LoginPage';
import Login from './components/Login';
import Register from './components/Register';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  return (
    <div>
      {!isAdminRoute && <Navbar />}
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/sheet' element={<SheetData/>}/>
          <Route path='/location' element={<LiveLocation/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/admin/dashboard' element={<AdminDashboard/>}/>
          <Route path='*' element={<h1>not Found</h1>}/>
        </Routes>
        {!isAdminRoute && <Footer/>}
    </div>
  )
}

export default App;
