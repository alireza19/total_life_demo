import React, { useState } from 'react';

function TimeRangeFilter({ onFilterChange }) {
  const [selectedRange, setSelectedRange] = useState('today');

  const handleFilterChange = (e) => {
    const range = e.target.value;
    setSelectedRange(range);
    onFilterChange(range);
  };

  return (
    <div className="time-range-filter">
      <label htmlFor="timeRange">Select Time Range: </label>
      <select id="timeRange" value={selectedRange} onChange={handleFilterChange}>
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
      </select>
    </div>
  );
}

export default TimeRangeFilter;
