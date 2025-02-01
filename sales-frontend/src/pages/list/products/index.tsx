import { ProductList } from "components";
import { AuthenticatedRoute } from "components";

export default function () {
    return (
        <AuthenticatedRoute>
            <ProductList />
        </AuthenticatedRoute>
    );
}
