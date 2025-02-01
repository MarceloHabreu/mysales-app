import { CustomerList } from "components";
import { AuthenticatedRoute } from "components";

export default function () {
    return (
        <AuthenticatedRoute>
            <CustomerList />
        </AuthenticatedRoute>
    );
}
