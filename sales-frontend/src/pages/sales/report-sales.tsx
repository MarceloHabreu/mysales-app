import { ReportSales } from "@/components";
import { AuthenticatedRoute } from "components";

export default function () {
    return (
        <AuthenticatedRoute>
            <ReportSales />
        </AuthenticatedRoute>
    );
}
