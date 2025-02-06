import { AxiosResponse } from "axios";
import { httpClient } from "../http";
import { Sale } from "../models/sales";

const resourceURL = "/api/sales";
const encodeUserId = (userId: string): string => encodeURIComponent(userId);

export const useSaleService = () => {
    const makingSale = async (sale: Sale, userId: string): Promise<void> => {
        await httpClient.post<Sale>(resourceURL, sale, {
            params: {
                userId: encodeUserId(userId),
            },
        });
    };

    const generateReportSales = async (
        idCustomer: string = "",
        startDate: string = "",
        endDate: string = "",
        userId: string
    ): Promise<Blob> => {
        const url: string = `${resourceURL}/report-sales?id=${idCustomer}&start=${startDate}&end=${endDate}&userId=${encodeUserId(
            userId
        )}`;
        const response: AxiosResponse = await httpClient.get(url, { responseType: "blob" });
        const bytes = response.data;
        return new Blob([bytes], { type: "application/pdf" });
    };

    return {
        makingSale,
        generateReportSales,
    };
};
