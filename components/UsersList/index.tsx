import React, { useEffect, useState } from "react";
import { Button, Col, Dropdown, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { fetchGetDataApi } from "@/utils/general";
import { Bars } from "react-loader-spinner";
import { Pagination } from "@mui/material";
import Typography from "@/resuable/Typography";
import moment from "moment";
import axios from "axios";
import Table from "@/resuable/Table";
import "react-toastify/dist/ReactToastify.css";
import CustomToggle from "@/resuable/CustomToggle";
import { FaEllipsisV } from "react-icons/fa";
import InputField from "@/resuable/InputField";
import styles from "../UserRequests/index.module.css";

const UsersList = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    from: 1,
    to: 10,
    total: 0,
  });

  const [role, setRole] = useState<any>("");
  useEffect(() => {
    let roleName =
      typeof window !== "undefined" ? localStorage.getItem("userType") : "";
    setRole(roleName);
  }, []);
  const router = useRouter();

  const handleChangeStatus = async (id: string, block: boolean) => {
    try {
      const response = await axios.post(
        "/api/user/block",
        { id, block },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success(`Action completed`);
        fetchData();
      }
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  useEffect(() => {
    document.title = "User List - Smart Invest";
    fetchData();
  }, []);

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetchGetDataApi(`api/user/list?pageNo=${page}`);
      if (response.data.result.data) {
        const fetchedUsers = response.data.result.data;
        setUsers(fetchedUsers);
        setFilteredUsers(fetchedUsers);
        setPagination(response.data.result.pagination);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (event: any) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = users.filter((user: any) =>
      user.fullname.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
    setFilteredUsers(filtered);
  };

  const handlePageChange = async (event: any, page: any) => {
    await fetchData(page);
  };

  const getStatusDot = (status: string) => {
    const dotStyles: Record<string, string> = {
      Active: "#18FF93",
      Blocked: "#FF1C45",
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
          whiteSpace: "nowrap",
        }}
      />
    );
  };

  const columns = [
    {
      header: "Name",
      accessor: "fullname",
      Cell: ({ value }: { value: any }) => (
        <span>{value !== null ? value : "N/A"}</span>
      ),
    },
    {
      header: "Username",
      accessor: "username",
      Cell: ({ value }: { value: any }) => (
        <span>{value !== null ? value : "N/A"}</span>
      ),
    },
    {
      header: "Email",
      accessor: "email",
      Cell: ({ value }: { value: any }) => (
        <span>{value !== null ? value : "N/A"}</span>
      ),
    },
    {
      header: "Coins",
      accessor: "coins",
      Cell: ({ row }: { row: any }) => (
        <span>{row?.swiftId?.coins || "N/A"}</span>
      ),
    },
    {
      header: "Status",
      accessor: "isBlocked",
      Cell: ({ value }: { value: any }) => (
        <div className="table-status">
          <span>{getStatusDot(value ? "Blocked" : "Active")}</span>{" "}
          {value ? "Blocked" : "Active"}
        </div>
      ),
    },
    {
      header: "Actions",
      accessor: "actions",
      Cell: ({ row }: { row: any }) => (
        <div>
          <Dropdown>
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
              <FaEllipsisV style={{ color: "#bbb9bb" }} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {row.isBlocked ? (
                <Dropdown.Item onClick={() => handleChangeStatus(row._id, false)}>
                  Unblock
                </Dropdown.Item>
              ) : (
                <Dropdown.Item onClick={() => handleChangeStatus(row._id, true)}>
                  Block
                </Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      ),
    },
  ];

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
        <Col lg={6}>
          <Typography variant="text28light">All User</Typography>
        </Col>
        <Col lg={6}>
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
        <Table columns={columns} data={filteredUsers} />
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

export default UsersList;
