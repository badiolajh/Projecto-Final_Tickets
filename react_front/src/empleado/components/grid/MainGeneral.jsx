import React from "react";
import styles from "./MainGeneral.module.css";

const MainGeneral = ({ titulo, children }) => {
  return (
    <main className={styles.main}>
      <h2 className={styles.title}>{titulo}</h2>
      <div className={styles.content}>{children}</div>
    </main>
  );
};

export default MainGeneral;
