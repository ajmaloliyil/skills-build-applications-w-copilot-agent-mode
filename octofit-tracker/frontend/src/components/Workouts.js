import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
    : 'http://localhost:8000/api/workouts/';

  useEffect(() => {
    console.log('Workouts API endpoint:', apiUrl);
    fetch(apiUrl)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        const results = data.results || data;
        setWorkouts(results);
        console.log('Fetched workouts:', results);
      })
      .catch(err => {
        setError(err.message);
        console.error('Fetch error:', err);
      });
  }, [apiUrl]);

  const [selectedWorkout, setSelectedWorkout] = useState(null);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="display-6">Workouts</h2>
        <button className="btn btn-primary" onClick={() => window.location.reload()}>Refresh</button>
      </div>
      {error ? (
        <div className="alert alert-danger">Failed to load workouts: {error}</div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Duration (min)</th>
                  <th scope="col">Details</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout, idx) => (
                  <tr key={idx}>
                    <td>{workout.name}</td>
                    <td>{workout.description}</td>
                    <td>{workout.duration}</td>
                    <td>
                      <button className="btn btn-outline-info btn-sm" onClick={() => setSelectedWorkout(workout)}>
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

      {/* Modal for workout details */}
      {selectedWorkout && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" style={{background: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Workout Details</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setSelectedWorkout(null)}></button>
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> {selectedWorkout.name}</p>
                <p><strong>Description:</strong> {selectedWorkout.description}</p>
                <p><strong>Duration:</strong> {selectedWorkout.duration} min</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedWorkout(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workouts;
