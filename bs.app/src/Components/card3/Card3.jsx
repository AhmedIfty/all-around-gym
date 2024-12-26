import React, { useEffect, useState } from 'react';
import './card3.scss';

const MatchingWorkoutCard = ({ workoutName }) => {
  const [matchingUsers, setMatchingUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMatchingUsers = async () => {
      try {
        const response = await fetch(`http://localhost:5000/matching-workouts?workoutName=${workoutName}`, {
          method: 'GET',
          credentials: 'include', // Include cookies to access the session
        });

        if (response.ok) {
          const data = await response.json();
          setMatchingUsers(data);
        } else {
          setError('Failed to fetch matching users.');
        }
      } catch (err) {
        setError('Something went wrong. Please try again.');
      }
    };

    if (workoutName) {
      fetchMatchingUsers();
    }
  }, [workoutName]);

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (matchingUsers.length === 0) {
    return <div className="no-matches">No matching users found for "{workoutName}".</div>;
  }

  return (
    <div className="matchingWorkoutCard">
      <h3>Users Matching "{workoutName}"</h3>
      <ul>
        {matchingUsers.map((user) => (
          <li key={user._id}>
            <div className="userCard">
              <h4>{user.username}</h4>
              <p>Email: {user.email}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchingWorkoutCard;
