import { GIFT_IN_HAND, PRICE_TAG } from "@/utils/images";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import moment from "moment";

function MyNewTimer({ expiryTimestamp }) {
  const [rewardTime, setRewardTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [subscriptionTime, setSubscriptionTime] = useState({
    months: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Calculate time until next month
  const calculateRewardTime = () => {
    const now = moment();

    // Example expirationTimestamp format (adjust according to your actual data)
    const expirationTimestamp = moment(expiryTimestamp);

    // Add one month to the expirationTimestamp
    const nextMonth = expirationTimestamp.add(1, 'months').startOf('day');

    const days = nextMonth.diff(now, 'days');
    const hours = nextMonth.diff(now, 'hours') % 24;
    const minutes = nextMonth.diff(now, 'minutes') % 60;
    const seconds = nextMonth.diff(now, 'seconds') % 60;

    setRewardTime({
      days,
      hours,
      minutes,
      seconds,
    });
  };

  // Calculate time until subscription end (1 year from expiryTimestamp)
  const calculateSubscriptionTime = () => {
    const now = moment();

    // Example expiryTimestamp format (adjust according to your actual data)
    const expirationTimestamp = moment(expiryTimestamp);

    // Add one year to the expiryTimestamp
    const end = expirationTimestamp.add(1, 'years').startOf('day');

    const months = end.diff(now, 'months');
    const hours = end.diff(now, 'hours') % 24;
    const minutes = end.diff(now, 'minutes') % 60;
    const seconds = end.diff(now, 'seconds') % 60;

    setSubscriptionTime({
      months,
      hours,
      minutes,
      seconds,
    });
  };
  useEffect(() => {
    calculateRewardTime();
    calculateSubscriptionTime();
    const interval = setInterval(() => {
      calculateRewardTime();
      calculateSubscriptionTime();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeStyle = {
    background: 'linear-gradient(to bottom, #ECAC1A, #A0730D4D)',
    color: "white",
    padding: "10px",
    borderRadius: "10px",
    fontSize: "25px",
    textAlign: "center",
    margin: "5px",
    display: "inline-block",
    width: "40px",
  };

  const secondCounterTimeStyle = {
    background: '#4EE39D',
    color: "white",
    padding: "10px",
    borderRadius: "10px",
    fontSize: "25px",
    textAlign: "center",
    margin: "5px",
    display: "inline-block",
    width: "40px",
  };

  const labelStyle = {
    textTransform: "uppercase",
    color: "#fff",
    marginTop: "8px",
  };

  const splitDigits = (num, style) => {
    const digits = num.toString().padStart(2, "0").split("");
    return (
      <>
        {digits.map((digit, index) => (
          <div key={index} style={style}>
            {digit}
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <Row>
        <div className="my-2 mt-5">
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#fff', display: 'flex', alignItems: 'center' }}>
            <Image className="mx-2" src={GIFT_IN_HAND} alt="Next Rewards" /> Next Rewards
          </span>
        </div>
        <Col xs="auto" className="text-center">
          <div>{splitDigits(rewardTime.days, timeStyle)}</div>
          <div style={labelStyle}>Days</div>
        </Col>
        <Col xs="auto" className="text-center">
          <div>{splitDigits(rewardTime.hours, timeStyle)}</div>
          <div style={labelStyle}>Hr</div>
        </Col>
        <Col xs="auto" className="text-center">
          <div>{splitDigits(rewardTime.minutes, timeStyle)}</div>
          <div style={labelStyle}>Min</div>
        </Col>
        <Col xs="auto" className="text-center">
          <div>{splitDigits(rewardTime.seconds, timeStyle)}</div>
          <div style={labelStyle}>Sec</div>
        </Col>
      </Row>
      <Row>
        <div className="my-2 mt-3">
          <span style={{ fontSize: '14px', fontWeight: '500', color: '#fff', display: 'flex', alignItems: 'center' }}>
            <Image className="mx-2" src={PRICE_TAG} alt="Subscription End" /> Subscription End
          </span>
        </div>
        <Col xs="auto" className="text-center">
          <div>{splitDigits(subscriptionTime.months, secondCounterTimeStyle)}</div>
          <div style={labelStyle}>Mon</div>
        </Col>
        <Col xs="auto" className="text-center">
          <div>{splitDigits(subscriptionTime.hours, secondCounterTimeStyle)}</div>
          <div style={labelStyle}>Hr</div>
        </Col>
        <Col xs="auto" className="text-center">
          <div>{splitDigits(subscriptionTime.minutes, secondCounterTimeStyle)}</div>
          <div style={labelStyle}>Min</div>
        </Col>
        <Col xs="auto" className="text-center">
          <div>{splitDigits(subscriptionTime.seconds, secondCounterTimeStyle)}</div>
          <div style={labelStyle}>Sec</div>
        </Col>
      </Row>
    </>
  );
}

export default MyNewTimer;
