import React, { useEffect, useState } from "react";
import { Col, Dropdown, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import Table from "@/resuable/Table";
import { Pagination } from "@mui/material";
import Typography from "@/resuable/Typography";
import moment from "moment";
import { FaEllipsisV } from "react-icons/fa";
import CustomToggle from "@/resuable/CustomToggle";
import InputField from "@/resuable/InputField";
import styles from "../UserRequests/index.module.css";

const UserWithdrawRequest = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const roleName = localStorage.getItem("userType") || "";
    setRole(roleName);
    document.title = "User Requests - Smart Invest";
    fetchData();
  }, []);

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/requests/list?pageNo=${page}&type=Withdraw`);
      if (response.data.result.data) {
        const filteredRequests = response.data.result.data.filter(
          (request: any) =>
            (request.coins !== null || request.amount !== null) &&
            (request.userId.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
              request.userId.email.toLowerCase().includes(searchQuery.toLowerCase()))
        );
        setRequests(filteredRequests);
        setPagination(response.data.result.pagination);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeStatus = async (id: string, status: string) => {
    setLoading(true);
    try {
      const response = await axios.patch(
        "/api/requests/status",
        { id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success(`Request ${status}`);
        fetchData();
      }
    } catch (error: any) {
      const errorMessage = error.response ? error.response.data.message : "Something went wrong!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = async (event: any, page: any) => {
    await fetchData(page);
  };

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
    fetchData();
  };

  const columns = [
    {
      header: "Name",
      accessor: "fullname",
      Cell: ({ row }: { row: any }) => (
        <span>{row?.userId?.fullname || "N/A"}</span>
      ),
    },
    {
      header: "Email",
      accessor: "email",
      Cell: ({ row }: { row: any }) => (
        <span>{row?.userId?.email || "N/A"}</span>
      ),
    },
    {
      header: "Phantom Address",
      accessor: "phantomAddress",
      Cell: ({ row }: { row: any }) => (
        <span>{row?.userId?.phantomAddress || "N/A"}</span>
      ),
    },
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
      header: "Status",
      accessor: "status",
      Cell: ({ value }: { value: any }) => <div className="table-status">  <span>{getStatusDot(value)}</span> {value}</div>,
    },
    {
      header: "Actions",
      accessor: "actions",
      Cell: ({ row }: { row: any }) => (
        <div>
          {row.status === "Pending" ? (
            <Dropdown>
              <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                <FaEllipsisV style={{ color: '#bbb9bb' }} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleChangeStatus(row._id, "Completed")}>
                  Accept
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleChangeStatus(row._id, "Rejected")}>
                  Decline
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <span>N/A</span>
          )}
        </div>
      ),
    },
  ];

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
      <Row className="d-flex align-items-center m-0">
        <Col lg={6} md={6}>
          <Typography variant="text28light">User Withdraw Requests</Typography>
        </Col>
        <Col lg={6} md={6}>
          <div className={styles.searchField}>
            <InputField
              placeholder="Search Here"
              border="1px solid #696969"
              backgroundColor="transparent"
              color="#fff"
              height="48px"
              type="search"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </Col>
        <Table columns={columns} data={requests} />
        <div style={{ display: "flex", justifyContent: "center" }} className="mt-2">
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
    </>
  );
};

export default UserWithdrawRequest;