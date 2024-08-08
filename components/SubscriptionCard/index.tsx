import React from "react";
import PropTypes from "prop-types";
import SubscriptionCard from "@/resuable/SubscriptionCard/SubscriptionCard";
import { Col, Row } from "react-bootstrap";

type Card = {
  heading: string;
  value: string;
  maxCoin: number;
  children: string;
  minCoin: number;
  id: any;
};

type PackagesCardProps = {
  cardData: Card[];
  handleDelete?: any;
  handleBuy?: any;
  handleUpdate?: any;
  handleEditRoute?: any;
};

const PackagesCard: React.FC<PackagesCardProps> = ({
  cardData,
  handleDelete,
  handleBuy,
  handleUpdate,
  handleEditRoute,
}) => {
  return (
    <div>
      <Row className="m-0 p-0">
        {cardData.length === 0 ? (
          <div
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "20px",
              borderRadius: "16px",
              textAlign: "center",
              width: "100%",
            }}
          >
            No record found.
          </div>
        ) : (
          cardData.map((card: any, index: any) => (
            <Col
              lg={6}
              md={6}
              sm={12}
              key={index}
              className="p-0"
              style={{ marginBottom: "10px" }}
            >
              <SubscriptionCard
                heading={card.title}
                value={`Minimum ${card.minCoin} SI-Coins - ${card.maxCoin}`}
                children={`Stake: ${card.percentage}%`}
                minCoin={card.minCoin}
                maxCoin={card.maxCoin}
                id={card._id}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                handleEditRoute={handleEditRoute}
                cardData={card}
              />
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default PackagesCard;
