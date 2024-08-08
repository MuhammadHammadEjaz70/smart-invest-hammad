import React, { useState, useEffect } from "react";
import { postDataToApi } from "@/utils/general";
import styles from "../index.module.css";
import {
  Col,
  Row,
} from "react-bootstrap";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../../../resuable/InputField";
import Typography from "@/resuable/Typography";
import BgImg from "@/resuable/backgroundImage";
import Buttons from "../../../resuable/Button/Button";
import { Bars } from "react-loader-spinner";

const ForgotPassword = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [show, setShow] = React.useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    document.title = "Forgot Password -Smart Invest";
  }, []);

  const handleReset = async (event: any) => {
    setloading(true);
    event.preventDefault();
    try {
      const response = await postDataToApi("/api/auth/forgot-password", {
        email,
      });
      if (response.status === 200) {
        setloading(false);
        localStorage.setItem("userEmail", email);
        toast.success(response.data.message);
        router.push("/email-sent");
      } else {
        setloading(false);
        toast.error("Failed to Reset");
      }
    } catch (error: any) {
      setloading(false);
      if (error.response) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
      } else {
        toast.error("Failed To Reset!");
      }
      console.error("Error Fetching Response: ", error);
    }finally {
      setloading(false);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmail(event.target.value);
  };
  const handleRoute = () => {
    router.push("/login");
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
    <Row className="m-0">
      <Col lg={4} md={4} sm={12} className={`p-0 ${styles.background}`}>
        <div>
          <BgImg />
        </div>
      </Col>
      <Col lg={8} md={8} sm={12} className={styles.pageHeight}>
        <div className={styles.formFull2}>
          <Typography variant="text26" className="text-center">
            Forgot Password
          </Typography>
          <Typography variant="text20light" className="text-center">
            No worries, we’ll send you instructions for reset
          </Typography>
          <form onSubmit={handleReset} className={`w-100`}>
            <hr style={{ width: "100%" }} />
            <InputField
              label="Email Address"
              name="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={handleChange}
              type="email"
              mode="light"
              required={true}
            />
            <div className="mb-3">
              <Buttons variant="signUp-btn" children="Reset Password" width="100%" type="submit" />
            </div>
            <Buttons variant="back-to-login-btn" children="Back To Login" width="100%" onClick={handleRoute} />
          </form>
        </div>
      </Col>
    </Row>
    </>
  );
};

export default ForgotPassword;
