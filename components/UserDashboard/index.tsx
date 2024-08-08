import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Bars } from "react-loader-spinner";
import DashboardCards from "@/resuable/DashboardCard/DashboardCards";
import { fetchGetDataApi } from "@/utils/general";
import { COIN, STAKE, TOPUP, WALLET } from "@/utils/images";
import CurvedLineChart from "@/resuable/Charts/CurvedLineChart";
import moment from "moment";
import LineChart from "@/resuable/Charts/LineChart";
import DoughnutChart from "@/resuable/Charts/PieChart";
import Typography from "@/resuable/Typography";
import styles from "./index.module.css";

interface TransactionData {
  date: string;
  value: number;
}

const UserDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    myCoins: 0,
    stakedCoins: 0,
    totalDeposits: 0,
    totalWithdraws: 0,
  });
  const [lineChartData, setLineChartData] = useState<any>(null);
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1); 
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [curvedLineChartData, setCurvedLineChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: 'Dataset',
        data: [],
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
        stepped: false,
      },
    ],
  });
  const [doughnutChartData, setDoughnutChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: 'Vault Data',
        data: [],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
      },
    ],
  });

  const userId = typeof window != "undefined" ? localStorage.getItem("userId") : null;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    if (name === 'month') {
      setSelectedMonth(parseInt(value));
    } else if (name === 'year') {
      setSelectedYear(parseInt(value));
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchGetDataApi("api/dashboard/user-dashboard-counters");
      if (response && response.data) {
        setDashboardData({
          myCoins: response.data.result.myCoins || 0,
          stakedCoins: response.data.result.stakedCoins || 0,
          totalDeposits: response.data.result.totalDeposits || 0,
          totalWithdraws: response.data.result.totalWithdraws || 0,
        });
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Dashboard - SmartInvest";
    fetchData();
    fetchDashboardLineChart();
    fetchDashboardDoughnutChart();
  }, [selectedMonth, selectedYear]);

  const fetchDashboardLineChart = async () => {
    setLoading(true);
    try {
      const response = await fetchGetDataApi(`api/dashboard/coin-chart?year=${selectedYear}&month=${selectedMonth}&userId=${userId}`);

      const formattedData = response.data.map((item: TransactionData) => ({
        date: moment(item.date).format("YYYY-MM-DD"),
        value: item.value,
      }));
      const newCurvedLineChartData = {
        labels: formattedData.map((data: any) => data.date),
        datasets: [
          {
            label: 'Coin Values',
            data: formattedData.map((data: any) => data.value),
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: false,
            stepped: false,
          },
        ],
      };

      setCurvedLineChartData(newCurvedLineChartData);

    } catch (error) {
      console.error("Error fetching dashboard line chart data:", error);
    } finally {
      setLoading(false);
    }
  }

  const fetchDashboardDoughnutChart = async () => {
    setLoading(true);
    try {
      const response = await fetchGetDataApi(`api/dashboard/user-pie-chart?userId=${userId}`);

      const formattedDoughnutData = {
        labels: response.data.result.map((item: any) => item.vault),
        datasets: [
          {
            data: response.data.result.map((item: any) => item.percentage),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            borderWidth: 0
          },
        ],
      };

      setDoughnutChartData(formattedDoughnutData);

    } catch (error) {
      console.error("Error fetching dashboard doughnut chart data:", error);
    } finally {
      setLoading(false);
    }
  }

  const dashboardCounter = [
    { icon: COIN.default, count: dashboardData.myCoins, name: "My Total Coins" },
    { icon: STAKE.default, count: dashboardData.stakedCoins, name: "My Staked Coins" },
    { icon: TOPUP.default, count: dashboardData.totalDeposits, name: "Total Deposit" },
    { icon: WALLET.default, count: dashboardData.totalWithdraws, name: "Total Withdraw" },
  ];

  const curvedLineChartOptions = {
    responsive: true,
    interaction: {
      intersect: false,
      axis: 'x',
    },
    plugins: {
      title: {
        display: true,
      },
    },
  };

  const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const vault = context.label || '';
            const profit = context.raw || '';
          },
        },
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
      <Row className="m-0">
        <div className="mb-3">
          <Typography variant='text28light'>
              My Dashboard
          </Typography>
        </div>
        <Col lg={6} md={6} sm={12} className="my-1">
          <div style={{width:'100%', background:"#151515", borderRadius:'16px'}}>
            <div className={styles.dropdownValues}>
              <div className="mx-3">
                <Typography variant="text18Light">
                  Coin Values
                </Typography>
              </div>
              <div className="d-flex">
                <select
                  name="month"
                  value={selectedMonth}
                  onChange={handleChange}
                  className="my-3"
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#fff',
                    background: '#333333',
                    padding: '8px 15px',
                    borderRadius: '12px'
                  }}
                >
                  {[...Array(12)].map((_, index) => (
                    <option key={index + 1} value={index + 1}>
                      {new Date(0, index).toLocaleString('en', { month: 'long' })}
                    </option>
                  ))}
                </select>&nbsp;&nbsp;
                <select
                  name="year"
                  value={selectedYear}
                  onChange={handleChange}
                  className="my-3 mr-3"
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#fff',
                    background: '#333333',
                    padding: '8px 15px',
                    borderRadius: '12px'
                  }}
                >
                  {[...Array(51)].map((_, index) => {
                    const year = 2015 + index;
                    return (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <CurvedLineChart data={curvedLineChartData} options={curvedLineChartOptions} />
          </div>
        </Col>
        <Col lg={6} md={6} sm={12} className="my-1">
          <div style={{ height: '367px',background:"#151515", borderRadius:'16px' }}>
            <div className="mx-3" style={{paddingTop:'16px'}}>
              <Typography variant="text18Light">
                Stake Interests
              </Typography>
            </div>
            <DoughnutChart data={doughnutChartData} options={doughnutChartOptions} />
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center m-0">
        {dashboardCounter.map((data, index) => (
          <Col key={index} lg={3} md={4} sm={6} xs={12} className="d-flex justify-content-center my-2 p-2">
            <DashboardCards data={data} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default UserDashboard;
