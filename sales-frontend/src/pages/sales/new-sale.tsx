import { Sales } from "components";
import { AuthenticatedRoute } from "components";

export default function () {
    return (
        <AuthenticatedRoute>
            <Sales />
        </AuthenticatedRoute>
    );
}
