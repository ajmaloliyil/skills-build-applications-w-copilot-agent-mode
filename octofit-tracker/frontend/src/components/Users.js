import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  useEffect(() => {
    console.log('Users API endpoint:', apiUrl);
    fetch(apiUrl)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Fetched users:', results);
      })
      .catch(err => {
        setError(err.message);
        console.error('Fetch error:', err);
      });
  }, [apiUrl]);

  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="display-6">Users</h2>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>Refresh</button>
      </div>
      {error ? (
        <div className="alert alert-danger">Failed to load users: {error}</div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Team</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={idx}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.team?.name || ''}</td>
                    <td>
                      <button className="btn btn-outline-info btn-sm" onClick={() => setSelectedUser(user)}>
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal for user details */}
      {selectedUser && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{background: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Details</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelectedUser(null)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Username:</strong> {selectedUser.username}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Team:</strong> {selectedUser.team?.name || ''}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedUser(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
