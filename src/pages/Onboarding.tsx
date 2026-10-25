import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { LIFE_EVENTS } from '../data/events';
import type { EventId, Profile } from '../data/types';
import { todayISO } from '../lib/dates';
import { useStore } from '../state/store';

export default function Onboarding() {
  const { state, startFresh } = useStore();
  const navigate = useNavigate();
  const [eventId, setEventId] = useState<EventId>('arrive-study');
  const [form, setForm] = useState<Profile>({
    name: '',
    from: '',
    nonEU: true,
    city: 'Munich',
    university: '',
    arrivalDate: todayISO(),
    moveInDate: todayISO(),
    semesterStart: todayISO(),
    visaExpiry: '',
    sharedFlat: true,
  });

  if (state.profile) return <Navigate to="/home" replace />;

  const event = LIFE_EVENTS.find((e) => e.id === eventId)!;
  const eventDate =
    eventId === 'arrive-study' ? form.arrivalDate : eventId === 'move-city' ? form.moveInDate : form.arrivalDate;

  const set = (patch: Partial<Profile>) => setForm((f) => ({ ...f, ...patch }));

  return (
    <main className="narrow">
      <p className="eyebrow">New file</p>
      <h1>Tell BüroBuddy where you are</h1>
      <p className="muted">Dates stay on this device. Nothing is uploaded.</p>

      <form
        className="stack"
        onSubmit={(e) => {
          e.preventDefault();
          startFresh(
            { ...form, visaExpiry: form.visaExpiry || undefined },
            eventId,
            eventDate,
          );
          navigate('/home');
        }}
      >
        <label>
          Your name
          <input required value={form.name} onChange={(e) => set({ name: e.target.value })} />
        </label>
        <label>
          Coming from
          <input required value={form.from} onChange={(e) => set({ from: e.target.value })} />
        </label>
        <label className="check">
          <input type="checkbox" checked={form.nonEU} onChange={(e) => set({ nonEU: e.target.checked })} />
          I need a visa / residence permit (non-EU)
        </label>
        <label>
          City
          <input required value={form.city} onChange={(e) => set({ city: e.target.value })} />
        </label>
        <label>
          University (if any)
          <input value={form.university} onChange={(e) => set({ university: e.target.value })} />
        </label>
        <div className="grid-2">
          <label>
            Arrival
            <input type="date" required value={form.arrivalDate} onChange={(e) => set({ arrivalDate: e.target.value })} />
          </label>
          <label>
            Move-in
            <input type="date" required value={form.moveInDate} onChange={(e) => set({ moveInDate: e.target.value })} />
          </label>
          <label>
            Semester start
            <input
              type="date"
              required
              value={form.semesterStart}
              onChange={(e) => set({ semesterStart: e.target.value })}
            />
          </label>
          <label>
            Visa expiry (optional)
            <input type="date" value={form.visaExpiry} onChange={(e) => set({ visaExpiry: e.target.value })} />
          </label>
        </div>
        <label className="check">
          <input type="checkbox" checked={form.sharedFlat} onChange={(e) => set({ sharedFlat: e.target.checked })} />
          I live in a WG / shared flat
        </label>

        <p className="label">First life event</p>
        <div className="choice-grid">
          {LIFE_EVENTS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={item.id === eventId ? 'choice active' : 'choice'}
              onClick={() => setEventId(item.id)}
            >
              <strong>{item.title}</strong>
              <span>{item.prompt}</span>
            </button>
          ))}
        </div>
        <p className="muted">{event.description}</p>
        <div className="hero-actions">
          <button className="primary" type="submit">
            Build my path
          </button>
          <Link className="ghost" to="/">
            Back
          </Link>
        </div>
      </form>
    </main>
  );
}
