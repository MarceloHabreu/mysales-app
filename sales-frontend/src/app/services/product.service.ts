import { httpClient } from "app/http";
import { Product } from "app/models/products";
import { AxiosResponse } from "axios";

const resourceURL: string = "/api/products";

const encodeUserId = (userId: string): string => encodeURIComponent(userId);

export const useProductService = () => {
    const save = async (product: Product, userId: string): Promise<Product> => {
        const response: AxiosResponse<Product> = await httpClient.post<Product>(resourceURL, {
            ...product,
            userId: encodeUserId(userId),
        });
        return response.data;
    };

    const update = async (product: Product, userId: string): Promise<void> => {
        const url: string = `${resourceURL}/${product.id}?userId=${encodeUserId(userId)}`;
        await httpClient.put<Product>(url, product);
    };

    const loadProduct = async (id: string, userId: string): Promise<Product> => {
        const url: string = `${resourceURL}/${id}?userId=${encodeUserId(userId)}`;
        const response: AxiosResponse<Product> = await httpClient.get<Product>(url);
        return response.data;
    };

    const remove = async (id: string, userId: string): Promise<void> => {
        const url: string = `${resourceURL}/${id}?userId=${encodeUserId(userId)}`;
        await httpClient.delete(url);
    };

    const list = async (userId: string): Promise<Product[]> => {
        const response: AxiosResponse<Product[]> = await httpClient.get(
            `${resourceURL}?userId=${encodeUserId(userId)}`
        );
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
