import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LIFE_EVENTS } from '../data/events';
import { processById } from '../data/processes';
import type { EventId } from '../data/types';
import { todayISO } from '../lib/dates';
import { useStore } from '../state/store';

export default function Life() {
  const { state, addEvent } = useStore();
  const [picked, setPicked] = useState<EventId | null>(null);
  const [date, setDate] = useState(todayISO());
  const selected = LIFE_EVENTS.find((e) => e.id === picked);
  const active = new Set(state.events.map((e) => e.id));

  return (
    <main className="page">
      <p className="eyebrow">Something happened</p>
      <h1>Life events</h1>
      <p className="muted">Adding an event unlocks the steps and papers that come with it.</p>

      <section>
        <h2>Already on your path</h2>
        <ul className="doc-list">
          {state.events.map((e) => {
            const life = LIFE_EVENTS.find((x) => x.id === e.id);
            return (
              <li key={e.id}>
                <strong>{life?.title}</strong> — dated {e.date}
              </li>
            );
          })}
        </ul>
      </section>

      <div className="choice-grid">
        {LIFE_EVENTS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={item.id === picked ? 'choice active' : 'choice'}
            disabled={active.has(item.id)}
            onClick={() => setPicked(item.id)}
          >
            <strong>{item.title}</strong>
            <span>{active.has(item.id) ? 'Already added' : item.prompt}</span>
          </button>
        ))}
      </div>

      {selected && (
        <section className="hero-card">
          <h2>{selected.title}</h2>
          <p>{selected.description}</p>
          {selected.impacts.map((impact) => (
            <div key={impact.area} className="impact">
              <strong>{impact.area}</strong>
              <p>{impact.text}</p>
              <p className="muted">
                Unlocks{' '}
                {impact.processIds
                  .map((id) => processById(id)?.title)
                  .filter(Boolean)
                  .join(', ')}
              </p>
            </div>
          ))}
          <label>
            {selected.dateLabel}
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </label>
          <button
            className="primary"
            type="button"
            onClick={() => {
              addEvent(selected.id, date);
              setPicked(null);
            }}
          >
            Add to my path
          </button>
        </section>
      )}

      <p className="muted fine">
        After you add an event, the new steps show up on <Link to="/home">Home</Link>.
      </p>
    </main>
  );
}
