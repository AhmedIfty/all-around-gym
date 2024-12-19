import { listData } from "../../lib/dummydata";
import "./listPage.scss";
import Filter from "../../Components/filter/Filter";
import Card2 from "../../Components/card2/Card2";
import Map from "../../Components/map/Map";

function ListPage() {
  const data = listData;

  return <div className="listPage">
    <div className="listContainer">
      <div className="wrapper">
        <Filter/>
        {data.map(item=>(
          <Card2 key={item.id} item={item}/>
        ))}
      </div>
    </div>
    <div className="mapContainer">
      <Map items={data}/>
    </div>
  </div>;
}

export default ListPage;