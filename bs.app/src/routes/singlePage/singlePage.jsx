import "./singlePage.scss";
import Slider from "../../Components/slider/slider";
import Map from "../../Components/map/Map";
import { singlePostData, userData } from "../../lib/dummydata";

function SinglePage() {
  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={singlePostData.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{singlePostData.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="" />
                  <span>{singlePostData.address}</span>
                </div>
                <div className="price">$ {singlePostData.price}</div>
              </div>
              {/* <div className="user">
                <img src={userData.img} alt="" />
                <span>{userData.name}</span>
              </div> */}
            </div>
            <div className="bottom">{singlePostData.description}</div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/utility.png" alt="" />
              <div className="featureText">
                <span>...</span>
                <p>......</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>.....</span>
                <p>.....</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>.....</span>
                <p>..........................</p>
              </div>
            </div>
          </div>
          <p className="title">...</p>
          <div className="sizes">
            <div className="size">
              <img src="/size.png" alt="" />
              <span>...</span>
            </div>
            <div className="size">
              <img src="/bed.png" alt="" />
              <span>...</span>
            </div>
            <div className="size">
              <img src="/bath.png" alt="" />
              <span>....</span>
            </div>
          </div>
          <p className="title">....</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="" />
              <div className="featureText">
                <span>...</span>
                <p>....</p>
              </div>
            </div>
            <div className="feature">
              <img src="/pet.png" alt="" />
              <div className="featureText">
                <span>....</span>
                <p>....</p>
              </div>
            </div>
            <div className="feature">
              <img src="/fee.png" alt="" />
              <div className="featureText">
                <span>....</span>
                <p>.....</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[singlePostData]} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
