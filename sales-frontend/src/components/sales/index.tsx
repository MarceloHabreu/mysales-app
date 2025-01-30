import { Sale } from "@/app/models/sales";
import { Layout } from "../layout";
import { SalesForm } from "./form";
import { useSaleService } from "@/app/services";
import { toast } from "react-toastify";
import { useState } from "react";

export const Sales: React.FC = () => {
    const service = useSaleService();
    const [saleCompleted, setSaleCompleted] = useState<boolean>(false);

    const handleSubmit = (sale: Sale) => {
        console.log(sale);

        service
            .makingSale(sale)
            .then(() => {
                toast.success("sale successfully completed");
                setSaleCompleted(true);
            })
            .catch(() => {
                toast.error("Something went wrong, try again later!");
            });
    };

    const handleNewSale = () => {
        setSaleCompleted(false);
    };
    return (
        <Layout title="Sales">
            <SalesForm onSubmit={handleSubmit} saleCompleted={saleCompleted} onNewSale={handleNewSale} />
        </Layout>
    );
};
