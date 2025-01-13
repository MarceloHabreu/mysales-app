import { AxiosResponse } from "axios";
import { Customer } from "../models/customers";
import { httpClient } from "../http";

const resourceURL: string = "/api/customers";

export const useCustomerService = () => {
    const save = async (customer: Customer): Promise<Customer> => {
        console.log("Payload enviado:", customer);
        const response: AxiosResponse<Customer> = await httpClient.post<Customer>(resourceURL, customer);
        return response.data;
    };

    const update = async (customer: Customer): Promise<void> => {
        const url: string = `${resourceURL}/${customer.id}`;
        await httpClient.put<Customer>(url, customer);
    };

    const loadCustomer = async (id: string): Promise<Customer> => {
        const url: string = `${resourceURL}/${id}`;
        const response: AxiosResponse<Customer> = await httpClient.get(url);
        return response.data;
    };

    const remove = async (id: string): Promise<void> => {
        const url: string = `${resourceURL}/${id}`;
        await httpClient.delete(url);
    };

    return {
        save,
        update,
        loadCustomer,
        remove,
    };
};
