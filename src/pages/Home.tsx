import { Link } from 'react-router-dom';
import { docType } from '../data/documents';
import { deadlineDate, urgency } from '../lib/deadlines';
import { formatDate, relativeDays } from '../lib/dates';
import { isBlocked, missingNeeds, PHASES, progress, taskStatus, visibleProcesses } from '../lib/logic';
import { useStore } from '../state/store';
import StatusBadge from '../components/StatusBadge';

export default function Home() {
  const { state, dismissChange } = useStore();
  const profile = state.profile!;
  const list = visibleProcesses(state);
  const { done, total } = progress(state);
  const open = list.filter((p) => taskStatus(state, p.id) !== 'done');

  const dated = open
    .map((p) => ({
      process: p,
      due: p.deadline ? deadlineDate(p.deadline, profile, state.events, p) : undefined,
    }))
    .filter((x) => x.due)
    .sort((a, b) => (a.due! < b.due! ? -1 : 1));

  const overdue = dated.filter((x) => urgency(x.due) === 'overdue');
  const soon = dated.filter((x) => urgency(x.due) === 'soon');

  return (
    <main className="page">
      <section className="hero-card">
        <p className="eyebrow">Today in {profile.city}</p>
        <h1>Hello, {profile.name.split(' ')[0]}</h1>
        <p className="muted">
          {done} of {total} steps done for your current life events.
        </p>
        <div className="meter">
          <span style={{ width: total ? `${(done / total) * 100}%` : '0%' }} />
        </div>
      </section>

      {state.change && (
        <aside className="banner">
          <div>
            <p className="eyebrow">Something changed</p>
            <h2>{state.change.title}</h2>
            <p>{state.change.detail}</p>
            {state.change.link && <Link to={state.change.link}>Open affected step</Link>}
          </div>
          <button className="text-btn" type="button" onClick={dismissChange}>
            Dismiss
          </button>
        </aside>
      )}

      {overdue.length > 0 && (
        <section>
          <h2>Overdue</h2>
          <div className="card-list">
            {overdue.map(({ process, due }) => (
              <Link key={process.id} className="row-card danger" to={`/task/${process.id}`}>
                <div>
                  <strong>{process.title}</strong>
                  <p>
                    {process.deadline?.label} · was {formatDate(due!)}
                  </p>
                </div>
                <StatusBadge status={taskStatus(state, process.id)} />
              </Link>
            ))}
          </div>
        </section>
      )}

      {soon.length > 0 && (
        <section>
          <h2>Coming up</h2>
          <div className="card-list">
            {soon.map(({ process, due }) => (
              <Link key={process.id} className="row-card" to={`/task/${process.id}`}>
                <div>
                  <strong>{process.title}</strong>
                  <p>
                    {formatDate(due!)} · {relativeDays(due!)}
                  </p>
                </div>
                <StatusBadge status={taskStatus(state, process.id)} />
              </Link>
            ))}
          </div>
        </section>
      )}

      {PHASES.map((phase) => {
        const items = list.filter((p) => p.phase === phase.id);
        if (!items.length) return null;
        return (
          <section key={phase.id}>
            <h2>{phase.label}</h2>
            <div className="card-list">
              {items.map((p) => {
                const due = p.deadline ? deadlineDate(p.deadline, profile, state.events, p) : undefined;
                const blocked = isBlocked(state, p);
                const missing = missingNeeds(state, p);
                return (
                  <Link key={p.id} className="row-card" to={`/task/${p.id}`}>
                    <div>
                      <strong>{p.title}</strong>
                      <p>
                        {p.german ? `${p.german} · ` : ''}
                        {p.institution}
                        {due ? ` · ${formatDate(due)}` : ''}
                        {blocked ? ' · waiting on another step' : ''}
                        {!blocked && missing.length ? ` · missing ${docType(missing[0]).name}` : ''}
                      </p>
                    </div>
                    <StatusBadge status={taskStatus(state, p.id)} />
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}

      <p className="muted fine">
        Next job, move, or departure? Add it under{' '}
        <Link to="/life">Life event</Link>. A new letter? Log it in the{' '}
        <Link to="/vault">vault</Link>.
      </p>
    </main>
  );
}
