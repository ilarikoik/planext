import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import React from 'react';
import Login from '../screens/login';
import Index from '../screens';

function Navigation() {
  return (
    <Router>
      <div className='h-20 w-full bg-red-500 justify-around items-center '>
        <nav>
          <ul>
            <li>
              <Link to="/Profile">Profile</Link>
            </li>
            <li>
              <Link to="/index">Home</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/index" element={<Index />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Navigation;
