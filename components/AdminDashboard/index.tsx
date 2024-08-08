import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import moment from "moment";
import { fetchGetDataApi } from "@/utils/general";
import BarChart from "@/resuable/Charts/BarChart";
import DashboardCards from "@/resuable/DashboardCard/DashboardCards";
import Table from "@/resuable/Table";
import LineChart from "@/resuable/Charts/LineChart";
import { USER, STAKE, TOPUP, WALLET } from "@/utils/images";

interface DashboardData {
  totalUsers: number;
  totalRequsts: number;
  totalTransactions: number;
  totalPlans: number;
}

interface TransactionData {
  date: string;
  count: number;
  coins: number;
}

const AdminDashboard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [chartData, setChartData] = useState<any>(null); 
  const [requests, setRequests] = useState([]);
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalUsers: 0,
    totalRequsts: 0,
    totalTransactions: 0,
    totalPlans: 0,
  });
  const [lineChartData, setLineChartData] = useState<any>(null); 

  useEffect(() => {
    document.title = "Dashboard - SmartInvest";
    fetchDashboardData();
    fetchData();
    fetchDashboardChart();
    fetchDashboardLineChart();
  }, []);

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

  const fetchDashboardChart = async () => {
    setLoading(true);
    try {
      const response = await fetchGetDataApi("api/dashboard/user-analytics");
      if (response.data && response.data.result && response.data.result.dateWiseUsers) {
        const { dateWiseUsers } = response.data.result;
        const barChartData = {
          labels: dateWiseUsers.labels.map((label: string) => moment(label).format("MMM D yyyy")),
          datasets: [
            {
              label: 'Users',
              data: dateWiseUsers.data,
              backgroundColor: [
                'rgba(90, 156, 125, 0.5)', 
                '#4EE39D'
              ],
            },
          ],
        };
        setChartData(barChartData);
      }
    } catch (error) {
      console.error("Error fetching dashboard chart data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardLineChart = async () => {
    setLoading(true);
    try {
      const response = await fetchGetDataApi("api/dashboard/recent-transactions-chart");
      if (response.data && response.data.result) {
        const { result } = response.data;
        const formattedData = result.map((item: TransactionData) => ({
          date: moment(item.date).format("MMM D yyyy"),
          count: item.count,
          coins: item.coins,
        }));
        const newLineChartData = {
          labels: formattedData.map((data:any) => data.date),
          datasets: [
            {
              label: 'Coins',
              data: formattedData.map((data:any) => data.coins),
              borderColor: 'rgba(245, 198, 53, 2)',
              fill: false,
              cubicInterpolationMode: 'monotone',
              tension: 0.4,
            },
          ],
        };
        setLineChartData(newLineChartData);
      }
    } catch (error) {
      console.error("Error fetching dashboard line chart data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchGetDataApi("api/subscription/list");
      if (response.data && response.data.data) {
        setRequests(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await fetchGetDataApi("api/dashboard/admin-dashboard-counters");

      if (response && response.data) {
        const { result } = response.data;
        setDashboardData({
          totalUsers: result.totalUsers || 0,
          totalRequsts: result.totalRequsts || 0,
          totalTransactions: result.totalTransactions || 0,
          totalPlans: result.totalPlans || 0,
        });
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const dashboardCounter = [
    { icon: USER.default, count: dashboardData.totalUsers, name: "Total Users" },
    { icon: STAKE.default, count: dashboardData.totalRequsts, name: "Total Pending Request" },
    { icon: TOPUP.default, count: dashboardData.totalTransactions, name: "Total Transactions" },
    { icon: WALLET.default, count: dashboardData.totalPlans, name: "Total Stake Plans" },
  ];

  const columns = [
    {
      header: "Name",
      accessor: "userId.fullname",
      Cell: ({ value, row }: { value: any, row: any }) => <span>{row?.userId?.fullname || "N/A"}</span>,
    },
    {
      header: "Date",
      accessor: "createdAt",
      Cell: ({ value }: { value: string }) => (
        <span>{value !== null ? moment(value).format("MMM D, YYYY") : "N/A"}</span>
      ),
    },
    {
      header: "Time",
      accessor: "createdAt",
      Cell: ({ value }: { value: string }) => <span>{value !== null ? moment(value).format("hh:mm a") : "N/A"}</span>,
    },
    {
      header: "Status",
      accessor: "status",
      Cell: ({ value }: { value: boolean }) => (
        <div className="table-status">
           <span>{getStatusDot(value)}</span>
          <span>{value ?  "Active":"Inactive"}</span>
          {value ? "" : "Active"}
        </div>
      ),
    },
  ];

  const lineChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Recent Transactions',
      },
    },
    interaction: {
      intersect: false,
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Value',
        },
        suggestedMin: 0,
        suggestedMax: 50,
      },
    },
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
      <Row className="p-0 m-0">
        <Col lg={6} md={6} sm={12}>
          {chartData ? (
            <BarChart data={chartData} />
          ) : (
            <div>No chart data available</div>
          )}
        </Col>
        <Col lg={6} md={6} sm={12}>
          <div style={{height:'300px', overflow:'auto', background:'#151515', borderRadius:'12px'}}>
            <Table columns={columns} data={requests} />
          </div>
        </Col>
      </Row>
      <Row className="p-0 m-0">
        {dashboardCounter?.map((data, index) => (
          <Col lg={3} md={6} sm={12} className="my-2" key={index}>
            <DashboardCards data={data} />
          </Col>
        ))}
      </Row>
      <Row className="p-0 m-0">
        <Col>
          {lineChartData ? (
            <LineChart data={lineChartData} options={lineChartOptions} />
          ) : (
            <div>No line chart data available</div>
          )}
        </Col>
      </Row>
    </>
  );
};

export default AdminDashboard;
