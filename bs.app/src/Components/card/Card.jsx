import { useState } from "react";
import { Link } from "react-router-dom";
import "./card.scss";


const Card = ({ item, deleteExercise }) => {
  const [counter, setCounter] = useState(item.sets || 0);
  const [inputValue, setInputValue] = useState(item.reps || 0);

  const handleIncrease = () => setCounter(counter + 1);
  const handleDecrease = () => counter > 0 && setCounter(counter - 1);

  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:5000/updateExercise', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          exerciseId: item.exerciseId,
          sets: counter,
          reps: inputValue,
        }),
      });

      if (response.ok) {
        console.log('Exercise updated successfully');
      } else {
        console.error('Failed to update exercise');
      }
    } catch (error) {
      console.error('Error updating exercise:', error);
    }
  };

  return (
    <div className="card">
      <div className="imageContainer">
        <img src={item.exerciseImage  || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMRA3V1FYSEcmJMcQXmi9XgJXyRGYVh70o0Q&s"} 
        alt={item.exerciseName || "Exercise Image"} />
      </div>
      <div className="textContainer">
        <h2 className="title">{item.exerciseName}</h2>
        <div className="Middle">
          <button className="deleteButton" onClick={() => deleteExercise(item.exerciseId)}>
            X
          </button>
        </div>
        <div className="bottom">
          <div className="counterWithButtons">
            <button className="counterButton" onClick={handleDecrease}>
              -
            </button>
            <span className="counterValue">{counter}</span>
            <button className="counterButton" onClick={handleIncrease}>
              +
            </button>
            <span className="counterLabel">Sets</span>
            <button className="counterButton" onClick={handleSave}>
              ✓
            </button>
          </div>
          <div className="counter">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(Number(e.target.value))}
              min="0"
              className="inputCounter"
            />
            <span className="counterLabel">Reps</span>
            <button className="counterButton" onClick={handleSave}>
              ✓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;





// function Card({ item }) {

//   const [counter, setCounter] = useState(0);
//   const [inputValue, setInputValue] = useState(0);
//   const handleIncrease = () => {
//     setCounter(counter + 1);
//   };
//   const handleDecrease = () => {
//     if (counter > 0) {
//       setCounter(counter - 1);
//     }
//   };

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     if (value === "" || !isNaN(value)) {
//       setInputValue(value);
//     }
//   };
//   const handleInputBlur = () => {
//     if (inputValue === "") {
//       setInputValue(0);
//     } else {
//       setInputValue(parseInt(inputValue, 10));
//     }
//   };

//   return (
//     <div className="card">
//       <Link to={`/${item.id}`} className="imageContainer">
//         <img src={item.img} alt={item.title} />
//       </Link>
//       <div className="textContainer">
//         <h2 className="title">
//           <Link to={`/${item.id}`}>{item.title}</Link>
//         </h2>
//         <div className="bottom">
//         <div className="counterWithButtons">
//             <button className="counterButton" onClick={handleDecrease}>
//               -
//             </button>
//             <span className="counterValue">{counter}</span>
//             <button className="counterButton" onClick={handleIncrease}>
//               +
//             </button>
//             <span className="counterLabel">Sets</span>
//             <button className="counterButton" onClick={handleIncrease}>
//               ✓
//             </button>
//           </div>
//           <div className="counter">
            // <input
            //   type="number"
            //   value={inputValue}
            //   onChange={handleInputChange}
            //   onBlur={handleInputBlur}
            //   min="0"
            //   className="inputCounter"
            // />
            // <span className="counterLabel">Reps</span>
//             <button className="counterButton" onClick={handleIncrease}>
//               ✓
//             </button>
//           </div>
          
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Card;
