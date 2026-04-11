import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Explore from './pages/Explore';
import Finance from './pages/Finance';
import AdmissionPredictor from './pages/AdmissionPredictor';
import Timeline from './pages/Timeline';
import Progress from './pages/Progress';
import storage from './utils/storage';

function RequireProfile({ children }) {
  const profile = storage.get('edupath_profile', null);
  if (!profile) {
    return <Navigate to="/" replace />;
  }
  return children;
}

function AppLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-bg">
      <Navbar />
      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route
          path="/dashboard"
          element={
            <RequireProfile>
              <AppLayout><Dashboard /></AppLayout>
            </RequireProfile>
          }
        />
        <Route
          path="/explore"
          element={
            <RequireProfile>
              <AppLayout><Explore /></AppLayout>
            </RequireProfile>
          }
        />
        <Route
          path="/finance"
          element={
            <RequireProfile>
              <AppLayout><Finance /></AppLayout>
            </RequireProfile>
          }
        />
        <Route
          path="/predictor"
          element={
            <RequireProfile>
              <AppLayout><AdmissionPredictor /></AppLayout>
            </RequireProfile>
          }
        />
        <Route
          path="/timeline"
          element={
            <RequireProfile>
              <AppLayout><Timeline /></AppLayout>
            </RequireProfile>
          }
        />
        <Route
          path="/progress"
          element={
            <RequireProfile>
              <AppLayout><Progress /></AppLayout>
            </RequireProfile>
          }
        />
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
