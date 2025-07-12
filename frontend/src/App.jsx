import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

import HomePage from '../src/pages/HomePage';
import LoginPage from './pages/Login';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import BrowsePage from './pages/BrowsePage';
import SwapRequestsPage from './pages/SwapRequestsPage';
import FeedbackPage from './pages/FeedbackPage';


// import AdminDashboard from './admin/AdminDashboard';
// import AdminUsers from './admin/AdminUsers';
// import AdminSkills from './admin/AdminSkills';
// import AdminSwaps from './admin/AdminSwaps';
// import AdminReports from './admin/AdminReports';
// import AdminMessages from './admin/AdminMessages';

import { ThemeProvider } from './context/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
          <Navbar />

          <main className="flex-grow container mx-auto px-4 py-6">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />

              {/* Protected Routes */}
              <Route element={<PrivateRoute />}>
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/browse" element={<BrowsePage />} />
                <Route path="/swap-requests" element={<SwapRequestsPage />} />
                <Route path="/feedback" element={<FeedbackPage />} />
              </Route>

              {/* Admin Routes */}
              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/skills" element={<AdminSkills />} />
                <Route path="/admin/swaps" element={<AdminSwaps />} />
                <Route path="/admin/reports" element={<AdminReports />} />
                <Route path="/admin/messages" element={<AdminMessages />} />
              </Route>

              {/* 404 */}
              
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
