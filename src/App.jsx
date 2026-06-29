import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServiceUiUxPage from './pages/ServiceUiUxPage';
import ServiceSocialMediaPage from './pages/ServiceSocialMediaPage';
import ServiceWebDevPage from './pages/ServiceWebDevPage';
import ServiceSoftwarePage from './pages/ServiceSoftwarePage';
import AdminDashboard from './pages/AdminDashboard';
import ContactPage from './pages/ContactPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services/ui-ux" element={<ServiceUiUxPage />} />
        <Route path="/services/social-media" element={<ServiceSocialMediaPage />} />
        <Route path="/services/web-dev" element={<ServiceWebDevPage />} />
        <Route path="/services/custom-software" element={<ServiceSoftwarePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
