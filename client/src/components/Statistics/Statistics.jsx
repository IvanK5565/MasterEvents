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
        {/* Диаграмма: Количество событий в каждом месяце */}
        <div className="chart-container">
            <h2>Количество событий по месяцам {year}</h2>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={statistics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" tickFormatter={(month) => `${months[month]}`} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="totalEvents" name="Количество событий" fill="#4caf50" />
                </BarChart>
            </ResponsiveContainer>
        </div>

        {/* Диаграмма: Количество посетителей (да/нет) по месяцам */}
        <div className="chart-container">
            <h2>Посетители по месяцам {year}</h2>
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
                        name="Идут"
                        stroke="#4caf50"
                        strokeWidth={2}
                    />
                    <Line
                        type="monotone"
                        dataKey="attendeesNo"
                        name="Не идут"
                        stroke="#f44336"
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </>);
};

export default Statistics;
