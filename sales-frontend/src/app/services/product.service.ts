import { httpClient } from "app/http";
import { Product } from "app/models/products";
import { AxiosResponse } from "axios";

const resourceURL: string = "/api/products";

export const useProductService = () => {
    const save = async (product: Product): Promise<Product> => {
        const response: AxiosResponse<Product> = await httpClient.post<Product>(resourceURL, product);
        return response.data;
    };

    const update = async (product: Product): Promise<void> => {
        const url: string = `${resourceURL}/${product.id}`;
        await httpClient.put<Product>(url, product);
    };

    const loadProduct = async (id: string): Promise<Product> => {
        const url: string = `${resourceURL}/${id}`;
        const response: AxiosResponse<Product> = await httpClient.get<Product>(url);
        return response.data;
    };

    const deleteProduct = async (id: string): Promise<void> => {
        const url: string = `${resourceURL}/${id}`;
        await httpClient.delete(url);
    };

    return {
        save,
        update,
        loadProduct,
        deleteProduct,
    };
};
