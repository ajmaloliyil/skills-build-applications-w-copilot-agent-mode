import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    console.log('Leaderboard API endpoint:', apiUrl);
    fetch(apiUrl)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        const results = data.results || data;
        setLeaderboard(results);
        console.log('Fetched leaderboard:', results);
      })
      .catch(err => {
        setError(err.message);
        console.error('Fetch error:', err);
      });
  }, [apiUrl]);

  const [selectedEntry, setSelectedEntry] = useState(null);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="display-6">Leaderboard</h2>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>Refresh</button>
      </div>
      {error ? (
        <div className="alert alert-danger">Failed to load leaderboard: {error}</div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">User</th>
                  <th scope="col">Score</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, idx) => (
                  <tr key={idx}>
                    <td>{entry.user?.username || 'Unknown'}</td>
                    <td>{entry.score}</td>
                    <td>
                      <button className="btn btn-outline-info btn-sm" onClick={() => setSelectedEntry(entry)}>
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

      {/* Modal for leaderboard details */}
      {selectedEntry && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{background: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Leaderboard Entry</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelectedEntry(null)}></button>
              </div>
              <div className="modal-body">
                <p><strong>User:</strong> {selectedEntry.user?.username || 'Unknown'}</p>
                <p><strong>Score:</strong> {selectedEntry.score}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedEntry(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
