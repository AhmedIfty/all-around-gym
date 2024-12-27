import React, { useEffect, useState } from 'react';
import List from '../../Components/list/List';
import Bmicalc from '../../Components/Bmi/bmi';
import Modal from '../../Components/Modal/modal';
import axios from 'axios';
import SearchBar from '../../Components/search/searchBar';
import './Profile.scss';

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [workoutTime, setWorkoutTime] = useState('');
  const [scheduledWorkouts, setScheduledWorkouts] = useState([]);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/profile', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          setScheduledWorkouts(data.workoutTimes || []);
        } else {
          setError("Failed to fetch user data. Please log in.");
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
      }
    };

    fetchUserData();
  }, []);

  // Fetch partner recommendations
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/matching-exercises', {
          method: 'GET',
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setRecommendations(data);
        } else {
          console.error('Failed to fetch recommendations');
        }
      } catch (err) {
        console.error('Error fetching recommendations:', err);
      }
    };

    fetchRecommendations();
  }, []);

  const handleCreateNewPostClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (formData) => {
    try {
      const response = await fetch('http://localhost:5000/addExercise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Exercise added:', result.message);
      } else {
        console.error('Failed to add exercise');
      }
    } catch (error) {
      console.error('Error submitting exercise:', error);
    }
  };

  const handleDeleteWorkout = async (workoutId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/workouts/${workoutId}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setScheduledWorkouts(scheduledWorkouts.filter(workout => workout._id !== workoutId));
        alert('Workout deleted successfully.');
      } else {
        console.error('Failed to delete workout');
      }
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };

  const handleWorkoutSubmit = async () => {
    if (!workoutTime) {
      alert('Please enter a valid workout time.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/add-workout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ time: workoutTime }),
      });

      if (response.ok) {
        const updatedUserData = await response.json();
        setScheduledWorkouts(updatedUserData.workoutTimes);
        setWorkoutTime('');
        alert('Workout time added successfully.');
      } else {
        alert('Failed to add workout time.');
      }
    } catch (error) {
      console.error('Error adding workout time:', error);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <button><a href="/ProfileUpdatePage">Update Profile</a></button>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img
                src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt=""
              />
            </span>
            <span>
              Username: <b>{userData.username}</b>
            </span>
            <span>
              E-mail: <b>{userData.email}</b>
            </span>
            <span>
              Personal trainer: <a href='/trainerprofile'>Lemon</a>
            </span>
          </div>

          <div className="title">
            <h1>Workout Schedule</h1>
          </div>
          <div className="workoutInput">
            <input
              type="datetime-local"
              value={workoutTime}
              onChange={e => setWorkoutTime(e.target.value)}
            />
            <button onClick={handleWorkoutSubmit}>Add Workout Time</button>
          </div>
          <div className="scheduledWorkouts">
            <h2>Scheduled Workouts</h2>
            {scheduledWorkouts.length > 0 ? (
              <ul>
                {scheduledWorkouts.map((workout, index) => (
                  <li key={index}>
                    {new Date(workout.time).toLocaleString()}
                    <button onClick={() => handleDeleteWorkout(workout._id)}>Delete</button>
                    </li>
                ))}
              </ul>
            ) : (
              <p>No workouts scheduled.</p>
            )}
          </div>

          <div className="title">
            <h1>Workouts</h1>
            <button onClick={handleCreateNewPostClick}>Add New Workout</button>
          </div>
          <List />
        </div>
      </div>
      <div className="mapContainer">
        <Bmicalc />
        <div className="partnerRecommendations">
          <h2>Partner Recommendations</h2>
          <div className="search_bar">
              <SearchBar />
          </div>
          {recommendations.length > 0 ? (
            recommendations.map((recommendation, index) => (
              <div key={index} className="recommendationCard">
                <h3>{recommendation.username}</h3>
                <p>Matching Exercises:</p>
                <ul>
                  {recommendation.matchingExercises.map((exercise, idx) => (
                    <li key={idx}>{exercise.exerciseName}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>No matching exercises found.</p>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}

export default ProfilePage;
