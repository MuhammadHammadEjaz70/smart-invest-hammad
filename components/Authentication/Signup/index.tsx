import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "../index.module.css";
import { postDataToApi } from "@/utils/general";
import InputField from "../../../resuable/InputField";
import Typography from "@/resuable/Typography";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Buttons from "../../../resuable/Button/Button";
import BgImg from "@/resuable/backgroundImage";
import { Bars } from "react-loader-spinner";

function Signup() {
  const [loading, setloading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    referalId: "",
    phantomAddress: "",
    fullname: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  //apis goes here
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setloading(true);
    try {
      const response = await postDataToApi(`api/auth/sign-up`, {
        ...formData,
      });

      if (response.status === 200) {
        const role = response.data.result?.role;
        setloading(false);
        toast.success("Verify yourself by the email we sent");
        // localStorage.setItem("userToken", response.data.token);
        // localStorage.setItem("userEmail", response.data.result.email);
        // localStorage.setItem("userId", response.data.result._id);
        // localStorage.setItem("userType", response?.data?.result?.role);
        // localStorage.setItem("userName", response.data.result.firstName);
        // localStorage.setItem("companyId", response.data.result?.companyId);
        // localStorage.setItem("lead", response.data.result?.isLead);
        router.push("/login");
      } else {
        setloading(false);
        toast.error("Failed to Signup");
      }
    } catch (error: any) {
      setloading(false);
      if (error.response) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
      } else {
        toast.error("Failed to Signup!");
      }
      console.error("Error Fetching Response: ", error);
    }finally {
      setloading(false);
    }
  };
  const router = useRouter();

  const handleLoginClick = () => {
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
        <BgImg />
      </Col>
      <Col lg={8} md={8} sm={12} className={styles.pageHeight}>
        <div className={`d-flex mt-3 justify-content-end mr-2`}>
          <Typography variant="text14" className="mx-2">
            Already have an account?
          </Typography>
          <Typography
            variant="text14Link"
            className="pr-2"
            handleClick={handleLoginClick}
          >
            Log In
          </Typography>
        </div>
        <div className={styles.formFull}>
          <Typography variant="text26" className="text-center">
            Create Your Account
          </Typography>

          <Typography variant="text20light" className="text-center">
            Welcome To The Smart Invest
          </Typography>

          <form onSubmit={handleSubmit} className="w-100">
            <hr />
            <InputField
              label="Email Address"
              name="email"
              placeholder="Enter Email Address"
              value={formData.email}
              onChange={handleChange}
              type="email"
              mode="light"
              required={true}
            />
            <Row>
              <Col md={6} sm={12}>
                <InputField
                  label="Username"
                  name="username"
                  placeholder="Enter Username"
                  value={formData.username}
                  onChange={handleChange}
                  type="text"
                  mode="light"
                  required={true}
                />
              </Col>

              <Col md={6} sm={12}>
                <InputField
                  label="Full Name"
                  name="fullname"
                  placeholder="Enter Full Name"
                  value={formData.fullname}
                  onChange={handleChange}
                  type="text"
                  mode="light"
                  required={true}
                />
              </Col>
            </Row>

            <InputField
              label="Password"
              placeholder="Enter Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              mode="light"
              required={true}
            />

            <InputField
              label="Referral ID (Optional)"
              placeholder="Enter Smart ID"
              name="referalId"
              value={formData.referalId}
              onChange={handleChange}
              type="text"
              mode="light"
            />

            <InputField
              label="Phantom Wallet Address"
              placeholder="Enter Phantom Wallet Address"
              name="phantomAddress"
              value={formData.phantomAddress}
              onChange={handleChange}
              type="text"
              mode="light"
              required={true}
            />
            <Buttons
              type="submit"
              variant="signUp-btn"
              children="SIGN UP"
              width="100%"
            />
          </form>
        </div>
      </Col>
    </Row>
    </>
  );
}

export default Signup;
