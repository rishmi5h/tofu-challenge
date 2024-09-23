import React, { useState } from 'react';

interface Entry {
  algo: number;
  frontend: number;
  name: string;
}

type SortKey = 'algo' | 'frontend' | 'total';

export default function App() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [name, setName] = useState('');
  const [algo, setAlgo] = useState('');
  const [frontend, setFrontend] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('algo');
  const [sortAsc, setSortAsc] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: Entry = {
      algo: Number(algo),
      frontend: Number(frontend),
      name,
    };
    setEntries([...entries, newEntry]);
    setName('');
    setAlgo('');
    setFrontend('');
  };

  const handleClear = () => {
    setEntries([]);
  };

  const handleSort = (key: SortKey, asc: boolean) => {
    setSortKey(key);
    setSortAsc(asc);
  };

  const sortedEntries = [...entries].sort((a, b) => {
    const aValue = sortKey === 'total' ? a.algo + a.frontend : a[sortKey];
    const bValue = sortKey === 'total' ? b.algo + b.frontend : b[sortKey];
    if (aValue < bValue) {
      return sortAsc ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortAsc ? 1 : -1;
    }
    return 0;
  });

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          type="text"
          value={name}
        />
        <input
          onChange={(e) => setAlgo(e.target.value)}
          placeholder="Algo Score"
          required
          type="number"
          value={algo}
        />
        <input
          onChange={(e) => setFrontend(e.target.value)}
          placeholder="Frontend Score"
          required
          type="number"
          value={frontend}
        />
        <button type="submit">Add Entry</button>
      </form>
      <button onClick={handleClear}>Clear Table</button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>
              Algo
              <button
                id="sort-algo-asc"
                onClick={() => handleSort('algo', true)}
              >
                ▲
              </button>
              <button
                id="sort-algo-desc"
                onClick={() => handleSort('algo', false)}
              >
                ▼
              </button>
            </th>
            <th>
              Frontend
              <button
                id="sort-frontend-asc"
                onClick={() => handleSort('frontend', true)}
              >
                ▲
              </button>
              <button
                id="sort-frontend-desc"
                onClick={() => handleSort('frontend', false)}
              >
                ▼
              </button>
            </th>
            <th>
              Total
              <button
                id="sort-total-asc"
                onClick={() => handleSort('total', true)}
              >
                ▲
              </button>
              <button
                id="sort-total-desc"
                onClick={() => handleSort('total', false)}
              >
                ▼
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedEntries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.name}</td>
              <td>{entry.algo}</td>
              <td>{entry.frontend}</td>
              <td>{entry.algo + entry.frontend}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
