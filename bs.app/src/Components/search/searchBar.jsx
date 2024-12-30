import React, { useState } from 'react';
import './searchBar.scss'; // Import SCSS

const SearchBar = () => {
  const [filters, setFilters] = useState({
    searchTerm: '',
  });
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/search?term=${filters.searchTerm}`);
      const data = await response.json();
      setResults(data.users.concat(data.gyms)); // Combine users and gyms results
      setShowModal(true); // Show modal on search
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="filters">
          <div className="item">
            <input
              type="text"
              id="searchTerm"
              name="searchTerm"
              value={filters.searchTerm}
              onChange={handleFilterChange}
              placeholder="Search..."
            />
          </div>
        </div>
        <button type="submit" className='search-button'>Search</button>
      </form>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>✖</button>
            <div className="search-results">
              {Array.isArray(results) && results.length > 0 ? (
                results.map((item, index) => (
                  <div key={index} className="result-item">
                    {/* Check if the item is a user */}
                    {item.username ? (
                      <div>
                        <p><strong>User:</strong> {item.username || 'No username'}</p>
                        {item.exercises && item.exercises.length > 0 ? (
                          <ul>
                            {item.exercises.map((exercise, exIndex) => (
                              <li key={exIndex}>
                                <p>{exercise.exerciseName || 'No exercise name'} - {exercise.sets} Sets, {exercise.reps} Reps</p>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No exercises found for this user.</p>
                        )}
                      </div>
                    ) : (
                      <div>
                        <p><strong>Gym:</strong> {item.name || 'No gym name'}</p>
                        <p><strong>Location:</strong> {item.location || 'No location'}</p>
                        <p><strong>Description:</strong> {item.description || 'No description'}</p>
                        <p><strong>Facilities:</strong> {item.facilities.join(', ') || 'No facilities'}</p>
                        {item.gymImage && (
                          <div>
                            <img src={item.gymImage} alt={item.name} style={{ width: '100%', height: 'auto' }} />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p>No results found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;







// import React, { useState } from 'react';

// const SearchBar = () => {
//   const [filters, setFilters] = useState({
//     searchTerm: '',
//   });
//   const [results, setResults] = useState([]);

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters({
//       ...filters,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`http://localhost:5000/search?term=${filters.searchTerm}`);
//       const data = await response.json();
//       setResults(data.users.concat(data.gyms)); // Combine users and gyms results
//     } catch (error) {
//       console.error('Error fetching search results:', error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <div className="filters">
//           <div className="item">
//             <label htmlFor="searchTerm">Search Term</label>
//             <input
//               type="text"
//               id="searchTerm"
//               name="searchTerm"
//               value={filters.searchTerm}
//               onChange={handleFilterChange}
//               placeholder="Search..."
//             />
//           </div>
//         </div>
//         <button type="submit" className="search-button">Search</button>
//       </form>
//       <div className="search-results">
//         {Array.isArray(results) && results.length > 0 ? (
//           results.map((item, index) => (
//             <div key={index} className="result-item">
//               {/* Check if the item is a user */}
//               {item.username ? (
//                 <div>
//                   <p><strong>User:</strong> {item.username || 'No username'}</p>
//                   {item.exercises && item.exercises.length > 0 ? (
//                     <ul>
//                       {item.exercises.map((exercise, exIndex) => (
//                         <li key={exIndex}>
//                           <p>{exercise.exerciseName || 'No exercise name'} - {exercise.sets} Sets, {exercise.reps} Reps</p>
//                         </li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <p>No exercises found for this user.</p>
//                   )}
//                 </div>
//               ) : (
//                 <div>
//                   <p><strong>Gym:</strong> {item.name || 'No gym name'}</p>
//                   <p><strong>Location:</strong> {item.location || 'No location'}</p>
//                   <p><strong>Description:</strong> {item.description || 'No description'}</p>
//                   <p><strong>Facilities:</strong> {item.facilities.join(', ') || 'No facilities'}</p>
//                   {item.gymImage && (
//                     <div>
//                       <img src={item.gymImage} alt={item.name} style={{ width: '100%', height: 'auto' }} />
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))
//         ) : (
//           <p>No results found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchBar;