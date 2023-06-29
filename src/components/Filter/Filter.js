import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './Filter.module.css';

const Filter = ({ value, onChangeFilter }) => {
  const filterNameId = nanoid();
  return (
    <div className={css.container}>
      <div className={css.filter}>
        <label htmlFor={filterNameId}>Find contacts by name</label>
        <input
          type="text"
          value={value}
          name="name"
          placeholder="Enter name"
          id={filterNameId}
          onChange={onChangeFilter}
          required
        />
      </div>
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default Filter;
