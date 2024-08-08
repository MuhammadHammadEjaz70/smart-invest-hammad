import React, { useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Bars } from "react-loader-spinner";
import axios from "axios";
import { UPLOAD_IMAGE } from "@/utils/images";
import BannerCardModule from "../Banners-Cards";
import Typography from "@/resuable/Typography";
import InputField from "../../resuable/InputField";
import Buttons from "../../resuable/Button/Button";
import { fetchGetDataApi } from "@/utils/general";

interface CoinData {
  currentValue: number;
  currentPercentage: number;
  // Add other relevant properties here
}

const DepositCoins = () => {
  const [depositType, setDepositType] = useState("coins");
  const [coins, setCoins] = useState("");
  const [amount, setAmount] = useState("");
  const [receipt, setReceipt] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState<CoinData | null>(null);

  const handleDepositTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDepositType(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setReceipt(e.target.files[0]);
    }
  };

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
    } finally {
      setLoading(false);
    }
  };

  const handleDepositRequest = async (e: React.FormEvent) => {
    e.preventDefault(); 
    setLoading(true);
    const formData = new FormData();
    if (receipt) {
      formData.append("receipt", receipt);
    }
    if (depositType === "coins") {
      formData.append("coins", coins);
    } else {
      formData.append("amount", amount);
    }
    try {
      const response = await axios.post(`api/deposit/deposit-request`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      });
      if (response.status === 200) {
        toast.success("Deposit request successful and sent to Admin");
        setLoading(false);
        window.location.reload();
        // Reset form fields
        setReceipt(null); // Assuming receipt is state variable for file upload
        setCoins("");    // Assuming coins is state variable for coins input
        setAmount("");   // Assuming amount is state variable for amount input
      }
    } catch (error: any) {
      console.error("Error occurred:", error);  // Log the error for debugging.
      if (error.response) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Withdraw - Smart Invest";
    fetchData();
  }, []);

  const calculateTotalValue = () => {
    if (!requests || !coins) return 0;
    return (parseFloat(coins) * requests.currentValue);
  };

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

      <BannerCardModule />
      <Row className="m-0">
        <Col md="12">
          <Typography variant="headingM" className="mt-3">
            Deposit
          </Typography>
          <Typography variant="headingS" className="mb-2">
            Admin's USTD Address: Edfrewesdsdsd21123
          </Typography>
          <form onSubmit={handleDepositRequest}>
            <Row className="mb-4">
          {/* <Col lg={6} md={6} sm={12} className="mb-2">
            <Form.Group controlId="depositTypeSelect">
              <Form.Label style={{ color: "white" }}>
                Select Deposit Type
              </Form.Label>
              <Form.Select
                aria-label="Default select example"
                required
                style={{
                  background: "#151515",
                  color: "#C0C0C0",
                  height: "64px",
                  borderColor: "#2e2e2e",
                }}
                onChange={handleDepositTypeChange}
                className="my-2"
                value={depositType}
              >
                <option value="coins">Coins</option>
                <option value="amount">Amount</option>
                </Form.Select>
                </Form.Group>
              </Col> */}
              {/* <Col lg={6} md={6} sm={12}>
                  <InputField
                    label="Number Of Coins"
                    placeholder="Coins"
                    value="Coins"
                    name="coins"
                    onChange={(e) => setCoins(e.target.value)}
                    type="number"
                    mode="dark"
                    required={true}
                    readOnly={true}
                  />
                </Col> */}
              {depositType === "coins" ? (
                <Col lg={12} md={12} sm={12}>
                  <InputField
                    label="Number Of Coins"
                    placeholder=""
                    value={coins}
                    name="coins"
                    onChange={(e) => setCoins(e.target.value)}
                    type="number"
                    mode="dark"
                    required={true}
                  />
                </Col>
              ) : (
                <Col lg={12} md={12} sm={12}>
                  <InputField
                    label="Amount"
                    placeholder=""
                    value={amount}
                    name="amount"
                    onChange={(e) => setAmount(e.target.value)}
                    type="number"
                    mode="dark"
                    required={true}
                  />
                </Col>
              )}
              {!coins.length !== true ?
              <Col lg={12} md={12} sm={12} className="text-center">
                <Typography variant="text20danger">
                  Amount to be paid: ${calculateTotalValue()}
                </Typography>
              </Col> : null}

              <Col lg={12} md={12} sm={12} >
                <Form.Group controlId="uploadScreenshot">
                  <div style={{ position: "relative", width: "100%" }}>
                    <Buttons
                      image={UPLOAD_IMAGE}
                      children={receipt ? receipt.name : "Upload Screenshot"}
                      variant="upload-screenshot-btn"
                      width="100%"
                      height="64px"
                      type="button"
                    />
                    <Form.Control
                      type="file"
                      required
                      onChange={handleFileChange}
                      accept="image/jpeg, image/png"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        opacity: 0,
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col
                lg={12}
                md={12}
                sm={12}
                style={{ display: "flex", justifyContent: "end", marginTop: '20px' }}
              >
                <Buttons
                  children="Submit"
                  variant="background"
                  width="100%"
                  type="submit"
                  height="64px"
                />
              </Col>
            </Row>
          </form>
        </Col>
      </Row>

    </>
  );
};

export default DepositCoins;
