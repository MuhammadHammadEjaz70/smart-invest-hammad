import React, { useState } from "react";
import styles from "./SubscriptionCard.module.css";
import { postDataToApi } from "@/utils/general";
import Button from "../Button/Button";
import { toast } from "react-toastify";
import CustomModal from "../../components/CustomModal"; // Import the custom modal component
import Image from "next/image";
import { GOLDENSTAR } from "@/utils/images";
import Typography from "@/resuable/Typography";
import { useDispatch } from "react-redux";
import Link from "next/link";
import Buttons from "../../resuable/Button/Button";
import InputField from "../../resuable/InputField";
import { setCoins } from "@/components/coinsSlice";
import { Bars } from "react-loader-spinner";
interface SubscriptionCardProps {
  icon?: string;
  heading?: string;
  value?: string;
  children?: React.ReactNode;
  minCoin?: number;
  maxCoin?: number;
  id?: number;
  handleDelete: any;
  handleUpdate: any;
  handleEditRoute?: any;
  cardData?: any;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  icon,
  heading,
  value,
  children,
  minCoin,
  maxCoin,
  id,
  handleDelete,
  handleUpdate,
  handleEditRoute, // Accept handleEditRoute prop
  cardData
}) => {
  const role =
    typeof window != "undefined" ? localStorage.getItem("userType") : null;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);
  const [isCoinModalOpen, setIsCoinModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<number | any>("");
  const dispatch=useDispatch();

  const handleBuy = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await postDataToApi(`api/subscription/add`, {
        coins: inputValue,
        vaultId: id,
      });
      setIsCoinModalOpen(false);
       
      dispatch(setCoins(response?.data?.user?.swiftId?.coins));
      setIsModalOpen(true);
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.error;
        toast.error(errorMessage);
      } else {
        toast.error("Failed To Login!");
      }
      console.error("Error Fetching Response: ", error);
    }finally{
      setLoading(false);
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
    <div className={styles.card}>
      <div className={styles.heading}>{heading}</div>
      <div className={styles.valuesOrButtons}>
        <div>
          <div className={styles.value}>{value}</div>
          <div className={styles.content}>{children}</div>
        </div>
        {role === "Admin" ? (
          <div>
            <Button
              variant="border"
              children="Edit"
              onClick={() => handleEditRoute(id, cardData)} // Call handleEditRoute with id and cardData
            />
            &nbsp;&nbsp;
            <Button
              variant="border"
              children="Delete"
              onClick={() => setIsConfirmDeleteModalOpen(true)} />
          </div>
        ) : (
          <Button
            variant="border"
            children="Buy Now"
            onClick={() => setIsCoinModalOpen(true)}
          />
        )}
      </div>
      <CustomModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image src={GOLDENSTAR} width={100} height={100} alt="..." />
        </div>
        <Typography variant="headingM" className="text-center">
          THANK YOU!
        </Typography>
        <Typography variant="text18Light" className="text-center mb-2">
          You have successfully subscribed to our plan.
        </Typography>
        <Link href="/stake-plan">
          <Buttons
            variant="button-background"
            children="Continue"
            width="100%"
          />
        </Link>
      </CustomModal>
      <CustomModal
        isOpen={isCoinModalOpen}
        onRequestClose={() => setIsCoinModalOpen(false)}
      >
        <Typography variant="headingS" className="text-center">
          {value}
        </Typography>

        <form onSubmit={handleBuy}>
          <Typography variant="text20Profile">Coins</Typography>
          <InputField
            name="coins"
            placeholder="Enter Coins"
            value={inputValue}
            onChange={(event: any) => setInputValue(event.currentTarget.value)}
            type="number"
            mode="light"
            min={minCoin}
            max={maxCoin}
          />
          <Buttons
            variant="signUp-btn"
            children="Submit"
            width="100%"
            type="submit"
          />
        </form>
      </CustomModal>
      <CustomModal
        isOpen={isConfirmDeleteModalOpen}
        onRequestClose={() => setIsConfirmDeleteModalOpen(false)}
      >
        <Typography variant="headingM" className="text-center mb-2">
          Confirm Deletion
        </Typography>
        <Typography variant="text18Light" className="text-center">
          Are you sure you want to delete this item?
        </Typography>
        <div className={`d-flex justify-content-end mt-5 ${styles.modalButtons}`}>
          <Button
            variant="border"
            children="Cancel"
            onClick={() => setIsConfirmDeleteModalOpen(false)}
          />&nbsp;&nbsp;
          <Button
            variant="border"
            children="Delete"
            onClick={() => handleDelete(id)}
          />
        </div>
      </CustomModal>
    </div>
    </>
  );
};

export default SubscriptionCard;
