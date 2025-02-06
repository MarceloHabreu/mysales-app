import { Layout } from "@/components/layout";
import { CustomerForm } from "./form";
import { useEffect, useState } from "react";
import { Customer } from "@/app/models/customers";
import { useCustomerService } from "@/app/services";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useUser } from "@/context/UserContext";

export const CustomerRegistration: React.FC = () => {
    const [customer, setCustomer] = useState<Customer>({});
    const service = useCustomerService();
    const router = useRouter();
    const { id: queryId } = router.query;

    const { userId } = useUser();

    useEffect(() => {
        if (queryId && typeof queryId === "string") {
            service.loadCustomer(queryId, userId || "").then((customerFound) => setCustomer(customerFound));
        }
    }, [queryId, userId]);

    const handleSubmit = async (customer: Customer) => {
        try {
            if (customer.id) {
                await service.update(customer, userId || "");
                router.push("/list/customers");
                toast.success("Customer Successfully Updated");
            } else {
                const savedCustomer = await service.save(customer, userId || "");
                if (savedCustomer !== "error") {
                    setCustomer(savedCustomer);
                    toast.success("Customer Successfully Saved");
                }
            }
        } catch (error: any) {
            if (error.message === "Email already exists!") {
                toast.error("Email already exists!");
            } else {
                toast.error("An unexpected error occurred!");
            }
        }
    };

    return (
        <Layout title="Customers">
            <CustomerForm customer={customer} onSubmit={handleSubmit} />
        </Layout>
    );
};
