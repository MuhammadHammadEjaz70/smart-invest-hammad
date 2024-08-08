import React, { useState, useEffect } from "react";
import { postDataToApi } from "@/utils/general";
import styles from "./forget.module.css";

import {
  Col,
  Row,
} from "react-bootstrap";

import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import logo from "../../public/img/logo.svg";
import Success from "../../public/img/Group 1000005160.png";
import Typography from "@/resuable/Typography";
import { Bars } from "react-loader-spinner";

interface User {
  id: number;
  name: string;
  email: string;
}
const NewPasswordSuccess = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600); // 10 minutes timer
  const columns: { header: string; accessor: keyof User }[] = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
  ];

  const data: User[] = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com" },
  ];

  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [show, setShow] = React.useState(false);
  const [loading, setloading] = useState(false);

  const handleClick = () => setShow(!show);

  useEffect(() => {
    document.title = "Forgot Password -Smart Invest";
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
        const role = response.data.result?.role;
        const isLead = response.data.result?.isLead;
        setloading(false);
        if (response.data.result.isVerified === false) {
          localStorage.setItem("userToken", response.data.token);
          localStorage.setItem("userEmail", response.data.result.email);
          localStorage.setItem("userName", response.data.result.username);
          localStorage.setItem("userId", response.data.result._id);
          localStorage.setItem(
            "userPermissions",
            response.data.result.permissions
          );
          localStorage.setItem("userType", response?.data?.result?.role);
          handleOtpReset();

          router.push("/otp");
          toast.error(
            "Please Verify Your Account by entering the Otp we have sent to your email"
          );
        } else {
          toast.success("Login Successful");
          localStorage.setItem("userToken", response.data.token);
          localStorage.setItem("userEmail", response.data.result.email);
          localStorage.setItem("userId", response.data.result._id);
          localStorage.setItem("userType", response?.data?.result?.role);
          localStorage.setItem("userName", response.data.result.firstName);
          localStorage.setItem("companyId", response.data.result?.companyId);
          localStorage.setItem("lead", response.data.result?.isLead);

          if (response.data.result?.firstLogn === false) {
            router.push("/dashboard");
          } else {
            router.push("/firstPasswordChange");
          }
        }
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
  const handleOtpReset = async () => {
    try {
      const email = localStorage.getItem("userEmail");
      const response = await postDataToApi(
        `api/auth/resend-otp?email=${email}`
      );
    } catch (error) {
      toast.error(
        `Otp Error: ${error}`
      );
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleRoute = (event: any) => {
    event.preventDefault();
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
    <div style={{ contain: "paint" }}>
      <Row>
        <Col lg={4} md={4} sm={12} className={styles.background}>
          <div style={{ padding: "40px 37px" }}>
            <Image src={logo} alt="facebook" />
          </div>
        </Col>

        <Col lg={8} md={8} sm={12} className={styles.pageHeight}>
          <div style={{ marginTop: "120px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "10px",
              }}
            >
              <Image src={Success} alt="success" />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              className=""
            >
              <Typography variant="text26" className="text-center">
                {" "}
                Password Changed{" "}
              </Typography>

              <Typography variant="text20light" className="text-center">
                {" "}
                Your password has been changed successfully!{" "}
              </Typography>
              <hr style={{ width: "60%" }} />
            </div>
            <form className={`${styles.formContainer}`}>
              <button
                type="submit"
                className={styles.signUpBtn}
                onClick={handleRoute}
              >
                Back to Login
              </button>
              {/* </div> */}
            </form>
          </div>
        </Col>
      </Row>
    </div>
    </>
  );
};

export default NewPasswordSuccess;
