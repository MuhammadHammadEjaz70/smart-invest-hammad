import React, { useEffect, useState } from "react";
import { Col, Dropdown, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import moment from "moment";
import { fetchGetDataApi, postDataToApi } from "@/utils/general";
import { Bars } from "react-loader-spinner";
import BannerCardModule from "../Banners-Cards";
import Typography from "@/resuable/Typography";
import InputField from "../../resuable/InputField";
import styles from "./withdraw.module.css";
import Table from "@/resuable/Table";
import { Pagination } from "@mui/material";
import Buttons from "../../resuable/Button/Button";
import CustomToggle from "@/resuable/CustomToggle";
import { FaEllipsisV } from "react-icons/fa";

const UserWithDraw = () => {
  const [coins, setWithdrawCoins] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    from: 1,
    to: 10,
    total: 0,
  });

  const router = useRouter();

  const HandleWithdrawCoins = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await postDataToApi(`api/withdraw/withdraw-request`, {
        coins,
      });
      if (response.status === 200) {
        fetchData();
        window.location.reload();
        setWithdrawCoins("");
        toast.success("Withdraw request Successfull and sent to Admin");
      }
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
      } else {
        toast.error("SomeThing Went Wrong!");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Withdraw - Smart Invest";
    fetchData();
  }, []);

  const fetchData = async (page = 1) => {
    try {
      const response = await fetchGetDataApi("api/requests/list?type=Withdraw");
      if (response.data.result.data) {
        // Filter out requests where both coins and amount are null
        const filteredRequests = response.data.result.data.filter(
          (request: any) => request.coins !== null || request.amount !== null
        );
        setRequests(filteredRequests);
        setPagination(response.data.result.pagination);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePageChange = async (event: any, page: any) => {
    await fetchData(page);
  };

  const getStatusDot = (status: string) => {
    const dotStyles: Record<string, string> = {
      Completed: "#18FF93",
      Pending: "#2BDED5",
      Rejected: "#FF1C45",
    };
    const color = dotStyles[status] || "transparent"; // Default color for unknown status
    return (
      <span
        style={{
          display: "inline-block",
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: color,
          marginRight: "4px",
          whiteSpace: 'nowrap',
        }}
      />
    );
  };

  const columns = [
    {
      header: "Coins",
      accessor: "coins",
      Cell: ({ value }: { value: any }) => (
        <span>{value !== null ? value : "N/A"}</span>
      ),
    },
    {
      header: "Date",
      accessor: "createdAt",
      Cell: ({ value }: { value: any }) => (
        <span>{value !== null ? moment(value).format("MMM D,YYYY") : "N/A"}</span>
      ),
    },
    {
      header: "Time",
      accessor: "createdAt",
      Cell: ({ value }: { value: any }) => (
        <span>{value !== null ? moment(value).format("hh:mm a") : "N/A"}</span>
      ),
    },
    {
      header: "Address",
      accessor: "address",
      Cell: ({ row }: { row: any }) => (
        <span>{row?.userId?.phantomAddress || "N/A"}</span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      Cell: ({ value }: { value: any }) => <div className="table-status">  <span>{getStatusDot(value)}</span> {value}</div>,
    },
  ]

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
        <BannerCardModule />
        <form onSubmit={HandleWithdrawCoins} className="p-0">
          <Row className="m-0">
            <Typography variant="headingM" className="my-3">
              Withdraw
            </Typography>
            <InputField
              placeholder="Enter Number of Coins"
              value={coins}
              onChange={(e) => {
                setWithdrawCoins(e.currentTarget.value);
              }}
              type="text"
              mode="dark"
              name="coins"
              borderRadius="35px"
              backgroundColor="#151515"
              color="#C0C0C0"
              width="100%"
              required={true}
              showAdditionalField={true} // Only single input field is shown
              buttonText="Withdraw Coins"
            />
          </Row>
        </form>
        <Row className="m-0 p-0 mt-3">
          <Typography variant="tableH">Withdraw History</Typography>
          <Table columns={columns} data={requests} />
          <div
            style={{ display: "flex", justifyContent: "center" }}
            className="mt-2"
          >
            <Pagination
              count={Math.ceil(pagination.total / pagination.pageSize)}
              page={currentPage}
              onChange={handlePageChange}
              variant="outlined"
              shape="rounded"
              sx={{
                "& .MuiPaginationItem-root": {
                  borderColor: "#606060",
                  color: "#606060",
                  "&:hover": {
                    borderColor: "#ECAC1A",
                    color: "#ECAC1A",
                  },
                  "&.Mui-selected": {
                    borderColor: "#FFFFFF",
                    color: "#FFFFFF",
                  },
                },
                "& .MuiPaginationItem-ellipsis": {
                  color: "#ECAC1A",
                },
                "& .MuiPaginationItem-icon": {
                  color: "#ECAC1A",
                },
              }}
            />
          </div>
        </Row>
      </Row>
    </>
  );
};

export default UserWithDraw;
