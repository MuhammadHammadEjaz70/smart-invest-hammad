import React from "react";
import styles from "./SubscriptionTimer.module.css";

interface SubscriptionTimerCardProps {
  heading: string;
  text: string;
  stakedCoins: String;
  value: string;
  subsEndText: string;
}

const SubscriptionTimerCard: React.FC<SubscriptionTimerCardProps> = ({
  heading,
  text,
  stakedCoins,
  value,
  subsEndText,
}) => {
  return (
    <div className="d-flex flex-column ">
      <div className={styles.heading}>{heading}</div>
      <div className={styles.value}>{text}</div>
      <div className={styles.value}>{stakedCoins}</div>
      <div className={styles.content}>{value}</div>
      <div className={styles.subsEndText}>{subsEndText}</div>
    </div>
  );
};

export default SubscriptionTimerCard;
