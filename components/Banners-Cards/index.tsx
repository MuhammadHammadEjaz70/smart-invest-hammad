import React, { useEffect, useState } from "react";
import Banner from "@/resuable/Banners/Banner";
import Cards from "@/resuable/Card/Card";
import {
  BANNER_BG_IMAGE,
  P2P_COINS,
  SECOND_COIN,
  SUBSCRIPTION_COINS,
  WALLET,
} from "@/utils/images";
import { Col, Row } from "react-bootstrap";
import { fetchGetDataApi } from "@/utils/general";
import Typography from "@/resuable/Typography";
import { Bars } from "react-loader-spinner";

interface CoinData {
  currentValue: number;
  currentPercentage: number;
  // Add other relevant properties here
}

function BannerCardModule() {
  const [loading, setLoading] = useState(true);
  const [withdrawData, setWithdrawData] = useState({
    mycoins: 0,
    stakeCoins: 0,
    p2pCoins: 0,
    withdrawCoins: 0,
  });
  const [requests, setRequests] = useState<CoinData | null>(null);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetchGetDataApi("api/dashboard/coin");
      if (response) {
        setRequests({ 
          currentValue: response.data.result.currentValue, 
          currentPercentage: parseFloat(response.data.result.percentageChange)
      });      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }finally {
      setLoading(false);
    }
  };

  const withdrawCounter = [
    { heading: "My Coins", icon: SECOND_COIN, value: withdrawData.mycoins, borderColor: "orange", },
    { heading: "Stake Coins", icon: SUBSCRIPTION_COINS, value: withdrawData.stakeCoins, borderColor: "blue", },
    { heading: "P2P Coins", icon: P2P_COINS, value: withdrawData.p2pCoins, borderColor: "green", },
    { heading: "Hold Withdraw Coins", icon: WALLET, value: withdrawData.withdrawCoins, borderColor: "yellow", },
  ];

  const fetchWithdrawData = async () => {
    setLoading(true);
    try {
      const response = await fetchGetDataApi("api/dashboard/banner-counters");

      if (response && response.data) {
        setWithdrawData({
          mycoins: response.data.result.totalCoins || 0,
          stakeCoins: response.data.result.stakeCoins || 0,
          p2pCoins: response.data.result.p2pCoins || 0,
          withdrawCoins: response.data.result.withdrawCoins || 0,
        });
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Withdraw - SmartInvest";
    fetchWithdrawData();
  }, []);

  return (
    <>
    <Bars
        height="80"
        width="80"
        color="#ECAC1A"
        ariaLabel="bars-loading"
        wrapperStyle={{}} 
        wrapperClass="loading-spinner-overlay"
        visible={loading}
      />
    <Row className="m-0 p-0">
      <Col lg={6} className="mt-3">
        {requests ? (
          <Banner
            variant="chart-banner"
            className="banner-bg-image"
            children="Smart Invest Coin Value"
            value={requests.currentValue}
            percentage={requests.currentPercentage}
          />
        ) : (
          <Typography variant='text20light'>
            Loading coin data...
          </Typography>
        )}
      </Col>
      <Col lg={6} className="mt-3">
        <Row>
          {withdrawCounter.map((card, index) => (
            <Col lg={6} key={index}>
              <Cards
                heading={card.heading}
                icon={card.icon}
                value={card.value}
                borderColor={card.borderColor} // Pass the borderColor prop
              />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
    </>
  );
}

export default BannerCardModule;
