import { useState } from 'react';
import { DOC_TYPES, docType } from '../data/documents';
import { LETTERS } from '../data/letters';
import { formatDate } from '../lib/dates';
import { missingNeeds, taskStatus, visibleProcesses } from '../lib/logic';
import { useStore } from '../state/store';

export default function Vault() {
  const { state, addDocument, applyLetter } = useStore();
  const [typeId, setTypeId] = useState('other');
  const [fileName, setFileName] = useState('');
  const [flash, setFlash] = useState<string | null>(null);

  const missing = Array.from(
    new Set(
      visibleProcesses(state)
        .filter((p) => taskStatus(state, p.id) !== 'done')
        .flatMap((p) => missingNeeds(state, p)),
    ),
  );

  return (
    <main className="page">
      <p className="eyebrow">Papers</p>
      <h1>Document vault</h1>
      <p className="muted">Filenames only in this demo — nothing is uploaded to a server.</p>

      {flash && <p className="callout ok">{flash}</p>}

      <section>
        <h2>I got a letter</h2>
        <div className="card-list">
          {LETTERS.map((letter) => {
            const seen = Boolean(state.letters[letter.id]);
            return (
              <button
                key={letter.id}
                type="button"
                className="row-card"
                disabled={seen}
                onClick={() => {
                  const applied = applyLetter(letter.id);
                  if (applied) setFlash(`${applied.title} filed. ${applied.detail}`);
                }}
              >
                <div>
                  <strong>{letter.title}</strong>
                  <p>
                    {letter.from}
                    {seen ? ' · already filed' : ''}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {missing.length > 0 && (
        <section>
          <h2>Still missing for open steps</h2>
          <ul className="doc-list">
            {missing.map((id) => {
              const doc = docType(id);
              return (
                <li key={id}>
                  <strong>{doc.name}</strong>
                  {doc.german ? ` (${doc.german})` : ''} — {doc.hint}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section>
        <h2>Add a file</h2>
        <form
          className="inline-form"
          onSubmit={(e) => {
            e.preventDefault();
            addDocument(typeId, fileName || `${typeId}.pdf`);
            setFileName('');
          }}
        >
          <select value={typeId} onChange={(e) => setTypeId(e.target.value)}>
            {DOC_TYPES.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          <input placeholder="filename.pdf" value={fileName} onChange={(e) => setFileName(e.target.value)} />
          <button className="primary" type="submit">
            Add
          </button>
        </form>
      </section>

      <section>
        <h2>In the vault</h2>
        <div className="card-list">
          {state.documents.map((doc) => {
            const meta = docType(doc.typeId);
            return (
              <div key={doc.id} className="row-card static">
                <div>
                  <strong>{meta.name}</strong>
                  <p>
                    {doc.fileName ?? 'saved'} · {formatDate(doc.addedOn)} · {doc.origin}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
