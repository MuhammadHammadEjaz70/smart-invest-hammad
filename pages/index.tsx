import React from 'react';
import TopBar from "@/components/TopBar/TopBar";
import Section from '@/components/Sections/Section';
import Main from '@/components/MainSection/Main/Main';
import styles from "./index.module.css"

const Home: React.FC = () => {
  return (
    <>
      <div className={`section-content m-0 ${styles.content}`}>
        <div className={styles.bodyContent}>
          <TopBar />
          <Main />
          <Section />
        </div>
      </div>
    </>
  );
}

export default Home;
