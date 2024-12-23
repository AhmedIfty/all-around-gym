import { Link } from "react-router-dom";
import "./card2.scss";

// const getSubscriptionType = (fee) => {
//   if (fee <= 50) return 'Basic';
//   if (fee <= 100) return 'Advanced';
//   return 'Pro';
// };

const Card2 = ({ item, selectedSubscriptionType }) => {
  //const subscriptionType = getSubscriptionType(item.subscriptionFee);

  const subscriptionType = item.planType;

  if (selectedSubscriptionType && subscriptionType !== selectedSubscriptionType) {
    return null; // Do not render the card if it doesn't match the selected subscription type
  }

  return (
    <div className="card">
      {/* Gym Image */}
      <Link to={`/gym/${item.gymId}`} className="imageContainer">
        <img src={item.gymImage} alt={item.name} />
      </Link>

      {/* Gym Details */}
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/gym/${item.gymId}`}>{item.name}</Link>
        </h2>

        {/* Address */}
        <p className="address">
          <img src="https://media.istockphoto.com/id/1148705812/vector/location-icon-vector-pin-sign-isolated-on-white-background-navigation-map-gps-direction.jpg?s=612x612&w=0&k=20&c=lqEIzW3QedZfytsX30NoBJbHxZZbWnlLsvEiwOSbaow=" alt="Location Pin" />
          <span>{item.location}</span>
        </p>

        {/* Subscription Type */}
        <p className="subscriptionType"><strong>Subscription Type:</strong> {subscriptionType}</p>
        <p className="price"><strong>Subscription Fee:</strong> ${item.subscriptionFee}</p>

        {/* Facilities */}
        <div className="bottom">
          <div className="features">
            {item.facilities.map((facility, index) => (
              <div className="feature" key={index}>
                <span>{facility}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card2;

// import { Link } from "react-router-dom";
// import "./card2.scss";

// function Card2({ item }) {
//   return (
//     <div className="card">
//       <Link to={`/${item.id}`} className="imageContainer">
//         <img src={item.img} alt="" />
//       </Link>
//       <div className="textContainer">
//         <h2 className="title">
//           <Link to={`/${item.id}`}>{item.title}</Link>
//         </h2>
//         <p className="address">
//           <img src="/pin.png" alt="" />
//           <span>{item.address}</span>
//         </p>
//         <p className="price">$ {item.price}</p>
//         <div className="bottom">
//           <div className="features">
//             <div className="feature">
//               <span>....</span>
//             </div>
//             <div className="feature">
//               <span>...</span>
//             </div>
//           </div>
//           {/* <div className="icons">
//             <div className="icon">
//               <img src="/save.png" alt="" />
//             </div>
//             <div className="icon">
//               <img src="/chat.png" alt="" />
//             </div>
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Card2;
