import React, { useEffect, useState } from 'react';
import './list.scss';
import Card from '../card/Card';
import axios from 'axios';

function List() {
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch('http://localhost:5000/exercises', {
          method: 'GET',
          credentials: 'include', // Include cookies to access the session
        });

        if (response.ok) {
          const data = await response.json();
          setExercises(data);
        } else {
          setError("Failed to fetch exercises. Please log in.");
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
      }
    };

    fetchExercises();
  }, []);

  const deleteExercise = async (exerciseId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/exercises/${exerciseId}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setExercises(exercises.filter(exercise => exercise.exerciseId !== exerciseId));
      } else {
        console.error('Failed to delete exercise');
      }
    } catch (error) {
      console.error('There was an error deleting the exercise!', error);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="list">
      {exercises.map((exercise) => (
        <Card key={exercise.exerciseId} item={exercise} deleteExercise={deleteExercise} />
      ))}
    </div>
  );
}

export default List;



// import './list.scss'
// import Card from"../card/Card"
// import {listData} from"../../lib/dummydata"

// function List(){
//   return (
//     <div className='list'>
//       {listData.map(item=>(
//         <Card key={item.id} item={item}/>
//       ))}
//     </div>
//   )
// }

// export default List