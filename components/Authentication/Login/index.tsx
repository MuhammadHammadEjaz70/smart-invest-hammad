import React, { useState, useEffect } from "react";
import { postDataToApi } from "@/utils/general";
import styles from "../index.module.css";
import { Col, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../../../resuable/InputField";
import Typography from "@/resuable/Typography";
import { useDispatch } from "react-redux";
import BgImg from "@/resuable/backgroundImage";
import Buttons from "../../../resuable/Button/Button";
import { setCoins } from "@/components/coinsSlice";
import { Bars } from "react-loader-spinner";
import { setImageUrl } from "@/components/imageSlice";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [show, setShow] = React.useState(false);
  const dispatch=useDispatch();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    document.title = "Login -Smart Invest";
  }, []);

  const handleSignIn = async (event: any) => {
    event.preventDefault();
    setloading(true);
    try {
      const response = await postDataToApi(`api/auth/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        setloading(false);
        toast.success("Login Successful");
        localStorage.setItem("userToken", response.data.result.token);
        localStorage.setItem("userEmail", response.data.result.email);
        localStorage.setItem("userName", response.data.result.user.username);
        localStorage.setItem("userId", response.data.result._id);
        localStorage.setItem("userType", response?.data?.result?.role);
        localStorage.setItem("coins", response?.data?.result?.user?.swiftId?.coins);
        dispatch(setCoins(response?.data?.result?.user?.swiftId?.coins));
        dispatch(setImageUrl(response?.data?.result?.user?.profilePicture));
        router.push("/dashboard");
      } else {
        setloading(false);
        toast.error("Failed to Login");
      }
    } catch (error: any) {
      setloading(false);
      if (error.response) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
      } else {
        toast.error("Failed To Login!");
      }
      console.error("Error Fetching Response: ", error);
    }
  };
  const handleLoginClick = () => {
    router.push("/signup");
  };
  const handleForgotPasswordClick = () => {
    router.push("/forget-password");
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
        <div className={`d-flex mt-3 mr-2 justify-content-end`}>
          <Typography variant="text14" className="mx-2">
            Don't have an account?
          </Typography>
          <Typography
            variant="text14Link"
            className="pr-2"
            handleClick={handleLoginClick}
          >
            Sign Up
          </Typography>
        </div>

        <div className={styles.formFull2}>
          <Typography variant="text26" className="text-center">
            Log In Your Account
          </Typography>

          <Typography variant="text20light" className="text-center">
            Welcome To The Smart Invest
          </Typography>

          <form onSubmit={handleSignIn} className="w-100">
            <hr />
            <InputField
              label="Email / Username"
              placeholder="Enter Email Address"
              value={email}
              name="email"
              onChange={(event) => setEmail(event.currentTarget.value)}
              type="email"
              mode="light"
              required={true}
            />

            <InputField
              label="Password"
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={(event) => setPassword(event.currentTarget.value)}
              type="password"
              mode="light"
              required={true}
            />
            <Typography
              variant="forgotLink"
              handleClick={handleForgotPasswordClick}
            >
              Forgot Password?
            </Typography>
            <Buttons
              variant="signUp-btn"
              children="Login"
              width="100%"
              type="submit"
            />
          </form>
        </div>
      </Col>
    </Row>
    </>
  );
};

export default Login;
