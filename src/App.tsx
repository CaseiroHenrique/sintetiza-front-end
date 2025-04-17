import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ComingSoon from './pages/ComingSoon';
// import HomePage from './pages/HomePage';
// import AdminLoginPage from './pages/Login';
// import Termos from './pages/TermsPage';
// import Privacy from './pages/PrivacyPage';
// import ArticlePage from './pages/ArticlePage';
// import Dashboard from './pages/Dashboard';
// import ArtigosPendente from './pages/Articles/PendingArticles';
// import ArtigosPublicado from './pages/Articles/PublishedArticles';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ComingSoon />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
