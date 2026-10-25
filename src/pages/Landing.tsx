import { ArrowRight } from 'lucide-react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { branding } from '../config/branding';
import { useStore } from '../state/store';

export default function Landing() {
  const { state, startDemo } = useStore();
  const navigate = useNavigate();
  if (state.profile) return <Navigate to="/home" replace />;

  return (
    <main className="landing">
      <div className="landing-hero">
        <img src={branding.logoSrc} alt={branding.logoAlt} />
        <p className="eyebrow">For internationals in Germany</p>
        <h1>{branding.name}</h1>
        <p className="lede">{branding.tagline}. One path for each life event — not a pile of PDFs.</p>
        <div className="hero-actions">
          <button
            className="primary"
            type="button"
            onClick={() => {
              startDemo();
              navigate('/home');
            }}
          >
            Open Maya’s demo <ArrowRight size={18} />
          </button>
          <Link className="ghost" to="/onboarding">
            Start from scratch
          </Link>
        </div>
        <ul className="pitch">
          <li>See what a move, a job, or arrival actually unlocks.</li>
          <li>Track papers that offices will ask for next.</li>
          <li>Log a letter when it lands in the mailbox.</li>
        </ul>
      </div>
    </main>
  );
}
