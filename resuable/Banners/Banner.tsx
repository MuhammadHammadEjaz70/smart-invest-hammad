import React from 'react';
import { Row, Col } from 'react-bootstrap';
import styles from './Banner.module.css'; // Import the CSS module
import Image from 'next/image';
import { CHART_ARROW_DOWN, CHART_ARROW_UP, CHART_IMAGE, CHART_LINES, COIN } from '@/utils/images';
import { fetchGetDataApi } from '@/utils/general'; // Import your API utility function

interface BannerProps {
  variant: 'chart-banner' | 'banner-coins' | 'subscription-banner';
  icon?: any;
  children?: React.ReactNode;
  className?: string;
  value?: number;
  percentage?: number; // Change from Number to number
}

const Banner: React.FC<BannerProps> = ({ variant, className, children, value, percentage }) => {

  const formatPercentage = () => {
    if (percentage === undefined || isNaN(percentage)) {
      return 'N/A';
    }
    return percentage.toFixed(2);
  };

  return (
    <div className={styles['banner-bg-img']}>
      <div className={`${styles.banner} ${styles[variant]} ${className || ''}`}>
        <div className={styles['banner-icon']}>
          <Image src={COIN} alt='coin' style={{ width: '25px' }} />
        </div>
        <span className={styles['banner-text']}>USD {value}</span>
        <div className={styles['banner-children']}>{children}</div>
        <div className={styles.bannerChart}>
          <Image src={CHART_LINES} alt='line' className='mx-2' />
          <span className='mx-3 mt-4 d-flex' style={{ fontSize: '14px', fontWeight: '400', color: '#fff' }}>
            {percentage !== undefined && (
              <>
                {percentage > 0 ? <Image src={CHART_ARROW_UP} alt='up' /> : <Image src={CHART_ARROW_DOWN} alt='down' />}
                {formatPercentage()}
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Banner;
