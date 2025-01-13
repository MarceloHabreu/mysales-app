import { Layout } from "@/components/layout";
import { CustomerForm } from "./form";
import { useState } from "react";
import { Customer } from "@/app/models/customers";
import { useCustomerService } from "@/app/services";
import { toast } from "react-toastify";

export const CustomerRegistration: React.FC = () => {
    const [customer, setCustomer] = useState<Customer>({});
    const service = useCustomerService();

    const handleSubmit = (customer: Customer) => {
        console.log(customer);
        if (customer.id) {
            service.update(customer).then(() => {
                toast.success("Customer Successfuly Updated");
            });
        } else {
            service.save(customer).then((customerSaved) => {
                setCustomer(customerSaved);
                toast.success("Customer Successfuly Saved");
            });
        }
    };

    return (
        <Layout title="Customers">
            <CustomerForm customer={customer} onSubmit={handleSubmit} />
        </Layout>
    );
};
