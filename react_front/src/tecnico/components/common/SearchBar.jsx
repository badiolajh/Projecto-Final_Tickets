import React from "react";
import styles from "./SearchBar.module.css";

const SearchBar = ({ placeholder = "Buscar...", onChange }) => {
  return (
    <input
      type="text"
      className={styles.search}
      placeholder={placeholder}
      onChange={e => onChange?.(e.target.value)}
    />
  );
};

export default SearchBar;
