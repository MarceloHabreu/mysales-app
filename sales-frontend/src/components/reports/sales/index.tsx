import { Page } from "@/app/models/common/page";
import { Customer } from "@/app/models/customers";
import { useCustomerService, useSaleService } from "@/app/services";
import { InputDate } from "@/components/common";
import { Layout } from "@/components/layout";
import { useUser } from "@/context/UserContext";
import { useFormik } from "formik";
import { AutoComplete, AutoCompleteChangeEvent, AutoCompleteCompleteEvent } from "primereact/autocomplete";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useState } from "react";

interface ReportSaleForm {
    customer: Customer;
    startDate: string;
    endDate: string;
}

export const ReportSales: React.FC = () => {
    const [listCustomers, setListCustomers] = useState<Page<Customer>>({
        content: [],
        first: 0,
        number: 0,
        size: 20,
        totalElements: 0,
    });

    const { userEmail } = useUser();

    const customerService = useCustomerService();
    const salesService = useSaleService();

    const handleSubmit = (dateForm: ReportSaleForm) => {
        salesService
            .generateReportSales(dateForm.customer?.id, dateForm.startDate, dateForm.endDate, userEmail || "")
            .then((blob) => {
                const fileURL = URL.createObjectURL(blob);
                window.open(fileURL);
            });
        console.log(dateForm);
    };

    const formik = useFormik<ReportSaleForm>({
        onSubmit: handleSubmit,
        initialValues: { customer: null, startDate: "", endDate: "" },
    });

    const handleCustomerAutoComplete = (e: AutoCompleteCompleteEvent) => {
        const name = e.query;
        customerService.find(name, "", 0, 20, userEmail || "").then((response) => {
            setListCustomers(response);
        });
    };
    return (
        <Layout title="Report Sales">
            <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-12 justify-between gap-4">
                    <div className="col-span-12">
                        <AutoComplete
                            suggestions={listCustomers.content}
                            completeMethod={handleCustomerAutoComplete}
                            value={formik.values.customer}
                            field="name"
                            id="customer"
                            name="customer"
                            onChange={(e: AutoCompleteChangeEvent) => {
                                formik.setFieldValue("customer", e.value);
                            }}
                            dropdown
                            className="w-full p-autocomplete-custom" // Adiciona uma classe personalizada
                            panelClassName="custom-panel" // Personaliza o dropdown
                        />
                    </div>
                    <div className="md:col-span-6 col-span-12">
                        <InputDate
                            id="startDate"
                            name="startDate"
                            label="StartDate:"
                            value={formik.values.startDate}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="md:col-span-6 col-span-12">
                        <InputDate
                            id="endDate"
                            name="endDate"
                            label="EndDate:"
                            value={formik.values.endDate}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="col-span-12">
                        <Button
                            className="w-full bg-violet-500 hover:bg-violet-700 text-white text-sm font-medium py-3 px-4 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            label="Generate Report"
                            type="submit"
                        />
                    </div>
                </div>
            </form>
        </Layout>
    );
};
