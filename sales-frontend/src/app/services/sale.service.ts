import { httpClient } from "../http";
import { Sale } from "../models/sales";

const resourceURL = "/api/sales";

export const useSaleService = () => {
    const makingSale = async (sale: Sale): Promise<void> => {
        await httpClient.post<Sale>(resourceURL, sale);
    };

    return {
        makingSale,
    };
};
