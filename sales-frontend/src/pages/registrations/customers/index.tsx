import { CustomerRegistration } from "@/components/customers";
import { AuthenticatedRoute } from "components";

export default function () {
    return (
        <AuthenticatedRoute>
            <CustomerRegistration />
        </AuthenticatedRoute>
    );
}
