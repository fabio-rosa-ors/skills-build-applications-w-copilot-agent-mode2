import React, { useEffect, useState } from 'react';

export default function Leaderboard({ apiBase }) {
  const [items, setItems] = useState([]);
  const endpoint = `${apiBase}/leaderboard/`;

  useEffect(() => {
    console.log('Fetching Leaderboard from', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Leaderboard fetched raw data:', data);
        const list = Array.isArray(data) ? data : data?.results ?? [];
        setItems(list);
      })
      .catch((err) => console.error('Leaderboard fetch error:', err));
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      <ol className="list-group list-group-numbered">
        {items.map((it, idx) => (
          <li key={it.id ?? idx} className="list-group-item">
            {it.username ?? it.name ?? JSON.stringify(it)}
          </li>
        ))}
      </ol>
    </div>
  );
}
