// src/components/StatusPieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';

const StatusPieChart = ({ data }) => {
    const chartData = {
        labels: ['Approved', 'Rejected', 'Connection Released'],
        datasets: [
            {
                label: 'User Statuses',
                data: data,
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
            },
        ],
    };

    return (
        <div>
            <h3>User Status Distribution</h3>
            <Pie data={chartData} />
        </div>
    );
};

export default StatusPieChart;
