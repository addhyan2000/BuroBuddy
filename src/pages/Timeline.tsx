import { Link } from 'react-router-dom';
import { formatDate } from '../lib/dates';
import { useStore } from '../state/store';

export default function Timeline() {
  const { state } = useStore();
  const items = [...state.timeline].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <main className="page">
      <p className="eyebrow">History</p>
      <h1>Timeline</h1>
      <ol className="timeline">
        {items.map((item) => (
          <li key={item.id}>
            <span className="when">{formatDate(item.date)}</span>
            <strong>{item.title}</strong>
            {item.detail && <p>{item.detail}</p>}
            {item.link && <Link to={item.link}>Open</Link>}
          </li>
        ))}
      </ol>
    </main>
  );
}
