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
            const labels = salesByMonth.map((sm) => {
                if (sm && sm.month !== undefined) {
                    return months[sm.month - 1];
                }
                return "";
            });

            const values = salesByMonth.map((sm) => sm.value);

            const dataGraphic = {
                labels: labels,
                datasets: [
                    {
                        label: "Monthly Sales",
                        backgroundColor: "#42A5F5",
                        data: values,
                    },
                ],
            };

            setChartData(dataGraphic);
        }
    };

    useEffect(loadGraphicData, [salesByMonth]);

    const productCardStyle = {
        background: "red",
        color: "white",
    };
    const customerCardStyle = {
        background: "blue",
        color: "white",
    };
    const saleCardStyle = {
        background: "green",
        color: "white",
    };

    return (
        <>
            <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                    <Card title="Products" style={productCardStyle}>
                        <p className="p-m-0">{products}</p>
                    </Card>
                </div>
                <div className="col-span-1">
                    <Card title="Customers" style={customerCardStyle}>
                        <p className="p-m-0">{customers}</p>
                    </Card>
                </div>
                <div className="col-span-1">
                    <Card title="Sales" style={saleCardStyle}>
                        <p className="p-m-0">{sales}</p>
                    </Card>
                </div>
            </div>
            <div className="grid mt-4">
                <Chart type="bar" data={chartData} className="w-full md:w-5rem justify-center" />
            </div>
        </>
    );
};
