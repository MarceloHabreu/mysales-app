import { httpClient } from "app/http";
import { Product } from "app/models/products";
import { AxiosResponse } from "axios";

const resourceURL: string = "/api/products";

export const useProductService = () => {
    const save = async (product: Product, userEmail: string): Promise<Product> => {
        const response: AxiosResponse<Product> = await httpClient.post<Product>(resourceURL, { ...product, userEmail });
        return response.data;
    };

    const update = async (product: Product, userEmail: string): Promise<void> => {
        const url: string = `${resourceURL}/${product.id}?userEmail=${userEmail}`;
        await httpClient.put<Product>(url, product);
    };

    const loadProduct = async (id: string, userEmail: string): Promise<Product> => {
        const url: string = `${resourceURL}/${id}?userEmail=${userEmail}`;
        const response: AxiosResponse<Product> = await httpClient.get<Product>(url);
        return response.data;
    };

    const remove = async (id: string, userEmail: string): Promise<void> => {
        const url: string = `${resourceURL}/${id}?userEmail=${userEmail}`;
        await httpClient.delete(url);
    };

    const list = async (userEmail: string): Promise<Product[]> => {
        const response: AxiosResponse<Product[]> = await httpClient.get(`${resourceURL}?userEmail=${userEmail}`);
        return response.data;
    };

    return {
        save,
        update,
        loadProduct,
        remove,
        list,
    };
};
