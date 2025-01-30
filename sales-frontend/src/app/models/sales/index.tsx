import { Customer } from "../customers";
import { Product } from "../products";

export interface Sale {
    customer?: Customer | null;
    items?: Array<ItemSale>;
    paymentMethod?: string;
    total: number;
}

export interface ItemSale {
    product: Product;
    quantity: number;
}
