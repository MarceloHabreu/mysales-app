import { SaleByMonth } from "@/app/models/dashboard";
import { months } from "@/app/utils/months";
import { Card } from "primereact/card";
import { Chart } from "primereact/chart";
import { useEffect, useState } from "react";

interface DashboardProps {
    customers?: number;
    products?: number;
    sales?: number;
    salesByMonth?: SaleByMonth[];
}

export const Dashboard: React.FC<DashboardProps> = ({ customers, products, sales, salesByMonth }) => {
    const [chartData, setChartData] = useState({});

    const loadGraphicData = () => {
        if (salesByMonth) {
            const labels = salesByMonth.map((sm) => (sm && sm.month !== undefined ? months[sm.month - 1] : ""));
            const values = salesByMonth.map((sm) => sm.value);

            setChartData({
                labels,
                datasets: [
                    {
                        label: "Monthly Sales",
                        backgroundColor: "#4F46E5",
                        borderRadius: 8,
                        data: values,
                    },
                ],
            });
        }
    };

    useEffect(loadGraphicData, [salesByMonth]);

    const cardStyles = {
        base: "p-6 rounded-xl shadow-md transition-transform transform hover:scale-105",
        products: "bg-red-600 text-white",
        customers: "bg-blue-600 text-white",
        sales: "bg-green-600 text-white",
    };

    return (
        <div className="p-6">
            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <div className={`${cardStyles.base} ${cardStyles.products}`}>
                    <h3 className="text-xl font-semibold">Products</h3>
                    <p className="text-4xl font-bold">{products}</p>
                </div>
                <div className={`${cardStyles.base} ${cardStyles.customers}`}>
                    <h3 className="text-xl font-semibold">Customers</h3>
                    <p className="text-4xl font-bold">{customers}</p>
                </div>
                <div className={`${cardStyles.base} ${cardStyles.sales}`}>
                    <h3 className="text-xl font-semibold">Sales</h3>
                    <p className="text-4xl font-bold">{sales}</p>
                </div>
            </div>

            {/* Gráfico */}
            <div className="flex justify-center mt-8 overflow-x-auto">
                <div className="w-full md:w-full lg:w-full bg-white shadow-lg rounded-xl p-2 md:p-6 overflow-x-auto">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales Overview</h3>
                    <Chart type="bar" data={chartData} className="w-full" />
                </div>
            </div>
        </div>
    );
};
