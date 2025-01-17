import { Product } from "@/app/models/products";
import { useState } from "react";
import Swal from "sweetalert2";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FiEdit, FiTrash2 } from "react-icons/fi";

interface TableProductProps {
    products: Array<Product>;
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
}

export const TableProducts: React.FC<TableProductProps> = ({ products, onDelete, onEdit }) => {
    const [, setDeleting] = useState<boolean>(false);

    const onDeleteClick = (product: Product) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to reverse this action!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                onDelete(product);
                Swal.fire({
                    title: "Deleted!",
                    text: "Product was deleted.",
                    icon: "success",
                });
                setDeleting(false);
            }
        });
    };

    const actionTemplate = (record: Product) => (
        <div className="flex space-x-2">
            <button
                onClick={() => onEdit(record)}
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

    const priceTemplate = (rowData: Product) => {
        if (rowData) {
            return <span>R$ {rowData.price.toFixed(2).replace(".", ",")}</span>;
        }
        return <span className="text-gray-400">N/A</span>;
    };

    return (
        <DataTable
            value={products}
            paginator
            paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
            currentPageReportTemplate="{first} to {last} of {totalRecords}"
            rows={3}
            totalRecords={products.length}
            className="hover:bg-gray-100 rounded-lg"
            selectionMode="single"
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
                field="sku"
                header="SKU"
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
                field="price"
                header="Price"
                body={priceTemplate}
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
    );
};
