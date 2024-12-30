import { useState, useEffect } from "react";
import axios from "axios";
import "./listPage.scss";
import Filter from "../../Components/filter/Filter";
import Card2 from "../../Components/card2/Card2";
import Map from "../../Components/map/Map";
import SearchBar from "../../Components/search/searchBar";
import GymModal from "../../Components/gymModal/gymModal"; // Import GymModal

function ListPage() {
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [isGymModalOpen, setIsGymModalOpen] = useState(false);

  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/gyms", {
          params: filters,
        });
        setGyms(response.data);
      } catch (err) {
        setError("Error fetching gym data");
      } finally {
        setLoading(false);
      }
    };

    const checkSession = async () => {
      try {
        const sessionResponse = await axios.get("http://localhost:5000/api/session", {
          withCredentials: true, // Include cookies
        });
        if (sessionResponse.data.loggedIn && sessionResponse.data.user.role === "admin") {
          setIsAdmin(true);
        }
      } catch (err) {
        console.error("Error fetching session data:", err);
      }
    };

    fetchGyms();
    checkSession();
  }, [filters]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleOpenGymModal = () => {
    setIsGymModalOpen(true);
  };

  const handleCloseGymModal = () => {
    setIsGymModalOpen(false);
  };

  const handleGymSubmit = async (gymData) => {
    try {
      const response = await axios.post("http://localhost:5000/api/gyms", gymData, {
        withCredentials: true,
      });
      console.log("Gym added:", response.data);
  
      // Add the new gym to the state
      setGyms((prevGyms) => [...prevGyms, response.data]);
    } catch (error) {
      console.error("Error adding gym:", error);
    }
  };
  

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="searchbar">
          <SearchBar />
        </div>
        
        <div className="wrapper">
          <Filter onFilterChange={handleFilterChange} />
          {gyms.map((gym) => (
            <Card2
              key={gym._id}
              item={gym}
              selectedSubscriptionType={filters.subscriptionType}
            />
          ))}
        </div>

        {/* Add Gym button for admins */}
        {isAdmin && (
          <div className="addGymContainer">
            <button className="addGymButton" onClick={handleOpenGymModal}>
              Add Gym
            </button>
          </div>
        )}
      </div>
      <div className="mapContainer">
        <Map items={gyms} />
      </div>

      <GymModal
        isOpen={isGymModalOpen}
        onClose={handleCloseGymModal}
        onSubmit={handleGymSubmit}
      />
    </div>
  );
}

export default ListPage;




// import { listData } from "../../lib/dummydata";
// import "./listPage.scss";
// import Filter from "../../Components/filter/Filter";
// import Card2 from "../../Components/card2/Card2";
// import Map from "../../Components/map/Map";

// function ListPage() {
//   const data = listData;

//   return <div className="listPage">
//     <div className="listContainer">
//       <div className="wrapper">
//         <Filter/>
//         {data.map(item=>(
//           <Card2 key={item.id} item={item}/>
//         ))}
//       </div>
//     </div>
//     <div className="mapContainer">
//       <Map items={data}/>
//     </div>
//   </div>;
// }

// export default ListPage;