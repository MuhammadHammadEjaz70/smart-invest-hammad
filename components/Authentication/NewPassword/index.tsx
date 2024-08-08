import React, { useState, useEffect } from "react";
import { postDataToApi } from "@/utils/general";
import styles from "../index.module.css";
import { Col, Row } from "react-bootstrap";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../../../resuable/InputField";
import Typography from "@/resuable/Typography";
import BgImg from "@/resuable/backgroundImage";
import Buttons from "../../../resuable/Button/Button";
import { Bars } from "react-loader-spinner";

interface NewPasswordProps {
  token: string;
  email: string;
}

const NewPassword: React.FC<NewPasswordProps> = ({ token, email }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setloading] = useState(false);

  const router = useRouter();
  useEffect(() => {
    document.title = "Reset Password -Smart Invest";
  }, []);

  const handleSubmit = async (e: any) => {
    setloading(true);
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New Password and Confirm Password Do not Match!");
      return;
    }
    const mail = email.replace(/ /g, "+");
    const data = {
      newPassword: newPassword,
      confirmPassword: confirmPassword,
      email: mail,
      code: token,
    };

    try {
      const response = await postDataToApi("api/auth/reset-password", data);
      if (response.status === 200) {
        toast.success("Password Reset Successful");
        router.push("/password-changed");
      } else {
        toast.error("Failed to Reset password");
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
    }finally {
      setloading(false);
    }
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
        <Col lg={4} md={4} sm={12} className={`p-0 ${styles.background}`}>
          <BgImg />
        </Col>

        <Col lg={8} md={8} sm={12} className={styles.pageHeight}>
          <div className={styles.formFull2}>
            <form onSubmit={handleSubmit} className={`w-100`}>
              <Typography variant="text26" className="text-center">
                Set A New Password
              </Typography>
              <Typography variant="text20light" className="text-center">
                New password must be different from your previous used
                passwords.
              </Typography>
              <hr style={{ width: "100%" }} />
              <InputField
                label="New Password"
                name="newPassword"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
                mode="light"
                required={true}
              />
              <InputField
                label="Confirm New Password"
                name="confirmPassword"
                placeholder="Enter Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                mode="light"
                required={true}
              />
              <Buttons variant="signUp-btn" children="Reset password" width="100%" type="submit" />
            </form>
          </div>
        </Col>
      </Row>
    </div>
    </>
  );
};

export default NewPassword;
