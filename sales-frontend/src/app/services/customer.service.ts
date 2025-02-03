import { AxiosResponse } from "axios";
import { Customer } from "../models/customers";
import { httpClient } from "../http";
import { Page } from "../models/common/page";
import { toast } from "react-toastify";

const resourceURL: string = "/api/customers";

export const useCustomerService = () => {
    const save = async (customer: Customer, userEmail: string): Promise<Customer | string> => {
        try {
            const response: AxiosResponse<Customer> = await httpClient.post<Customer>(resourceURL, {
                ...customer,
                userEmail,
            });
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.status === 409) {
                toast.error("Email already exists!");
                return "error";
            }
            throw new Error();
        }
    };

    const update = async (customer: Customer, userEmail: string): Promise<void> => {
        const url: string = `${resourceURL}/${customer.id}?userEmail=${userEmail}`;
        await httpClient.put<Customer>(url, customer);
    };

    const loadCustomer = async (id: string, userEmail: string): Promise<Customer> => {
        const url: string = `${resourceURL}/${id}?userEmail=${userEmail}`;
        const response: AxiosResponse<Customer> = await httpClient.get(url);
        return response.data;
    };

    const find = async (
        name: string = "",
        cpf: string = "",
        page: number = 0,
        size: number = 3,
        userEmail: string
    ): Promise<Page<Customer>> => {
        const url: string = `${resourceURL}?name=${name}&cpf=${cpf}&page=${page}&size=${size}&userEmail=${userEmail}`;
        const response: AxiosResponse<Page<Customer>> = await httpClient.get(url);
        return response.data;
    };

    const remove = async (id: string, userEmail: string): Promise<void> => {
        const url: string = `${resourceURL}/${id}?userEmail=${userEmail}`;
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
