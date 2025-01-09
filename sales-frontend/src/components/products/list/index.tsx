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
        service.deleteProduct(product.id || "").then((response) => {
            mutate("/api/products");
        });
    };

    return (
        <Layout title="Products">
            <a href="/registrations/products">
                <button
                    type="button"
                    className="mt-4 text-gray-900 bg-yellow-500 hover:bg-yellow-400 focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-4 shadow-lg transform transition-transform duration-200 ease-in-out hover:scale-105"
                >
                    <AddCircleOutlineIcon className="mr-1 " /> New Product
                </button>
            </a>
            <TableProducts onEdit={update} onDelete={remove} products={result?.data || [""]} />
        </Layout>
    );
};
