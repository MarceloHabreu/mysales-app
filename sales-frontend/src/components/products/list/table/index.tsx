import { Product } from "@/app/models/products";
import { useRouter } from "next/router";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useState } from "react";
import Swal from "sweetalert2";

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
            text: "You won't be possible to reverse this action!!",
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

    const actionTemplate = (record: Product) => {
        const url = `/registrations/products?id=${record.id}`;
        return (
            <div className="flex space-x-2">
                <button
                    onClick={() => onEdit(record)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDeleteClick(record)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full"
                >
                    Delete
                </button>
            </div>
        );
    };

    const priceTemplate = (rowData: Product) => {
        if (rowData != null) {
            return `R$ ${rowData.price.toFixed(2).replace(".", ",")}`;
        } else {
            return "N/A";
        }
    };

    return (
        <DataTable value={products} paginator rows={3} className="hover:bg-zinc-200 rounded-lg" selectionMode="single">
            <Column field="id" header="Code" />
            <Column field="sku" header="SKU" />
            <Column field="name" header="Name" />
            <Column field="price" header="Price" body={priceTemplate} />
            <Column body={actionTemplate} />
        </DataTable>
    );
};
