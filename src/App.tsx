import { branding } from './config/branding';

// Step 1: project setup only. The real pages are added in the next steps.
export default function App() {
  return (
    <main className="setup-screen">
      <div className="setup-card">
        <img src={branding.logoSrc} alt={branding.logoAlt} />
        <h1>{branding.name}</h1>
        <p>{branding.tagline}</p>
        <p className="note">Project setup is working. The demo screens come next.</p>
      </div>
    </main>
  );
}
