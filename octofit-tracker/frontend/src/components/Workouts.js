import React, { useEffect, useState } from 'react';

export default function Workouts({ apiBase }) {
  const [items, setItems] = useState([]);
  const endpoint = `${apiBase}/workouts/`;

  useEffect(() => {
    console.log('Fetching Workouts from', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Workouts fetched raw data:', data);
        const list = Array.isArray(data) ? data : data?.results ?? [];
        setItems(list);
      })
      .catch((err) => console.error('Workouts fetch error:', err));
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <h2>Workouts</h2>
      <ul className="list-group">
        {items.map((it, idx) => (
          <li key={it.id ?? idx} className="list-group-item">
            {it.title ?? it.name ?? JSON.stringify(it)}
          </li>
        ))}
      </ul>
    </div>
  );
}
