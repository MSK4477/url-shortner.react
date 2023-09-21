import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './pages/protectedRoute';
import './scss/App.scss';
import './scss/login.scss';
import "./scss/mediaQuery.scss";
import Register from './pages/register';
import Login from './pages/login';
import Verify from './pages/verify';
import Redirect from './pages/redirect';
import Clicks from './pages/clicks';
import AllURL from './pages/all';
import Sidebar from './pages/sideBar';
import URLDashboard from './pages/dashboard';
import ForgotPassword from './pages/forgotpassword';
import ResetPassword from './pages/resetPassword.jsx';

const Content = React.lazy(() => import('./pages/content'));

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
console.log(window.location.pathname)


  return (
    <Router>
      {isLoading ? (
        <div style={{ position:"absolute", top:"50%", left:"50%",width:"100%", color:"#ffffff"}}>Loading...</div>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <Sidebar />

          <Routes>
            <Route path='/' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/verify' element={<Verify />} />
            <Route path='/forgotPassword' element={<ForgotPassword />} />
            <Route path='/resetPassword/:id' element={<ResetPassword />} />
            <Route path='/home' element={<PrivateRoute element={<Content />} />} />
            <Route path='/rd/:urlId' element={<PrivateRoute element={<Redirect />} />} />
             <Route path='/clicks/:shortId' element={<PrivateRoute element={<Clicks />} />} />
              <Route path='/all' element={ <PrivateRoute element={<AllURL />} />}  />
              <Route path='/dashboard' element={<PrivateRoute element={<URLDashboard />} />} />

              
          </Routes>
        </Suspense>
      )}
    </Router>
  );
}

export default App;
