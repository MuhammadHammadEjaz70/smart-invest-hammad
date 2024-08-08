import React, { useEffect, useRef } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto';
import styles from "./index.module.css";

type DoughnutChartProps = {
    data: ChartConfiguration<'doughnut', number[], unknown>['data'];
    options: ChartConfiguration<'doughnut', number[], unknown>['options'];
};

const DoughnutChart: React.FC<DoughnutChartProps> = ({ data, options }) => {
    const chartContainer = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart<'doughnut', number[], unknown> | null>(null);

    useEffect(() => {
        if (chartContainer.current) {
            chartInstance.current = new Chart(chartContainer.current, {
                type: 'doughnut',
                data: data,
                options: options
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data, options]);

    return (
        <div className={styles.doughnutChart}>
            <canvas ref={chartContainer} />
        </div>
    );
};

export default DoughnutChart;
