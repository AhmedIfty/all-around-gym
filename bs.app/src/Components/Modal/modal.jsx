import React, { useState } from 'react';
import './modal.scss';

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [workoutName, setWorkoutName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      workoutName,
      sets,
      reps,
    };

    
    onSubmit(formData); // Pass data back to the parent component
    onClose(); // Close the modal after submit
    window.location.reload();
  };

  if (!isOpen) return null; // Do not render the modal if not open

  return (
    <div className="modalOverlay">
      <div className="modalContent">
        <h2>Add New Workout</h2>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label>Workout Name</label>
            <input
              type="text"
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <label>Number of Sets</label>
            <input
              type="number"
              value={sets}
              onChange={(e) => setSets(e.target.value)}
              required
            />
          </div>
          <div className="formGroup">
            <label>Number of Reps</label>
            <input
              type="number"
              value={reps}
              onChange={(e) => setReps(e.target.value)}
              required
            />
          </div>
          <div className="buttonGroup">
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
