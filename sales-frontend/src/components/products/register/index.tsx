import { useProductService } from "@/app/services";
import { Input, Layout } from "components";
import { useState, ChangeEvent, useEffect } from "react";
import { Product } from "app/models/products";
import { convertToBigDecimal, formatReal } from "@/app/utils/money";
import * as yup from "yup";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";

interface FormErrors {
    sku?: string;
    name?: string;
    price?: string;
    description?: string;
}

interface ValidationErrors {
    [key: string]: string;
}

const validationSchema = yup.object().shape({
    sku: yup.string().trim().required(),
    name: yup.string().trim().required(),
    description: yup.string().trim().required().min(15),
    price: yup.number().required().moreThan(0, "the value must be greater than 0,00"),
});

export const ProductRegistration: React.FC = () => {
    const service = useProductService();
    const [sku, setSku] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [id, setId] = useState<string>("");
    const [registration, setRegistration] = useState<string>("");
    const [errors, setErrors] = useState<FormErrors>({});
    const router = useRouter();
    const { id: queryId } = router.query;

    useEffect(() => {
        if (queryId && typeof queryId === "string") {
            service.loadProduct(queryId).then((productFound) => {
                setId(productFound.id || "");
                setSku(productFound.sku);
                setRegistration(productFound.registration || "");
                setName(productFound.name);
                setDescription(productFound.description || "");
                setPrice(formatReal(`${productFound.price}`));
            });
        }
    }, [queryId]);

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
            id,
            sku,
            price: convertToBigDecimal(price),
            name,
            description,
        };

        validationSchema
            .validate(product, { abortEarly: false })
            .then((obj) => {
                setErrors({});
                if (id) {
                    service.update(product).then(() => {
                        toast.success("Product Successfuly Updated");
                        router.push("/list/products");
                    });
                } else {
                    service.save(product).then((productResponse) => {
                        setId(productResponse.id || "");
                        setRegistration(productResponse.registration || "");
                        toast.success("Product Successfuly Saved");
                    });
                }
            })
            .catch((err) => {
                const errorMessages = err.inner.reduce((acc: ValidationErrors, curr: ValidationErrors) => {
                    acc[curr.path] = curr.message;
                    return acc;
                }, {});
                setErrors(errorMessages);
            });
    };
    return (
        <Layout title="Products">
            <form className="h-full mt-4 flex flex-col gap-4" onSubmit={submit}>
                {id && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-zinc-400">
                        <Input
                            className="bg-gray-200 text-gray-500 border-none cursor-not-allowed opacity-70"
                            id="inputId"
                            label="Id:"
                            value={id}
                            disabled
                            icon={<span>🔒</span>}
                        />
                        <Input
                            className="bg-gray-200 text-gray-500 border-none cursor-not-allowed opacity-70"
                            id="inputRegistration"
                            label="Registration:"
                            value={registration}
                            disabled
                            icon={<span>🔒</span>}
                        />
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                        id="inputSku"
                        label="SKU: *"
                        onChange={handleSkuChange}
                        value={sku}
                        placeholder="Enter the product sku"
                        error={errors.sku}
                    />
                    <Input
                        id="inputPrice"
                        label="Price: *"
                        onChange={handlePriceChange}
                        value={price}
                        placeholder="Enter the product price"
                        currency
                        maxLength={16}
                        error={errors.price}
                    />
                </div>
                <Input
                    id="inputName"
                    label="Name: *"
                    onChange={handleNameChange}
                    value={name}
                    placeholder="Enter the product name"
                    error={errors.name}
                />
                <div>
                    <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="inputDesc">
                        Description: *
                    </label>
                    <textarea
                        id="inputDesc"
                        value={description}
                        onChange={handleDescriptionChange}
                        className={`shadow focus:shadow-outline appearance-none border rounded w-full h-40 resize-none py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                            errors.description ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                        }`}
                        placeholder="Enter the product description"
                    />
                    {errors.description && (
                        <p role="alert" aria-live="assertive" className="text-red-500 text-sm mt-1">
                            {errors.description}
                        </p>
                    )}
                </div>
                <div className="flex justify-end gap-4">
                    <Link href="/list/products">
                        <button
                            type="button"
                            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Back
                        </button>
                    </Link>
                    <button
                        type="submit"
                        className={`${
                            id ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                        } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                    >
                        {id ? "Update" : "Save"}
                    </button>
                </div>
            </form>
        </Layout>
    );
};
