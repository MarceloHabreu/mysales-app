import { Input, Layout } from "components";
import { useState, ChangeEvent } from "react";

export const ProductsRegistration: React.FC = () => {
    const [sku, setSku] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");

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

    const submit = () => {
        const product = {
            sku,
            price,
            name,
            description,
        };
        console.log(product);
    };

    return (
        <Layout title="Products">
            <div className="columns">
                <Input id="inputSku" label="SKU: *" columnClasses="is-half" onChange={handleSkuChange} value={sku} placeholder="Enter the product sku" />
                <Input
                    id="inputPrice"
                    label="Price: *"
                    columnClasses="is-half"
                    onChange={handlePriceChange}
                    value={price}
                    placeholder="Enter the product price"
                />
            </div>

            <div className="columns">
                <Input id="inputName" label="Name: *" columnClasses="is-full" onChange={handleNameChange} value={name} placeholder="Enter the product name" />
            </div>

            <div className="columns">
                <div className="field column is-full">
                    <label className="label" htmlFor="inputDesc">
                        Description: *
                    </label>
                    <div className="control">
                        <textarea
                            id="inputDesc"
                            value={description}
                            onChange={handleDescriptionChange}
                            className="textarea"
                            placeholder="Enter the product description"
                        />
                    </div>
                </div>
            </div>

            <div className="field is-grouped">
                <div className="control">
                    <button className="button is-link" onClick={submit}>
                        Save
                    </button>
                </div>
                <div className="control">
                    <button className="button is-dark">Back</button>
                </div>
            </div>
        </Layout>
    );
};
