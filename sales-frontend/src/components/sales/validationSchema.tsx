import * as Yup from "yup";

export const validationScheme = Yup.object().shape({
    customer: Yup.object().nullable().required(),
    items: Yup.array().min(1, "Add at least one item"),
    paymentMethod: Yup.string().trim().required("Field Required"),
});
