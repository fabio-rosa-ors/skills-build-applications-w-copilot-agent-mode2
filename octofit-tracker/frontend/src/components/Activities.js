import React, { useEffect, useState } from 'react';

export default function Activities({ apiBase }) {
  const [items, setItems] = useState([]);
  const endpoint = `${apiBase}/activities/`;

  useEffect(() => {
    console.log('Fetching Activities from', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Activities fetched raw data:', data);
        const list = Array.isArray(data) ? data : data?.results ?? [];
        setItems(list);
      })
      .catch((err) => console.error('Activities fetch error:', err));
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <h2>Activities</h2>
      <ul className="list-group">
        {items.map((it, idx) => (
          <li key={it.id ?? idx} className="list-group-item">
            {it.name ?? JSON.stringify(it)}
          </li>
        ))}
      </ul>
    </div>
  );
}
