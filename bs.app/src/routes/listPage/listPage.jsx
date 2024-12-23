import { useState, useEffect } from "react";
import axios from "axios"; // Import axios to make HTTP requests
import "./listPage.scss";
import Filter from "../../Components/filter/Filter";
import Card2 from "../../Components/card2/Card2";
import Map from "../../Components/map/Map";

function ListPage() {
  // Define state for storing gym data
  const [gyms, setGyms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});

  // Fetch gym data from the backend when the component mounts or filters change
  useEffect(() => {
    const fetchGyms = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/gyms", {
          params: filters,
        });
        setGyms(response.data); // Set the gym data to the state
      } catch (err) {
        setError("Error fetching gym data");
      } finally {
        setLoading(false);
      }
    };

    fetchGyms();
  }, [filters]);

  // Handle loading and error states
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="listPage">
      <div className="listContainer">
        <div className="wrapper">
          <Filter onFilterChange={handleFilterChange} />
          {gyms.map((gym) => (
            <Card2 key={gym._id} item={gym} selectedSubscriptionType={filters.subscriptionType} /> // Pass selected subscription type to Card2 component
          ))}
        </div>
      </div>
      <div className="mapContainer">
        <Map items={gyms} />
      </div>
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