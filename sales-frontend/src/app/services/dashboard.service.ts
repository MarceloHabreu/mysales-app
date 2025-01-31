import { AxiosResponse } from "axios";
import { httpClient } from "../http";
import { DashboardData } from "../models/dashboard";

const resourceURL: string = "/api/dashboard";

export const getDashboardData = async (): Promise<DashboardData> => {
    const response: AxiosResponse<DashboardData> = await httpClient.get(resourceURL);
    return response.data;
};
