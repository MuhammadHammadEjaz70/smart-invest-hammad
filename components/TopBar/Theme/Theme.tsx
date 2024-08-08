import React, { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import styles from "./Theme.module.css";

const Theme = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <>
      {/* <button onClick={toggleTheme} className={styles.theme}>
        <div className={`${styles.icon} ${theme === "dark" ? styles.sun : styles.moon}`}>
          <FiSun />
        </div>
        <div className={`${styles.icon} ${theme === "dark" ? styles.moon : styles.sun}`}>
          <FiMoon />
        </div>
      </button> */}
    </>
  );
};

export default Theme;
