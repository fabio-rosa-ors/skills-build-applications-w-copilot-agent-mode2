import React, { useEffect, useState } from 'react';

export default function Users({ apiBase }) {
  const [items, setItems] = useState([]);
  const endpoint = `${apiBase}/users/`;

  useEffect(() => {
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.results ?? [];
        setItems(list);
      })
      .catch((err) => console.error('Users fetch error:', err));
  }, [endpoint]);

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header">
          <h2 className="h5 mb-0">Users</h2>
        </div>
        <div className="card-body p-0">
          <table className="table table-hover table-sm mb-0">
            <thead>
              <tr>
                <th style={{width: '80px'}}>ID</th>
                <th>Username</th>
                <th style={{width: '240px'}}>Email</th>
                <th style={{width: '140px'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td colSpan="4" className="small-muted text-center py-3">No users</td>
                </tr>
              )}
              {items.map((it, idx) => (
                <tr key={it.id ?? idx}>
                  <td>{it.id ?? '-'}</td>
                  <td>{it.username ?? it.name ?? JSON.stringify(it)}</td>
                  <td>{it.email ?? it.email_address ?? '-'}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2">Profile</button>
                    <button className="btn btn-sm btn-outline-primary">Message</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
