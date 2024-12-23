import React, { useState } from 'react';
import './filter.scss';

function Filter({ onFilterChange }) {
  const [subscriptionType, setSubscriptionType] = useState('');

  const handleChange = (e) => {
    const { value } = e.target;
    setSubscriptionType(value);
    onFilterChange({ subscriptionType: value });
  };

  return (
    <div className="filter">
      <div className="item">
        <label htmlFor="subscriptionType">Subscription Type</label>
        <select
          name="subscriptionType"
          id="subscriptionType"
          value={subscriptionType}
          onChange={handleChange}
        >
          <option value="">Any</option>
          <option value="Basic">Basic</option>
          <option value="Advanced">Advanced</option>
          <option value="Pro">Pro</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;