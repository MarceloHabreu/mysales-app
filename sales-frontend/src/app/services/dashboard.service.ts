import { AxiosResponse } from "axios";
import { httpClient } from "../http";
import { DashboardData } from "../models/dashboard";

const resourceURL: string = "/api/dashboard";
const encodeUserId = (userId: string): string => encodeURIComponent(userId);

export const getDashboardData = async (userId: string): Promise<DashboardData> => {
    const response: AxiosResponse<DashboardData> = await httpClient.get(
        `${resourceURL}?userId=${encodeUserId(userId)}`
    );
    return response.data;
};
