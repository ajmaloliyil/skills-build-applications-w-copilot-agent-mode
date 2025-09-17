import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  useEffect(() => {
    console.log('Teams API endpoint:', apiUrl);
    fetch(apiUrl)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Fetched teams:', results);
      })
      .catch(err => {
        setError(err.message);
        console.error('Fetch error:', err);
      });
  }, [apiUrl]);

  const [selectedTeam, setSelectedTeam] = useState(null);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="display-6">Teams</h2>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>Refresh</button>
      </div>
      {error ? (
        <div className="alert alert-danger">Failed to load teams: {error}</div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team, idx) => (
                  <tr key={idx}>
                    <td>{team.name}</td>
                    <td>
                      <button className="btn btn-outline-info btn-sm" onClick={() => setSelectedTeam(team)}>
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

      {/* Modal for team details */}
      {selectedTeam && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{background: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Team Details</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelectedTeam(null)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> {selectedTeam.name}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedTeam(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;
