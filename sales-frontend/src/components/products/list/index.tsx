import { Layout } from "@/components/layout";
import { TableProducts } from "./table";
import { Product } from "@/app/models/products";
import useSWR, { mutate } from "swr";
import { httpClient } from "@/app/http";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useProductService } from "@/app/services";
import AddIcon from "@mui/icons-material/Add";
import { Input } from "@/components/common";
import { useCallback, useState } from "react";
import { useUser } from "@/context/UserContext";

export const ProductList: React.FC = () => {
    const { userId } = useUser();
    const [filters, setFilters] = useState({ name: "", sku: "" });
    const encodedUserId = encodeURIComponent(userId || "");

    const { data: result, error } = useSWR<AxiosResponse<Product[]>>(
        `/api/products?name=${filters.name}&sku=${filters.sku}&userId=${encodedUserId}`,
        (url: string) => httpClient.get(url)
    );

    const handleInputChange = (name: string, value: string) => {
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const service = useProductService();
    const router = useRouter();

    const update = async (product: Product) => {
        const url = `/registrations/products?id=${product.id}&userId=${encodedUserId}`;
        await router.push(url);
    };

    const remove = (product: Product) => {
        service.remove(product.id || "", userId || "").then(() => {
            mutate(`/api/products?name=${filters.name}&sku=${filters.sku}&userId=${encodedUserId}`);
        });
    };

    return (
        <Layout title="Products">
            <form onSubmit={(e) => e.preventDefault()} className="mb-6">
                <div className="grid md:grid-cols-2 md:gap-6 text-zinc-400">
                    <Input
                        label="Name:"
                        id="name"
                        name="name"
                        value={filters.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="Enter customer name"
                    />
                    <Input
                        label="SKU:"
                        id="sku"
                        name="sku"
                        value={filters.sku}
                        onChange={(e) => handleInputChange("sku", e.target.value)}
                        placeholder="Enter product sku"
                    />
                </div>
                <div className="mt-3 mb-2">
                    <button
                        type="button"
                        onClick={() => router.push("/registrations/products")}
                        className="bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        <AddIcon className="mr-1" />
                        New
                    </button>
                </div>
            </form>

            <TableProducts onEdit={update} onDelete={remove} products={result?.data || []} />
        </Layout>
    );
};
