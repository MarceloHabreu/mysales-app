import { Customer } from "@/app/models/customers";
import { Input, InputCPF } from "@/components/common";
import { Layout } from "@/components/layout";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Page } from "@/app/models/common/page";
import { useCustomerService } from "@/app/services";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useUser } from "@/context/UserContext";

interface ConsultCustomersForm {
    name?: string;
    cpf?: string;
}

export const CustomerList: React.FC = () => {
    const service = useCustomerService();
    const [, setLoading] = useState<boolean>(false);

    const router = useRouter();

    const { userEmail } = useUser();

    useEffect(() => {
        handleSubmit(filter);
    }, []);

    const [customers, setCustomers] = useState<Page<Customer>>({
        content: [],
        first: 0,
        number: 0,
        size: 3,
        totalElements: 0,
    });

    const handleSubmit = (filter: ConsultCustomersForm) => {
        handlePage({
            first: 0,
            rows: 3,
            page: 0,
            pageCount: Math.ceil(customers.totalElements / customers.size),
        });
    };

    const {
        handleSubmit: formikSubmit,
        values: filter,
        handleChange,
    } = useFormik<ConsultCustomersForm>({
        onSubmit: handleSubmit,

        initialValues: {
            name: "",
            cpf: "",
        },
    });

    const handlePage = (event: any) => {
        setLoading(true);
        const page = event.first / event.rows;
        service
            .find(filter.name, filter.cpf, page, event?.rows, userEmail || "")
            .then((result) => {
                setCustomers({ ...result, first: event.first });
            })
            .finally(() => setLoading(false));
    };

    const [, setDeleting] = useState<boolean>(false);
    const onDelete = (customer: Customer) => {
        service
            .remove(customer.id || "", userEmail || "")
            .then(() => handleSubmit(filter))
            .finally(() => setDeleting(false));
    };

    const onDeleteClick = (customer: Customer) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be possible to reverse this action!!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                onDelete(customer);
                Swal.fire({
                    title: "Deleted!",
                    text: "Customer was deleted.",
                    icon: "success",
                });
                setDeleting(false);
            }
        });
    };

    const actionTemplate = (record: Customer) => {
        const url = `/registrations/customers?id=${record.id}`;
        return (
            <div className="flex space-x-2">
                <button
                    onClick={(e) => router.push(url)}
                    className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium py-1 px-3 rounded"
                >
                    <FiEdit className="inline mr-1 text-base" /> Edit
                </button>
                <button
                    onClick={() => onDeleteClick(record)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-1 px-3 rounded"
                >
                    <FiTrash2 className="inline mr-1 text-base" /> Delete
                </button>
            </div>
        );
    };

    return (
        <Layout title="Customers">
            <form onSubmit={formikSubmit} className="mb-6">
                <div className="grid md:grid-cols-2 gap-6 text-zinc-400">
                    <Input
                        label="Name:"
                        id="name"
                        name="name"
                        onChange={handleChange}
                        value={filter.name}
                        placeholder="Enter customer name"
                    />
                    <InputCPF
                        label="CPF:"
                        id="cpf"
                        name="cpf"
                        onChange={handleChange}
                        value={filter.cpf}
                        placeholder="xxx.xxx.xxx-xx"
                    />
                </div>
                <div className="flex gap-3 mt-4 mb-2">
                    <button
                        type="submit"
                        className="md:col-span-1 bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        <PersonSearchIcon className="mr-1" />
                        Search
                    </button>

                    <button
                        onClick={() => router.push("/registrations/customers")}
                        className="bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        <PersonAddAlt1Icon className="mr-2" />
                        New
                    </button>
                </div>
            </form>

            <div className="shadow-sm">
                <DataTable
                    className="hover:bg-gray-100 rounded-lg"
                    selectionMode="single"
                    value={customers.content}
                    totalRecords={customers.totalElements}
                    lazy={true}
                    paginator={true}
                    first={customers.first}
                    rows={customers.size}
                    onPage={handlePage}
                    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                    rowClassName={() => "border-b border-gray-200"}
                >
                    <Column
                        field="id"
                        header="Code"
                        headerStyle={{
                            backgroundColor: "#27272a",
                            color: "white",
                        }}
                    />
                    <Column
                        field="name"
                        header="Name"
                        headerStyle={{
                            backgroundColor: "#27272a",
                            color: "white",
                        }}
                    />
                    <Column
                        field="cpf"
                        header="CPF"
                        headerStyle={{
                            backgroundColor: "#27272a",
                            color: "white",
                        }}
                    />
                    <Column
                        field="email"
                        header="Email"
                        headerStyle={{
                            backgroundColor: "#27272a",
                            color: "white",
                        }}
                    />
                    <Column
                        body={actionTemplate}
                        headerStyle={{
                            backgroundColor: "#27272a",
                            color: "white",
                        }}
                    />
                </DataTable>
            </div>
        </Layout>
    );
};
