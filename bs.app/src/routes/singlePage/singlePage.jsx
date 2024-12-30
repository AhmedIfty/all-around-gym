import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./singlePage.scss";
import Slider from "../../Components/slider/slider";
import Map from "../../Components/map/Map";

import redMarkerIcon from '../../Assects/red-marker.png';
import checkMarkerIcon from '../../Assects/checkMark.png';


function SinglePage() {
  const { id } = useParams(); // Extract gym ID from the URL
  const [gym, setGym] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGymDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/gyms/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch gym details.");
        }
        const data = await response.json();
        setGym(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchGymDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!gym) {
    return <div>No gym found.</div>;
  }

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={[gym.gymImage]} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{gym.name}</h1>
                <div className="address">
                <img src={redMarkerIcon} alt="Location" />
                  <span>{gym.location}</span>
                </div>
                <div className="price">$ {gym.subscriptionFee}</div>
              </div>
            </div>
            <div className="bottom">{gym.description}</div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">Facilities</p>
          <div className="listVertical">
            {gym.facilities.map((facility, index) => (
              <div className="feature" key={index}>
                <img src={checkMarkerIcon} alt="Location" />                
                <div className="featureText">
                  <span>{facility}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            {/* <Map items={[gym]} /> */}
            <Map items={[gym]} coordinates={gym.coordinates} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;



// import "./singlePage.scss";
// import Slider from "../../Components/slider/slider";
// import Map from "../../Components/map/Map";
// import { singlePostData, userData } from "../../lib/dummydata";

// function SinglePage() {
//   return (
//     <div className="singlePage">
//       <div className="details">
//         <div className="wrapper">
//           <Slider images={singlePostData.images} />
//           <div className="info">
//             <div className="top">
//               <div className="post">
//                 <h1>{singlePostData.title}</h1>
//                 <div className="address">
//                   <img src="/pin.png" alt="" />
//                   <span>{singlePostData.address}</span>
//                 </div>
//                 <div className="price">$ {singlePostData.price}</div>
//               </div>
//               {/* <div className="user">
//                 <img src={userData.img} alt="" />
//                 <span>{userData.name}</span>
//               </div> */}
//             </div>
//             <div className="bottom">{singlePostData.description}</div>
//           </div>
//         </div>
//       </div>
//       <div className="features">
//         <div className="wrapper">
//           <p className="title">General</p>
//           <div className="listVertical">
//             <div className="feature">
//               <img src="/utility.png" alt="" />
//               <div className="featureText">
//                 <span>...</span>
//                 <p>......</p>
//               </div>
//             </div>
//             <div className="feature">
//               <img src="/pet.png" alt="" />
//               <div className="featureText">
//                 <span>.....</span>
//                 <p>.....</p>
//               </div>
//             </div>
//             <div className="feature">
//               <img src="/fee.png" alt="" />
//               <div className="featureText">
//                 <span>.....</span>
//                 <p>..........................</p>
//               </div>
//             </div>
//           </div>
//           <p className="title">...</p>
//           <div className="sizes">
//             <div className="size">
//               <img src="/size.png" alt="" />
//               <span>...</span>
//             </div>
//             <div className="size">
//               <img src="/bed.png" alt="" />
//               <span>...</span>
//             </div>
//             <div className="size">
//               <img src="/bath.png" alt="" />
//               <span>....</span>
//             </div>
//           </div>
//           <p className="title">....</p>
//           <div className="listHorizontal">
//             <div className="feature">
//               <img src="/school.png" alt="" />
//               <div className="featureText">
//                 <span>...</span>
//                 <p>....</p>
//               </div>
//             </div>
//             <div className="feature">
//               <img src="/pet.png" alt="" />
//               <div className="featureText">
//                 <span>....</span>
//                 <p>....</p>
//               </div>
//             </div>
//             <div className="feature">
//               <img src="/fee.png" alt="" />
//               <div className="featureText">
//                 <span>....</span>
//                 <p>.....</p>
//               </div>
//             </div>
//           </div>
//           <p className="title">Location</p>
//           <div className="mapContainer">
//             <Map items={[singlePostData]} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SinglePage;
