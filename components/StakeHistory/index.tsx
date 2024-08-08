import Typography from "@/resuable/Typography";
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { Pagination } from "@mui/material";
import moment from "moment";
import Table from "@/resuable/Table";
import { fetchGetDataApi } from "@/utils/general";
import { Bars } from "react-loader-spinner";

function index() {
  const [currentPage, setCurrentPage] = useState(1);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    pageSize: 10,
    from: 1,
    to: 10,
    total: 0,
  });

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const response = await fetchGetDataApi(
        `api/subscription/list?pageNo=${page}`
      );

      if (response.data.data) {
        // Filter out requests where both coins and amount are null
        const filteredRequests = response.data.data.filter(
          (request: any) => request.coins !== null || request.amount !== null
        );
        setRequests(filteredRequests);
        setPagination(response.data.result.pagination);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }finally {
      setLoading(false);
    }
  };

  const getStatusDot = (status: Boolean) => {
    const dotStyles: Record<string, string> = {
      Active: "#18FF93",
      Inactive: "#FF1C45",
    };
    const color = status ? dotStyles["Active"] : dotStyles["Inactive"]; // Default color for unknown status
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
        <span>
          {value !== null ? moment(value).format("MMM D,YYYY") : "N/A"}
        </span>
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
      Cell: ({ value }: { value: any }) => (
        <div className="table-status">
          <span>{getStatusDot(value)}</span>
          <span>{value ? "Active" : "Inactive"}</span>
          {value ? "" : "Active"}
        </div>
      ),
    },
  ];

  const handlePageChange = async (event: any, page: any) => {
    await fetchData(page);
  };

  useEffect(() => {
    document.title = "stake-history - Smart Invest";
    fetchData();
  }, []);

  return (
    <div>
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
        <Typography variant="text28light" className="text-left">
          Stake History
        </Typography>
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
    </div>
  );
}

export default index;
