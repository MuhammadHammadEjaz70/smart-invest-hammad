import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { toast } from "react-toastify";
import { Bars } from "react-loader-spinner";
import Typography from "@/resuable/Typography";
import Buttons from "../../resuable/Button/Button";
import InputField from "../../resuable/InputField";
import { postDataToApi, updateDataToApi } from "@/utils/general";
import { Col, Container, Row } from "react-bootstrap";

const SubscriptionPlanCreate = () => {
  const router = useRouter();
  const { id, data } = router.query;
  const initialFormData = data ? JSON.parse(data as string) : null;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    minCoin: "",
    maxCoin: "",
    percentage: "",
    phantomAddress: "",
  });

  const [mode, setMode] = useState("create"); // Default mode is create

  useEffect(() => {
    if (initialFormData) {
      setFormData({
        title: initialFormData.title || "",
        minCoin: initialFormData.minCoin || "",
        maxCoin: initialFormData.maxCoin || "",
        percentage: initialFormData.percentage || "",
        phantomAddress: initialFormData.phantomAddress || "",
      });
      setMode("edit");
    }
  }, []);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    // Parse numeric values for specific fields if necessary
    const updatedValue = name === "minCoin" || name === "maxCoin" || name === "percentage"
      ? parseFloat(value)
      : value;

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "create") {
        let response = await postDataToApi('/api/vault', formData);
        if (response.status === 200) {
          toast.success("Stake Package Added Successfully");
          router.push("/subscription-plan-list");
        } else {
          toast.error("Failed to add stake package");
        }
      } else if (mode === "edit" && id) {
        let response = await updateDataToApi(`/api/vault/${id}`, formData);
        if (response.status === 200) {
          toast.success("Stake Package Updated Successfully");
          router.push("/subscription-plan-list");
        } else {
          toast.error("Failed to update stake package");
        }
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = mode === "create" ? "Create Subscription Plan - Smart Invest" : "Edit Subscription Plan - Smart Invest";
  }, [mode]);

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
      <Container>
        <Typography variant="headingM" className="my-3">
          {mode === "create" ? "Create New Package" : "Edit Package"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col lg={12} md={12} sm={12} className="mt-2">
              <InputField
                label="Vault Name"
                placeholder="Enter Wallet Name"
                value={formData.title}
                onChange={handleChange}
                name="title"
                type="text"
                mode="dark"
                required={true}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={4} md={6} sm={12}>
              <InputField
                label="Min Coins"
                placeholder="Enter Min Coins"
                value={formData.minCoin}
                onChange={handleChange}
                name="minCoin"
                type="number"
                mode="dark"
                required={true}
              />
            </Col>
            <Col lg={4} md={6} sm={12}>
              <InputField
                label="Max Coins"
                placeholder="Enter Max Coins"
                value={formData.maxCoin}
                onChange={handleChange}
                name="maxCoin"
                type="number"
                mode="dark"
                required={true}
              />
            </Col>
            <Col lg={4} md={6} sm={12}>
              <InputField
                label="Percentage"
                placeholder="Enter Percentage"
                value={formData.percentage}
                onChange={handleChange}
                name="percentage"
                type="number"
                mode="dark"
                required={true}
              />
            </Col>
          </Row>
          {mode === 'create' ? (
            <Row>
              <Col lg={12} md={12} sm={12}>
                <InputField
                  label="Phantom Wallet Address"
                  placeholder="Enter Phantom Wallet Address"
                  value={formData.phantomAddress}
                  onChange={handleChange}
                  name="phantomAddress"
                  type="text"
                  mode="dark"
                  required={true}
                />
              </Col>
            </Row>
          ) : (null)}
          <Buttons variant="background" children={mode === "create" ? "Save Package" : "Update Package"} type="submit" />
        </form>
      </Container>
    </>
  );
};

export default SubscriptionPlanCreate;
