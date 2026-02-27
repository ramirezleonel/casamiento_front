import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PhotoProvider } from './context/PhotoContext';
import { MessageProvider } from './context/MessageContext';
import Home from './pages/Home';
import GalleryPage from './pages/GalleryPage';
import MessagesPage from './pages/MessagesPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import Footer from './components/Footer';

const theme = createTheme({
  palette: {
    primary: {
      main: '#c5a059',
    },
    background: {
      default: '#fdfaf5',
    },
  },
  typography: {
    fontFamily: '"Inter", "sans-serif"',
    h1: { fontFamily: '"Playfair Display", "serif"' },
    h2: { fontFamily: '"Playfair Display", "serif"' },
    h3: { fontFamily: '"Playfair Display", "serif"' },
    h4: { fontFamily: '"Playfair Display", "serif"' },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PhotoProvider>
        <MessageProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/authenticationpro" element={<LoginPage />} />
              <Route path="/admin-control-center" element={<AdminDashboard />} />
            </Routes>
            <Footer />
          </Router>
        </MessageProvider>
      </PhotoProvider>
    </ThemeProvider>
  );
}

export default App;
