export interface DashboardData {
    products?: number;
    customers?: number;
    sales?: number;
    salesByMonth?: SaleByMonth[];
}

export interface SaleByMonth {
    month?: number;
    value?: number;
}
