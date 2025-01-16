import { Layout } from "@/components/layout";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { TableProducts } from "./table";
import { Product } from "@/app/models/products";
import useSWR, { mutate } from "swr";
import { httpClient } from "@/app/http";
import { AxiosResponse } from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { useRouter } from "next/router";
import { useProductService } from "@/app/services";
import AddIcon from "@mui/icons-material/Add";
import { Input } from "@/components/common";
import SearchIcon from "@mui/icons-material/Search";

export const ProductList: React.FC = () => {
    const { data: result, error } = useSWR<AxiosResponse<Product[]>>("/api/products", (url: string) =>
        httpClient.get(url)
    );

    const service = useProductService();
    const router = useRouter();

    if (!result) {
        return (
            <div className="flex flex-col justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
                <ClipLoader color="#F7BE38" size={50} />
                <p className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-200">Carregando...</p>
            </div>
        );
    }

    const update = async (product: Product) => {
        const url = `/registrations/products?id=${product.id}`;
        await router.push(url);
    };

    const remove = (product: Product) => {
        service.remove(product.id || "").then(() => {
            mutate("/api/products");
        });
    };

    return (
        <Layout title="Products">
            <form>
                <div className="grid md:grid-cols-2 gap-6 text-zinc-400">
                    <Input label="Name:" id="name" name="name" placeholder="Enter customer name" />
                    <Input label="SKU:" id="sku" name="sku" placeholder="Enter product sku" />
                </div>
                <div className="mt-4 mb-2">
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

            <TableProducts onEdit={update} onDelete={remove} products={result?.data || [""]} />
        </Layout>
    );
};
