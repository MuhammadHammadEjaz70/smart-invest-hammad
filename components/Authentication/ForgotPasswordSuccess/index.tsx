import React, { useState, useEffect } from "react";
import styles from "../index.module.css";

import {
  Col,
  Row,
} from "react-bootstrap";

import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import Typography from "@/resuable/Typography";
import BgImg from "@/resuable/backgroundImage";
import Buttons from "../../../resuable/Button/Button";

const ForgotPasswordSuccess = () => {
  const router = useRouter();

  const [email, setEmail] = useState<any>("");
  const [password, setPassword] = useState<string>("");
  const [show, setShow] = React.useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    document.title = "Forgot Password -Smart Invest";
    let email = localStorage.getItem("userEmail");
    setEmail(email);
  }, []);
  const handleRoute = () => {
    router.push("/login");
  };

  return (
    <div style={{ contain: "paint" }}>
      <Row>
        <Col lg={4} md={4} sm={12} className={`p-0 ${styles.background}`}>
          <BgImg />
        </Col>
        <Col lg={8} md={8} sm={12} className={styles.pageHeight}>
          <div className={styles.formFull2}>
            <Typography variant="text26" className="text-center">
              Forgot Password
            </Typography>
            <Typography variant="text20light" className="text-center">
              We’ve sent reset password link to your email {email}
            </Typography>
            <form className="w-100">
              <hr />
              <div className="mb-3">
                <Buttons variant="signUp-btn" onClick={handleRoute} children="Continue" width="100%" type="submit" />
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ForgotPasswordSuccess;
