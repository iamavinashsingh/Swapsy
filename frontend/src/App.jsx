import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import { AuthProvider } from './context/AuthContext';
import UserProtectWrapper from './routes/UserProtectWrapper';
import Start from './pages/Start';
import UserLogIn from './pages/UserLogIn';
import UserSignUp from './pages/UserSignUp';
import Home from './pages/Home';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<UserLogIn />} />
        <Route path="/signup" element={<UserSignUp />} />

        {/* Corrected route structure */}
        <Route element={<UserProtectWrapper />}>
          <Route path="/home" element={<Home />} />
        </Route>

        <Route path="*" element={<div className="p-8 text-center text-white">Page not found</div>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;