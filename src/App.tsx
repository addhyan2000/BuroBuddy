import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Landing from './pages/Landing';
import Life from './pages/Life';
import Onboarding from './pages/Onboarding';
import Task from './pages/Task';
import Timeline from './pages/Timeline';
import Vault from './pages/Vault';
import { StoreProvider } from './state/store';

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/task/:id" element={<Task />} />
            <Route path="/vault" element={<Vault />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/life" element={<Life />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  );
}
