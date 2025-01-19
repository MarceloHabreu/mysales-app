import { Customer } from "../customers";
import { Product } from "../products";

export interface Sale {
    customer?: Customer;
    products?: Array<Product>;
    paymentMethod?: string;
    total: number;
}
