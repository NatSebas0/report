// src/App.jsx
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateAuctionPage from './pages/CreateAuctionPage';
import ProfilePage from './pages/ProfilePage';
import AuctionDetailPage from './pages/AuctionDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import SearchResultsPage from './pages/SearchResultsPage';
import NotFound from './pages/NotFound';
import PrivateRoute from './components/PrivateRoute';
import ProfileHistoryPage from './pages/ProfileHistoryPage';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import { AuthContext } from './contexts/AuthContext';

function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <Router>
      <Routes>  
        <Route path="/" element={currentUser ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        <Route path="/login" element={currentUser ? <Navigate to="/home" /> : <LoginPage />} />
        <Route path="/register" element={currentUser ? <Navigate to="/home" /> : <RegisterPage />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/create-auction"
          element={
            <PrivateRoute>
              <CreateAuctionPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/history"
          element={
            <PrivateRoute>
              <ProfileHistoryPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/settings"
          element={
            <PrivateRoute>
              <ProfileSettingsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/auction/:id"
          element={
            <PrivateRoute>
              <AuctionDetailPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/search"
          element={
            <PrivateRoute>
              <SearchResultsPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
