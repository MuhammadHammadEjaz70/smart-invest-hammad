import SubscriptionTimerCard from "@/resuable/SubscriptionTimer/SubscriptionTimerCard";
import MyNewTimer from "@/resuable/Timer";
import Typography from "@/resuable/Typography";
import { ROCKET } from "@/utils/images";
import { fetchGetDataApi } from "@/utils/general";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Link from "next/link";
import Buttons from "../../resuable/Button/Button";
import moment from "moment";
import { Bars } from "react-loader-spinner";

function Index() {
  const [loading, setLoading] = useState(false);
  const [subs, setSubs] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    from: 1,
    to: 10,
    total: 0,
  });

  useEffect(() => {
    document.title = "Withdraw - Smart Invest";
    fetchData();
  }, []);

  const getFinalDate = (date: any): string => {
    const inputDate = moment(date);
    const finalDate = inputDate.add(1, 'years');
    const formattedDate = finalDate.format('DD MMMM YYYY');
    return formattedDate;
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchGetDataApi(`api/subscription/list`);
      if (response.data.data) {
        setSubs(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }finally {
      setLoading(false);
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
      <Row className="m-0">

        <Col lg={12} md={12} sm={12}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Typography variant="text28light" className="text-left">
              My Subscriptions
            </Typography>
            <Link href="/subscription-plan-list">
              <div className="mt-3">
                <Buttons
                  variant="button-background"
                  children="Add Subscription"
                />
              </div>
            </Link>
          </div>
          {subs.length === 0 ? (
            <div
              style={{
                backgroundColor: "black",
                color: "white",
                padding: "20px",
                borderRadius: "16px",
                textAlign: "center",
              }}
            >
              No record found.
            </div>
          ) : (
            subs.map((sub: any, index: any) => (
              <Row
                className="mx-0 mb-2"
                key={index}
                style={{
                  backgroundColor: "#151515",
                  borderRadius: "16px",
                  padding: "25px 10px",
                  border: "1px solid #2E2E2E",
                }}
              >
                <Col lg={6} md={12} sm={12}>
                  <SubscriptionTimerCard
                    heading={sub?.vaultId?.title}
                    text={`Minimum ${sub?.vaultId?.minCoin} SI-Coins - ${sub?.vaultId?.maxCoin}`}
                    stakedCoins={`Staked Coins ${sub?.coins} `}
                    value={`Stake: ${sub.vaultId.percentage}%`}
                    subsEndText={`Subscription End: ${getFinalDate(sub.createdAt)}`}
                  />
                </Col>
                <Col lg={6} md={12} sm={12}>
                  <MyNewTimer expiryTimestamp={sub.createdAt} />
                </Col>
              </Row>
            ))
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Index;
