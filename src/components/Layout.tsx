import { FileStack, Home, Map, Sparkles } from 'lucide-react';
import { NavLink, Navigate, Outlet } from 'react-router-dom';
import { branding } from '../config/branding';
import { useStore } from '../state/store';

const links = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/vault', label: 'Vault', icon: FileStack },
  { to: '/timeline', label: 'Timeline', icon: Map },
  { to: '/life', label: 'Life event', icon: Sparkles },
];

export default function Layout() {
  const { state, reset } = useStore();
  if (!state.profile) return <Navigate to="/" replace />;

  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink to="/home" className="brand">
          <img src={branding.logoSrc} alt="" />
          <div>
            <strong>{branding.name}</strong>
            <span>
              {state.profile.name} · {state.profile.city}
            </span>
          </div>
        </NavLink>
        <button className="text-btn" type="button" onClick={reset}>
          Reset demo
        </button>
      </header>
      <Outlet />
      <nav className="tabbar">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className={({ isActive }) => (isActive ? 'active' : undefined)}>
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
