// Card.tsx
import React from 'react';
import styles from './Card.module.css';
import Image from 'next/image';

interface CardProps {
  heading: string;
  icon: string;
  value: number;
  borderColor: string; 
}

const Cards: React.FC<CardProps> = ({ heading, icon, value, borderColor }) => {
  const cardClasses = [styles.card, styles[`border-${borderColor}`]].join(' ');

  return (
    <div className={cardClasses}>
      <span className={styles.heading}>{heading}</span>
      <span className={styles.icon}><Image src={icon} alt='image' /></span>
      <span className={styles.value}>{value}</span>
    </div>
  );
}

export default Cards;
