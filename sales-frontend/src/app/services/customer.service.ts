import { AxiosResponse } from "axios";
import { Customer } from "../models/customers";
import { httpClient } from "../http";
import { Page } from "../models/common/page";
import { toast } from "react-toastify";

const resourceURL: string = "/api/customers";

const encodeUserId = (userId: string): string => encodeURIComponent(userId);

export const useCustomerService = () => {
    const save = async (customer: Customer, userId: string): Promise<Customer | string> => {
        try {
            const response: AxiosResponse<Customer> = await httpClient.post<Customer>(resourceURL, {
                ...customer,
                userId: encodeUserId(userId),
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

    const update = async (customer: Customer, userId: string): Promise<void> => {
        const url: string = `${resourceURL}/${customer.id}?userId=${encodeUserId(userId)}`;
        await httpClient.put<Customer>(url, customer);
    };

    const loadCustomer = async (id: string, userId: string): Promise<Customer> => {
        const url: string = `${resourceURL}/${id}?userId=${encodeUserId(userId)}`;
        const response: AxiosResponse<Customer> = await httpClient.get(url);
        return response.data;
    };

    const find = async (
        name: string = "",
        cpf: string = "",
        page: number = 0,
        size: number = 3,
        userId: string
    ): Promise<Page<Customer>> => {
        const url: string = `${resourceURL}?name=${name}&cpf=${cpf}&page=${page}&size=${size}&userId=${encodeUserId(
            userId
        )}`;
        const response: AxiosResponse<Page<Customer>> = await httpClient.get(url);
        return response.data;
    };

    const remove = async (id: string, userId: string): Promise<void> => {
        const url: string = `${resourceURL}/${id}?userId=${encodeUserId(userId)}`;
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
