import React, { useState, useEffect } from "react";
import { fetchGetDataApi } from "@/utils/general";
import styles from "../index.module.css";

import {
  Col,
  Row,
} from "react-bootstrap";

import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Success from "../../../public/img/Group 1000005160.png";
import Typography from "@/resuable/Typography";
import BgImg from "@/resuable/backgroundImage";
import Buttons from "../../../resuable/Button/Button";
import { Bars } from "react-loader-spinner";

interface AccountVerificationSuccessProps {
  token: string;
}

const AccountVerificationSuccess: React.FC<AccountVerificationSuccessProps> = ({ token }) => {
  const router = useRouter();

  const [show, setShow] = React.useState(false);
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setloading(true);
    try {
      if (!token) {
        throw new Error("Token is undefined");
      }

      let replacedToken = token.replace(/ /g, "+");
      const response = await fetchGetDataApi(`api/auth/verify-code?token=${replacedToken}`);
      if (response.status === 200) {
        toast.success("Account verify successfull");
        router.push("/login");
      } else {
        toast.error("Failed to login");
      }
      if (response.status === 400) {
        toast.error(
          "This link is expired please enter your email again on the forget password page"
        );
      }
    } catch (error) {
      toast.error(
        "Reset Password Error"
      );
    } finally {
      setloading(false);
    }
  };


  useEffect(() => {
    document.title = "Verify Token - Smart Invest";
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
    <div style={{ contain: "paint" }}>
      <Row>
        <Col lg={4} md={4} sm={12} className={`p-0 ${styles.background}`}>
          <BgImg />
        </Col>

        <Col lg={8} md={8} sm={12} className={styles.pageHeight}>
          <div className={styles.formFull2}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "10px",
              }}
            >
              <Image src={Success} alt="success" />
            </div>

            <Typography variant="text26" className="text-center">
              Account Verified
            </Typography>

            <Typography variant="text20light" className="text-center">
              Your Account has been verified successfully!
            </Typography>
            <hr style={{ width: "100%" }} />
            <form onSubmit={handleSubmit} className={`w-100`}>
              <Buttons variant="signUp-btn" children="Back To Log In" width="100%" type="submit" />
              {/* </div> */}
            </form>

          </div>
        </Col>
      </Row>
    </div>
    </>
  );
};

export default AccountVerificationSuccess;
