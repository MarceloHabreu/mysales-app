import { Page } from "@/app/models/common/page";
import { Customer } from "@/app/models/customers";
import { Sale } from "@/app/models/sales";
import { useCustomerService } from "@/app/services";
import { useFormik } from "formik";
import { AutoComplete, AutoCompleteChangeEvent, AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

interface SalesFormProps {
    onSubmit: (sale: Sale) => void;
}

const formSchema: Sale = {
    customer: {},
    products: [],
    total: 0,
    paymentMethod: "",
};

export const SalesForm: React.FC<SalesFormProps> = ({ onSubmit }) => {
    const customerService = useCustomerService();
    const [listCustomers, setListCustomers] = useState<Customer[]>([]);
    const [codeProduct, setCodeProduct] = useState<string>();

    const formik = useFormik<Sale>({
        onSubmit,
        initialValues: formSchema,
    });

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
        const customerSelected = e.value;
        if (customerSelected) {
            formik.setFieldValue("customer", customerSelected);
        }
    };

    const handleCodeProductChange = (e: Event) => {
        console.log(codeProduct);
    };

    return (
        <div className="grid">
            <form onSubmit={formik.handleSubmit}>
                <div className="p-fluid">
                    <div className="p-field">
                        <label htmlFor="customer" className="block text-sm font-medium text-gray-700">
                            Customer: *
                        </label>
                        <AutoComplete
                            id="customer"
                            name="customer"
                            field="name"
                            onChange={handleCustomerChange}
                            value={formik.values.customer}
                            suggestions={listCustomers}
                            completeMethod={handleCustomerAutoComplete}
                            dropdown
                            className="mt-1 w-full h-12 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg px-3 py-2"
                        />
                        <div className="grid grid-cols-12 gap-3 mt-4">
                            <div className="col-span-2">
                                <FloatLabel>
                                    <InputText
                                        id="codeProduct"
                                        value={codeProduct}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                    <label htmlFor="codeProduct">Code</label>
                                </FloatLabel>
                            </div>
                            <div className="col-span-6">
                                <AutoComplete className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
                            </div>
                            <div className="col-span-2">
                                <FloatLabel>
                                    <InputText
                                        id="qtyProduct"
                                        value={codeProduct}
                                        onChange={() => handleCodeProductChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                    <label htmlFor="qtyProduct">QTY</label>
                                </FloatLabel>
                            </div>
                            <button
                                className="col-span-2 bg-indigo-500 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded shadow-sm"
                                type="submit"
                            >
                                Add
                            </button>
                        </div>
                        <div className="mt-4">
                            <button
                                className="w-full bg-indigo-500 hover:bg-indigo-700 text-white text-sm font-medium py-2 px-4 rounded shadow-sm"
                                type="submit"
                            >
                                Finish
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};
