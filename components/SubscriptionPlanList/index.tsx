import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Bars } from "react-loader-spinner";
import Typography from "@/resuable/Typography";
import Buttons from "../../resuable/Button/Button";
import PackagesCard from "../SubscriptionCard";
import { deleteDataFromApi, fetchGetDataApi } from "@/utils/general";
import styles from "./withdraw.module.css";
import { Row } from "react-bootstrap";

const SubscriptionPlanList = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [role, setRole] = useState(null);

  useEffect(() => {
    document.title = "Subscription Plan - Smart Invest";
    fetchUserRole();
    fetchVaultList();
  }, []);

  const fetchUserRole = () => {
    const userRole: any = localStorage.getItem("userType");
    setRole(userRole);
  };

  const fetchVaultList = async () => {
    try {
      const response = await fetchGetDataApi("api/vault/list");
      setCards(response.data.result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCreateNewPlan = () => {
    router.push("/subscription-plan-create");
  };

  const handleEditPlan = (id: string, data: any) => {
    router.push({
      pathname: '/subscription-plan-create',
      query: { mode: 'edit', id: id, data: JSON.stringify(data) }
    });
  };

  const handleDeletePlan = async (id: string) => {
    try {
      await deleteDataFromApi(`/api/vault/${id}`);
      toast.success("Deleted successfully");
      fetchVaultList();
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
      } else {
        toast.error("Failed to delete!");
      }
      console.error("Error Deleting Response: ", error);
    }
  };

  const handleBuyPlan = async (coins: number, id: string) => {
    try {
      // Implement buy plan functionality here
      toast.success("Subscription successful");
    } catch (error) {
      toast.error("Failed To Subscribe!");
      console.error("Error Fetching Response: ", error);
    }
  };

  const handleUpdatePlan = async (id: string, minCoin: number, maxCoin: number, title: string, percentage: number) => {
    try {
      // Implement update plan functionality here
      toast.success("Updated successfully");
      fetchVaultList(); // Refresh the list after update
    } catch (error) {
      toast.error("Failed To Update!");
      console.error("Error Fetching Response: ", error);
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
      <Row className="m-0">
        <div className={`my-3 ${styles.buttonHeading}`}>
          <Typography variant="headingM">
            {role === "Admin" ? "Stake Packages" : "Stake Plans"}
          </Typography>
          {role === "Admin" && (
            <Buttons variant="background" onClick={handleCreateNewPlan}>
              Create New Plan
            </Buttons>
          )}
        </div>

        <PackagesCard
          cardData={cards}
          handleBuy={handleBuyPlan}
          handleDelete={handleDeletePlan}
          handleUpdate={handleUpdatePlan}
          handleEditRoute={handleEditPlan}
        />
      </Row>
    </>
  );
};

export default SubscriptionPlanList;
