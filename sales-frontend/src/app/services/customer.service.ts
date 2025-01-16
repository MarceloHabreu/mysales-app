import { AxiosResponse } from "axios";
import { Customer } from "../models/customers";
import { httpClient } from "../http";
import { Page } from "../models/common/page";
import { toast } from "react-toastify";

const resourceURL: string = "/api/customers";

export const useCustomerService = () => {
    const save = async (customer: Customer): Promise<Customer | string> => {
        try {
            const response: AxiosResponse<Customer> = await httpClient.post<Customer>(resourceURL, customer);
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.status === 409) {
                toast.error("Email already exists!");
                return "error";
            }
            throw new Error();
        }
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

    const find = async (
        name: string = "",
        cpf: string = "",
        page: number = 0,
        size: number = 3
    ): Promise<Page<Customer>> => {
        const url: string = `${resourceURL}?name=${name}&cpf=${cpf}&page=${page}&size=${size}`;
        const response: AxiosResponse<Page<Customer>> = await httpClient.get(url);
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
        find,
        remove,
    };
};
