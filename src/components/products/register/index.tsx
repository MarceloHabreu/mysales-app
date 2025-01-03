import { useProductService } from "@/app/services";
import { Input, Layout } from "components";
import { useState, ChangeEvent } from "react";
import { Product } from "app/models/products";

export const ProductsRegistration: React.FC = () => {
    const service = useProductService();
    const [sku, setSku] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [id, setId] = useState<string>("");
    const [registration, setRegistration] = useState<string>("");

    const handleSkuChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSku(e.target.value);
    };

    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPrice(e.target.value);
    };

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const product: Product = {
            sku,
            price: parseFloat(price),
            name,
            description,
        };
        service.save(product).then((productResponse) => {
            setId(productResponse.id);
            setRegistration(productResponse.registrationDate);
        });
    };

    return (
        <Layout title="Products">
            <form className="h-full mt-4 flex flex-col gap-4" onSubmit={submit}>
                {id && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-zinc-400">
                        <Input className="text-gray-800" id="inputId" label="Id:" value={id} disabled />
                        <Input className="text-gray-800" id="inputRegistration" label="Registration:" value={registration} disabled />
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input id="inputSku" label="SKU: *" onChange={handleSkuChange} value={sku} placeholder="Enter the product sku" />
                    <Input id="inputPrice" label="Price: *" onChange={handlePriceChange} value={price} placeholder="Enter the product price" />
                </div>
                <Input id="inputName" label="Name: *" onChange={handleNameChange} value={name} placeholder="Enter the product name" />
                <div>
                    <label className="block text-gray-700 text-xl font-bold mb-2" htmlFor="inputDesc">
                        Description: *
                    </label>
                    <textarea
                        id="inputDesc"
                        value={description}
                        onChange={handleDescriptionChange}
                        className="shadow appearance-none border rounded w-full h-40 resize-none py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter the product description"
                    />
                </div>
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Back
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Save
                    </button>
                </div>
            </form>
        </Layout>
    );
};
