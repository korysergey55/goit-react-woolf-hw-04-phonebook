import React from 'react'
import styles from './styles.module.css'

const Filter = ({ filter, handleFilter }) => {
  return (
    <div className={styles.mainContainer} >
      <div className={styles.inputContainer}>
        <label className={styles.labelName} htmlFor="filter">
          Find contact by name
        </label>
        <input
          className={styles.inputName}
          name="filter"
          value={filter}
          type="text"
          id="filter"
          onChange={handleFilter}
        ></input>
      </div>
    </div >
  );
}

export default Filter;