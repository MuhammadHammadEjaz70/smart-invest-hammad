import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Typography from '@/resuable/Typography';
import styles from './index.module.css';
import Switch from '../Switch';
import { fetchGetDataApi, updateDataToApi } from '@/utils/general';
import { toast } from 'react-toastify';
import { Bars } from 'react-loader-spinner';

function NotificationSettings() {
    const [loading, setloading] = useState(false);
    const dummyData = [
        // { heading: "Bitcoin and Ethereum Movement", text: "You’ll be notified of important price milestones for Bitcoin and Ethereum." },
        // { heading: "Watchlist", text: "You’ll be notified of significant increase & decrease of coins in your watchlist." },
        { heading: "Updates & Promotions", text: "Receive important Smart Invest promotions and updates." },
        // { heading: "DEX Pair trade alerts", text: "You’ll be notified of significant trades on pairs you’ve subscribed to." },
    ];
    const id = typeof window != "undefined" ? localStorage.getItem("userId") : null;

    useEffect(() => {
        fetchUserData(id)
    }, [])
    const [value, setValue] = useState<any>(null);


    const fetchUserData = async (id: any) => {
        setloading(true);
        try {
            const response = await fetchGetDataApi(`api/user/show/${id}`);
            setValue(response.data.result?.notifyOnUpdates);
        } catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                toast.error(errorMessage);
            } else {
                toast.error("Request Failed For Show User Api !");
            }
            console.error("Error Fetching Response: ", error);
        }finally {
            setloading(false);
          }

    };

    const valueChange = async (value:any) => {

        const userData = new FormData();
        userData.append("notifyOnUpdates", value)

        setValue(value);
        setloading(true);
        try {
            const response = await updateDataToApi(`api/user/${id}`, userData);
            
            toast.success("Updated Successfully");
        } catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.message;
                toast.error(errorMessage);
            } else {
                toast.error("Request Failed For Show User Api !");
            }
            console.error("Error Fetching Response: ", error);
        }finally {
            setloading(false);
          }

    };
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
            <Typography variant='text20Profile'>
                Notification Settings
            </Typography>

            <Row>
                {dummyData.map((data, index) => (
                    <Col key={index} lg={12}>
                        <div className={styles.notificationDiv}>
                            <div className='mx-3 mb-2'>
                                <Typography
                                    children={data.heading}
                                    variant='text16'
                                />
                                <Typography
                                    variant='text14notification'
                                    children={data.text}
                                />
                            </div>

                            {value!=null ? 
                            <Switch initial={value} onChange={valueChange} />
                            : null}
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
}

export default NotificationSettings;
