import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Typography from '@/resuable/Typography';
import styles from './index.module.css';

const Switch = ({ initial = false, onChange = (value:any) => {} }) => {
    const [isOn, setIsOn] = useState(initial);

    const toggleSwitch = () => {
        const newIsOn = !isOn;
        setIsOn(newIsOn);
        if (onChange) {
            onChange(newIsOn);
        }
    };

    return (
        <div
            onClick={toggleSwitch}
            style={{
                width: '55px',
                height: '28px',
                borderRadius: '14px',
                background: '#1A1A1A',
                display: 'flex',
                alignItems: 'center',
                justifyContent: isOn ? 'flex-end' : 'flex-start',
                padding: '0 5px',
                cursor: 'pointer'
            }}
        >
            <div
                style={{
                    width: '14px',
                    height: '14px',
                    background: isOn ? '#ECAC1A' : '#c0c0c0',
                    borderRadius: '50%',
                    transition: '0.3s',
                }}
            />
        </div>
    );
};

export default Switch;
