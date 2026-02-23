import React, { useEffect, useState } from 'react';

export default function Users({ apiBase }) {
  const [items, setItems] = useState([]);
  const endpoint = `${apiBase}/users/`;

  useEffect(() => {
    console.log('Fetching Users from', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Users fetched raw data:', data);
        const list = Array.isArray(data) ? data : data?.results ?? [];
        setItems(list);
      })
      .catch((err) => console.error('Users fetch error:', err));
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <h2>Users</h2>
      <ul className="list-group">
        {items.map((it, idx) => (
          <li key={it.id ?? idx} className="list-group-item">
            {it.username ?? it.email ?? JSON.stringify(it)}
          </li>
        ))}
      </ul>
    </div>
  );
}
