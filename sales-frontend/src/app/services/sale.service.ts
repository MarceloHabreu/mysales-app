import { AxiosResponse } from "axios";
import { httpClient } from "../http";
import { Sale } from "../models/sales";

const resourceURL = "/api/sales";

export const useSaleService = () => {
    const makingSale = async (sale: Sale): Promise<void> => {
        await httpClient.post<Sale>(resourceURL, sale);
    };

    const generateReportSales = async (
        idCustomer: string = "",
        startDate: string = "",
        endDate: string = ""
    ): Promise<Blob> => {
        const url: string = `${resourceURL}/report-sales?id=${idCustomer}&start=${startDate}&end=${endDate}`;
        const response: AxiosResponse = await httpClient.get(url, { responseType: "blob" });
        const bytes = response.data;
        return new Blob([bytes], { type: "application/pdf" });
    };

    return {
        makingSale,
        generateReportSales,
    };
};
