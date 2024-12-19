import "./filter.scss";

function Filter() {
  return (
    <div className="filter">
      <h1>
        Search results for <b>London</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">Location</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City Location"
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">...</label>
          <select name="type" id="type">
            <option value="">...</option>
            <option value="buy">...</option>
            <option value="rent">...</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="property">...</label>
          <select name="property" id="property">
            <option value="">...</option>
            <option value="apartment">...</option>
            <option value="house">...</option>
            <option value="condo">...</option>
            <option value="land">...</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="minPrice">...</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="any"
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">...</label>
          <input
            type="text"
            id="maxPrice"
            name="maxPrice"
            placeholder="any"
          />
        </div>
        <div className="item">
          <label htmlFor="bedroom">...</label>
          <input
            type="text"
            id="bedroom"
            name="bedroom"
            placeholder="any"
          />
        </div>
        <button>
          <img src="/search.png" alt="" />
        </button>
      </div>
    </div>
  );
}

export default Filter;
