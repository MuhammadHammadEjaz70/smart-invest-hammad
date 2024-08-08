import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface CurvedLineChartProps {
  data: any;
  options: any;
}

const CurvedLineChart: React.FC<CurvedLineChartProps> = ({ data, options }) => {
  const curvedData = {
    ...data,
    datasets: data.datasets.map((dataset: any) => ({
      ...dataset,
      tension: 0.4,
    })),
  };

  return <Line data={curvedData} options={options} />;
};

export default CurvedLineChart;
