import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from "./Notification.module.css";
import Typography from '@/resuable/Typography';
import Image from 'next/image';
import { fetchGetDataApi } from '@/utils/general';
import { NOTIFICATION_GREEN } from '@/utils/images';
import { Bars } from 'react-loader-spinner';
import moment from 'moment';
interface Notification {
  id: number;
  description: string;
  createdAt?: string;
}
function Notification() {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchGetDataApi("api/notification/list");
      setNotifications(response?.data?.result?.data || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Bars
        height="80"
        width="80"
        color="#ECAC1A"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass="loading-spinner-overlay"
        visible={loading}
      />
      <Container>
        <Typography variant='text28light'>
          Notifications
        </Typography>

        <Row>
          {notifications.map((data, index) => (
            <Col key={index} lg={12}>
              <div className={styles.notificationDiv}>
                <div className='d-flex'>
                  <div className={styles.notificationIcon}>
                    <Image src={NOTIFICATION_GREEN} alt="notification icon" width={50} height={50} style={{ height: '24px' }} />
                  </div>
                  <div className='mx-3'>
                    <Typography variant='text16'>
                      Notification
                    </Typography>
                    <Typography variant='text14notification'>
                      {data.description}
                    </Typography>
                  </div>
                </div>
                <div className="mt-2">
                    <Typography variant="text14notification">
                        <span style={{ fontSize: '11px', color: '#787878' }}>
                          {moment(data.createdAt).fromNow()}
                        </span>
                    </Typography>
                  </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default Notification;
