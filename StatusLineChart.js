// src/components/StatusLineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const StatusLineChart = ({ data }) => {
    const chartData = {
        labels: ['Approved', 'Rejected', 'Connection Released'],
        datasets: [
            {
                label: 'User Statuses',
                data: data,
                fill: false,
                backgroundColor: '#36A2EB',
                borderColor: '#36A2EB',
            },
        ],
    };

    return (
        <div>
            <h3>User Status Trend</h3>
            <Line data={chartData} />
        </div>
    );
};

export default StatusLineChart;
