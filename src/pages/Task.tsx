import { Link, Navigate, useParams } from 'react-router-dom';
import { docType } from '../data/documents';
import { processById } from '../data/processes';
import type { Status } from '../data/types';
import { deadlineDate, urgency } from '../lib/deadlines';
import { formatDate, relativeDays } from '../lib/dates';
import { hasDoc, isBlocked, taskStatus } from '../lib/logic';
import { useStore } from '../state/store';
import StatusBadge from '../components/StatusBadge';

const ACTIONS: Status[] = ['todo', 'in_progress', 'waiting', 'done'];

export default function Task() {
  const { id } = useParams();
  const { state, setStatus } = useStore();
  const process = id ? processById(id) : undefined;
  if (!process) return <Navigate to="/home" replace />;

  const profile = state.profile!;
  const status = taskStatus(state, process.id);
  const blocked = isBlocked(state, process);
  const due = process.deadline ? deadlineDate(process.deadline, profile, state.events, process) : undefined;
  const note = state.tasks[process.id]?.note;
  const urg = urgency(due);

  return (
    <main className="page">
      <Link className="back" to="/home">
        ← Home
      </Link>
      <p className="eyebrow">
        {process.category} · {process.institution}
      </p>
      <div className="title-row">
        <h1>{process.title}</h1>
        <StatusBadge status={status} />
      </div>
      {process.german && <p className="muted">{process.german}</p>}
      <p className="lede">{process.summary}</p>

      {due && (
        <p className={`callout ${urg}`}>
          {process.deadline?.kind === 'legal' ? 'Legal deadline' : 'Recommended'} · {process.deadline?.label} ·{' '}
          {formatDate(due)} ({relativeDays(due)})
        </p>
      )}
      {process.typicalWait && <p className="muted">Typical wait: {process.typicalWait}</p>}
      {blocked && (
        <p className="callout soon">
          Do these first:{' '}
          {process.dependsOn
            .filter((d) => taskStatus(state, d) !== 'done')
            .map((d, i, arr) => (
              <span key={d}>
                {i > 0 ? ', ' : ''}
                <Link to={`/task/${d}`}>{processById(d)?.title ?? d}</Link>
                {i === arr.length - 1 ? '.' : ''}
              </span>
            ))}
        </p>
      )}

      <section>
        <h2>Update status</h2>
        <div className="hero-actions wrap">
          {ACTIONS.map((s) => (
            <button
              key={s}
              type="button"
              className={s === 'done' ? 'primary' : 'ghost'}
              disabled={s === 'done' && blocked}
              onClick={() => setStatus(process.id, s)}
            >
              {s === 'done' ? 'Mark done' : s.replace('_', ' ')}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2>Why this matters</h2>
        <p>{process.why}</p>
      </section>

      <section>
        <h2>Steps</h2>
        <ol className="steps">
          {process.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section>
        <h2>Papers you need</h2>
        <ul className="doc-list">
          {process.needs.map((typeId) => {
            const ready = hasDoc(state, typeId);
            const doc = docType(typeId);
            return (
              <li key={typeId} className={ready ? 'ready' : ''}>
                <strong>{doc.name}</strong>
                {doc.german ? ` (${doc.german})` : ''} — {ready ? 'in your vault' : doc.hint}
              </li>
            );
          })}
          {process.needs.length === 0 && <li>Nothing extra beyond what you already have.</li>}
        </ul>
      </section>

      {process.produces.length > 0 && (
        <section>
          <h2>You will get</h2>
          <ul className="doc-list">
            {process.produces.map((typeId) => {
              const doc = docType(typeId);
              return (
                <li key={typeId}>
                  <strong>{doc.name}</strong>
                  {doc.german ? ` (${doc.german})` : ''}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {note && (
        <section>
          <h2>Note</h2>
          <p>{note}</p>
        </section>
      )}

      {process.source && (
        <p className="muted fine">
          Source:{' '}
          <a href={process.source.url} target="_blank" rel="noreferrer">
            {process.source.label}
          </a>
        </p>
      )}
    </main>
  );
}
