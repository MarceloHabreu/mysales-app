import { Product } from "@/app/models/products";

interface TableProductProps {
    products: Array<Product>;
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
}

export const TableProducts: React.FC<TableProductProps> = ({ products, onDelete, onEdit }) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-md text-center text-gray-800">
                <thead className="text-md  uppercase bg-gray-900 text-zinc-100 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            SKU
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <ProductRow key={product.id} product={product} onEdit={onEdit} onDelete={onDelete} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

interface ProductRowProps {
    product: Product;
    onEdit: (product: Product) => void;
    onDelete: (product: Product) => void;
}

const ProductRow: React.FC<ProductRowProps> = ({ product, onEdit, onDelete }) => {
    return (
        <tr key={product.id} className="bg-white hover:bg-zinc-200 border-b border-gray-300">
            <td className="px-6 py-4">{product.id}</td>
            <td className="px-6 py-4">{product.sku}</td>
            <td className="px-6 py-4">{product.name}</td>
            <td className="px-6 py-4">{product.price}</td>
            <td className="px-6 py-4 flex space-x-2 justify-center items-center">
                <button
                    onClick={(e) => onEdit(product)}
                    className="text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-4 py-2"
                >
                    Edit
                </button>
                <button
                    onClick={(e) => onDelete(product)}
                    className="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-4 py-2"
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};
