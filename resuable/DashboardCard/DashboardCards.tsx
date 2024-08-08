import React from "react";
import styles from "./Dashboard.module.css";
import Image from "next/image";

interface DashboardCardsProps {
  data: any;
}

const DashboardCards: React.FC<DashboardCardsProps> = ({ data }) => {
  return (
    <div className={styles.card}>
      <div
        className="d-flex justify-content-between"
        style={{ alignItems: "flex-start" }}
      >
        <div className={styles.icon}>
          <Image src={data.icon} alt="Icon" width={25} height={25} />
        </div>
        {/* Uncomment if needed */}
        {/* <Image src={data.image} alt="image" style={{ width: "25px" }} /> */}
      </div>
      <div className={styles.heading}>{data.count}</div>
      <div className={styles.value}>{data.name}</div>
    </div>
  );
};

export default DashboardCards;
