import { ProductRegistration } from "components";
import { AuthenticatedRoute } from "components";

export default function () {
    return (
        <AuthenticatedRoute>
            <ProductRegistration />
        </AuthenticatedRoute>
    );
}
