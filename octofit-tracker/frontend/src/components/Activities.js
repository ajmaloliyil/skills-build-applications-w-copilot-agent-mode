import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  useEffect(() => {
    console.log('Activities API endpoint:', apiUrl);
    fetch(apiUrl)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Fetched activities:', results);
      })
      .catch(err => {
        setError(err.message);
        console.error('Fetch error:', err);
      });
  }, [apiUrl]);

  const [selectedActivity, setSelectedActivity] = useState(null);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="display-6">Activities</h2>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>Refresh</button>
      </div>
      {error ? (
        <div className="alert alert-danger">Failed to load activities: {error}</div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Type</th>
                  <th scope="col">Duration (min)</th>
                  <th scope="col">Calories</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, idx) => (
                  <tr key={idx}>
                    <td>{activity.type}</td>
                    <td>{activity.duration}</td>
                    <td>{activity.calories}</td>
                    <td>
                      <button className="btn btn-outline-info btn-sm" onClick={() => setSelectedActivity(activity)}>
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

      {/* Modal for activity details */}
      {selectedActivity && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{background: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Activity Details</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelectedActivity(null)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Type:</strong> {selectedActivity.type}</p>
                <p><strong>Duration:</strong> {selectedActivity.duration} min</p>
                <p><strong>Calories:</strong> {selectedActivity.calories}</p>
                {selectedActivity.user && (
                  <p><strong>User:</strong> {selectedActivity.user.username}</p>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedActivity(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;
