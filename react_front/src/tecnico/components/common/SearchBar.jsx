import React from "react";
import styles from "./SearchBar.module.css";

const SearchBar = ({ placeholder = "Buscar...", onChange }) => {
  return (
    <div className={styles.searchWrapper}>
      <label className={styles.label}>Buscar</label>
      <input
        type="text"
        className={styles.searchInput}
        placeholder={placeholder}
        onChange={e => onChange?.(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
