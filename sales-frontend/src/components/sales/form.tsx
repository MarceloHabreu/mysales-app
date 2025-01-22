import { Page } from "@/app/models/common/page";
import { Customer } from "@/app/models/customers";
import { Product } from "@/app/models/products";
import { ItemSale, Sale } from "@/app/models/sales";
import { useCustomerService, useProductService } from "@/app/services";
import { useFormik } from "formik";
import { AutoComplete, AutoCompleteChangeEvent, AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { Dropdown } from "primereact/dropdown";
import { validationScheme } from "./validationSchema";
import { FiTrash2 } from "react-icons/fi";

// Intl uma lib nativa do js que permite internacionalizaçao de valor
const formatterMoney = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

interface SalesFormProps {
    onSubmit: (sale: Sale) => void;
}

const formSchema: Sale = {
    customer: null,
    items: [],
    total: 0,
    paymentMethod: "",
};

export const SalesForm: React.FC<SalesFormProps> = ({ onSubmit }) => {
    const paymentMethods: String[] = ["Cash", "Card"];
    const customerService = useCustomerService();
    const productService = useProductService();
    const [listProducts, setListProducts] = useState<Product[]>([]);
    const [listFilteredProducts, setListFilteredProducts] = useState<Product[]>([]);
    const [listCustomers, setListCustomers] = useState<Customer[]>([]);
    const [qtyProduct, setQtyProduct] = useState<number>(0);
    const [product, setProduct] = useState<Product>();
    const [message, setMessage] = useState<string>("");
    const [codeProduct, setCodeProduct] = useState<string>("");

    const formik = useFormik<Sale>({
        onSubmit,
        initialValues: formSchema,
        validationSchema: validationScheme,
    });

    const resetForm = () => {
        setProduct(null);
        setCodeProduct("");
        setQtyProduct(0);
    };

    useEffect(() => {
        // This effect will run every time the 'items' array changes
    }, [formik.values.items]);

    // Método para buscar os clientes com base na query
    const handleCustomerAutoComplete = (e: AutoCompleteCompleteEvent) => {
        const name = e.query;
        customerService
            .find(name, "", 0, 20)
            .then((response) => {
                setListCustomers(response.content || []);
            })
            .catch((error) => {
                console.error("Erro ao buscar clientes:", error);
                setListCustomers([]); // Se ocorrer erro, limpar sugestões
            });
    };

    // Método para atualizar o cliente selecionado
    const handleCustomerChange = (e: AutoCompleteChangeEvent) => {
        const customerSelected: Customer = e.value;
        if (customerSelected) {
            formik.setFieldValue("customer", customerSelected);
        }
    };

    // Seta o valor do code
    const handleCodeProductChange = (e: any) => {
        setCodeProduct(e.target.value);
    };

    // Método para buscar produtos com base no código
    const handleCodeProductBlur = () => {
        if (codeProduct) {
            productService
                .loadProduct(codeProduct)
                .then((productFound) => {
                    setProduct(productFound);
                })
                .catch(() => {
                    setMessage("Product Not Found. Try Again!");
                    resetForm();
                });
        }
    };

    const handleAddProduct = () => {
        if (product) {
            const itemsAdded = formik.values.items;
            const alreadyExistInSale = itemsAdded?.some((is: ItemSale) => {
                return is.product.id === product.id;
            });

            if (alreadyExistInSale) {
                itemsAdded?.forEach((is: ItemSale) => {
                    if (is.product.id === product.id) {
                        is.quantity = is.quantity + qtyProduct;
                    }
                });
            } else {
                itemsAdded?.push({
                    product: product,
                    quantity: qtyProduct,
                });
            }
            resetForm();

            const total = totalSale();
            formik.setFieldValue("total", total);
        }
    };

    const handleProductAutoComplete = async (e: AutoCompleteCompleteEvent) => {
        if (!listProducts.length) {
            const productsFound = await productService.list();
            setListProducts(productsFound);
        }

        const productsFound = listProducts.filter((product: Product) => {
            return product.name.toUpperCase().includes(e.query.toUpperCase());
        });

        setListFilteredProducts(productsFound);
    };

    const totalSale = () => {
        const totais: number[] | undefined = formik.values.items?.map(
            (itemSale) => itemSale.quantity * itemSale.product.price
        );
        if (totais?.length) {
            return totais.reduce((sumCurrent = 0, valueItemCurrent) => sumCurrent + valueItemCurrent);
        } else {
            return 0;
        }
    };

    const dialogMessageFooter = () => {
        return (
            <div>
                <Button
                    className="bg-indigo-500 hover:bg-indigo-600 text-white text-base font-medium py-2 px-3 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    label="Ok"
                    onClick={() => setMessage("")}
                />
            </div>
        );
    };

    const disableAddProductButton = () => {
        return !product || !qtyProduct;
    };

    return (
        <div className="grid disable-tailwind">
            <form onSubmit={formik.handleSubmit}>
                <div className="p-fluid">
                    <div className="p-field mb-6">
                        <label htmlFor="customer" className="block text-sm font-medium text-gray-700 mb-2">
                            Customer: *
                        </label>
                        <div className="relative">
                            <AutoComplete
                                id="customer"
                                name="customer"
                                field="name"
                                onChange={handleCustomerChange}
                                value={formik.values.customer}
                                suggestions={listCustomers}
                                completeMethod={handleCustomerAutoComplete}
                                dropdown
                                className="w-full p-autocomplete-custom" // Adiciona uma classe personalizada
                                panelClassName="custom-panel" // Personaliza o dropdown
                            />
                            <small className="p-error p-d-block">{formik.errors.customer}</small>
                        </div>
                    </div>

                    <div className="grid grid-cols-12 gap-3 mt-4">
                        {/* Code Input */}
                        <div className="col-span-2">
                            <FloatLabel>
                                <InputText
                                    id="codeProduct"
                                    onBlur={handleCodeProductBlur}
                                    onChange={handleCodeProductChange}
                                    value={codeProduct}
                                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                                <label htmlFor="codeProduct" className="text-gray-500">
                                    Code
                                </label>
                            </FloatLabel>
                        </div>

                        {/* Product Selection */}
                        <div className="col-span-6">
                            <AutoComplete
                                id="product"
                                name="product"
                                field="name"
                                value={product}
                                onChange={(e) => setProduct(e.value)}
                                suggestions={listFilteredProducts}
                                completeMethod={handleProductAutoComplete}
                                dropdown
                                className="w-full p-autocomplete-custom" // Adiciona uma classe personalizada
                                panelClassName="custom-panel" // Personaliza o dropdown
                            />
                        </div>

                        {/* Quantity Input */}
                        <div className="col-span-2">
                            <FloatLabel>
                                <InputText
                                    id="qtyProduct"
                                    value={qtyProduct}
                                    onChange={(e) => setQtyProduct(parseInt(e.target.value))}
                                    className="w-full p-3 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                />
                                <label htmlFor="qtyProduct" className="text-gray-500">
                                    QTY
                                </label>
                            </FloatLabel>
                        </div>

                        {/* Add Button */}
                        <div className="col-span-2">
                            <Button
                                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium py-3 px-4 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                                label="Add"
                                type="submit"
                                onClick={handleAddProduct}
                                disabled={disableAddProductButton()}
                            />
                        </div>
                    </div>

                    <div className="grid-col-12 mt-6 mb-6">
                        <DataTable
                            value={formik.values.items}
                            selectionMode="single"
                            className="hover:bg-gray-100 rounded-lg"
                            rowClassName={() => "border-b border-gray-200"}
                            emptyMessage={<div className="empty-message"> No products added.</div>}
                        >
                            <Column
                                headerStyle={{
                                    borderBottom: "1px solid #e2e8f0",
                                    borderColor: "#e2e8f0",
                                }}
                                body={(item: ItemSale) => {
                                    const handleDeleteItem = () => {
                                        const newList = formik.values.items?.filter(
                                            (is) => is.product.id !== item.product.id
                                        );
                                        formik.setFieldValue("items", newList);

                                        const totalUpdated = newList?.reduce(
                                            (sumCurrent, currentItem) =>
                                                (sumCurrent = currentItem.quantity * currentItem.product.price),
                                            0
                                        );
                                        formik.setFieldValue("total", totalUpdated);
                                    };
                                    return (
                                        <button
                                            type="button"
                                            onClick={handleDeleteItem}
                                            className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-1 px-3 rounded"
                                        >
                                            <FiTrash2 className="inline mr-1 text-base" /> Delete
                                        </button>
                                    );
                                }}
                            />
                            <Column
                                field="product.id"
                                header="Code"
                                headerStyle={{
                                    borderBottom: "1px solid #e2e8f0",
                                    borderColor: "#e2e8f0",
                                }}
                            />
                            <Column
                                field="product.sku"
                                header="SKU"
                                headerStyle={{
                                    borderBottom: "1px solid #e2e8f0",
                                    borderColor: "#e2e8f0",
                                }}
                            />
                            <Column
                                field="product.name"
                                header="Product"
                                headerStyle={{
                                    borderBottom: "1px solid #e2e8f0",
                                    borderColor: "#e2e8f0",
                                }}
                            />
                            <Column
                                field="product.price"
                                header="Unit Price"
                                headerStyle={{
                                    borderBottom: "1px solid #e2e8f0",
                                    borderColor: "#e2e8f0",
                                }}
                            />
                            <Column
                                field="quantity"
                                header="QTY"
                                headerStyle={{
                                    borderBottom: "1px solid #e2e8f0",
                                    borderColor: "#e2e8f0",
                                }}
                            />
                            <Column
                                header="Total"
                                headerStyle={{
                                    borderBottom: "1px solid #e2e8f0",
                                    borderColor: "#e2e8f0",
                                }}
                                body={(is: ItemSale) => {
                                    const total = is.product.price * is.quantity;
                                    const totalFormatted = formatterMoney.format(total);
                                    return <div>{totalFormatted}</div>;
                                }}
                            />
                        </DataTable>
                        <small className="p-error p-d-block  w-ful flex items-center justify-center">
                            {formik.touched && formik.errors.items}
                        </small>
                    </div>

                    <div className="grid grid-cols-12 gap-3 mt-5">
                        <div className="col-span-4">
                            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 mb-2">
                                Payment Method: *
                            </label>
                            <Dropdown
                                id="paymentMethod"
                                options={paymentMethods}
                                value={formik.values.paymentMethod}
                                onChange={(e) => formik.setFieldValue("paymentMethod", e.value)}
                                placeholder="Select..."
                                className="border-2 hover:border-indigo-600 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />
                            <small className="p-error p-d-block">{formik.touched && formik.errors.paymentMethod}</small>
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="items" className="block text-sm font-medium text-gray-700 mb-2">
                                Items:
                            </label>
                            <InputText
                                disabled
                                value={formik.values.items?.length}
                                className="w-full p-3 border-strong rounded-md"
                            />
                        </div>

                        <div className="col-span-2">
                            <label htmlFor="total" className="block text-sm font-medium text-gray-700 mb-2">
                                Total:
                            </label>
                            <InputText
                                disabled
                                value={formatterMoney.format(formik.values.total)}
                                className="w-full p-3 border-strong rounded-md"
                            />
                        </div>
                    </div>

                    {/* Finish Button */}
                    <div className="mt-6">
                        <button
                            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium py-3 px-4 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            type="submit"
                        >
                            Finish
                        </button>
                    </div>

                    {/* Dialog */}
                    <Dialog
                        header={"Atenção"}
                        position="top"
                        visible={!!message}
                        onHide={() => setMessage("")}
                        footer={dialogMessageFooter}
                    >
                        {message}
                    </Dialog>
                </div>
            </form>
        </div>
    );
};
