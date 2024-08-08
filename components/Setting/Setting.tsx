// components/CustomTabs.js
import React, { useState } from 'react';
import styles from './Setting.module.css'; // Import the module CSS file for styling
import { ACTIVE_LOCK, LOCK, NOTIFICATION, USER } from '@/utils/images';
import Image from 'next/image';
import Typography from '@/resuable/Typography';
import Profile from './Profile';
import NotificationSettings from './NotificationSettings';
import ChangePassword from './ChangePassword';
import { Row } from 'react-bootstrap';

const Setting = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <Row className="m-0">
        <Typography variant='text28light'>
          Settings
        </Typography>
        <div className={styles.customTabs}>
          <div className={styles.tabContainer}>
            <div
              className={`d-flex ${styles.tab} ${activeTab === 'tab1' ? styles.active : ''}`}
              onClick={() => handleTabClick('tab1')}
            >
              <Image className={`mx-2 ${styles.notificationIcon}`} src={USER} alt='user' /> Profile
            </div>
            <div
              className={`d-flex ${styles.tab} ${activeTab === 'tab2' ? styles.active : ''}`}
              onClick={() => handleTabClick('tab2')}
            >
              <Image className={`mx-2 ${styles.notificationIcon}`} src={NOTIFICATION} alt="notification icon" /> Notification Setting
            </div>
            <div
              className={`d-flex ${styles.tab} ${activeTab === 'tab3' ? styles.active : ''}`}
              onClick={() => handleTabClick('tab3')}
            >
              {activeTab === 'tab3' ? <Image className={`mx-2 ${styles.notificationIcon}`} src={ACTIVE_LOCK} alt="notification icon" /> : <Image className={`mx-2 ${styles.notificationIcon}`} src={LOCK} alt="notification icon" />} Change Password
            </div>
          </div>
          <div className={styles.tabContent}>
            {activeTab === 'tab1' && <div><Profile /></div>}
            {activeTab === 'tab2' && <div><NotificationSettings /></div>}
            {activeTab === 'tab3' && <div><ChangePassword /></div>}
          </div>
        </div>
      </Row >
    </div>
  );
};

export default Setting;
