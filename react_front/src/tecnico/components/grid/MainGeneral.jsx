import React from "react";
import styles from "./MainGeneral.module.css";

const MainGeneral = ({ titulo, children }) => {
  return (
    <main className={styles.main}>
      <div className={styles.content}>{children}</div>
    </main>
  );
};

export default MainGeneral;
