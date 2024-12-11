import React from "react";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import "@/styles/StatisticsPage.css";

const Statistics = ({ statistics, months, year }) => {
    return (<>
        {/* Діаграма: Кількість подій у кожному місяці */}
        <div className="chart-container">
            <h2>Кількість подій за місяцями {year}</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={statistics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tickFormatter={(month) => `${months[month]}`} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalEvents" name="Кількість подій" fill="#4caf50" />
                </BarChart>
            </ResponsiveContainer>
        </div>

        {/* Діаграма: Кількість відвідувачів (так/ні) по месяцям */}
        <div className="chart-container">
            <h2>Гості {year}</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={statistics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tickFormatter={(month) => `${months[month]}`} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="attendeesYes"
                        name="Записались на подію"
                        stroke="#4caf50"
                        strokeWidth={2}
                    />
                    <Line
                        type="monotone"
                        dataKey="attendeesNo"
                        name="Відмовились"
                        stroke="#f44336"
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </>);
};

export default Statistics;
