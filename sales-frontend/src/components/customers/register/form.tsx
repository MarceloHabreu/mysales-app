import { Customer } from "@/app/models/customers";
import { Input, InputCPF, InputDate, InputPhone } from "@/components/commom";
import { useFormik } from "formik";
import * as Yup from "yup";

interface CustomerFormProps {
    customer: Customer;
    onSubmit: (customer: Customer) => void;
}

const formSchema: Customer = {
    id: "",
    registrationDate: "",
    name: "",
    cpf: "",
    birthDate: "",
    email: "",
    address: "",
    phone: "",
};
const validationScheme = Yup.object().shape({
    cpf: Yup.string().trim().required().length(14, "Invalid CPF"),
    name: Yup.string().trim().required().min(4),
    birthDate: Yup.string()
        .trim()
        .required()
        .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, "Invalid Date")
        .length(10, "Invalid BirthDate"),
    email: Yup.string().trim().required().email("Invalid Email"),
    address: Yup.string().trim().required(),
    phone: Yup.string().trim().required().length(15, "Invalid Phone"),
});

export const CustomerForm: React.FC<CustomerFormProps> = ({ customer, onSubmit }) => {
    const formik = useFormik<Customer>({
        initialValues: { ...formSchema, ...customer },
        onSubmit,
        enableReinitialize: true,
        validationSchema: validationScheme,
    });

    return (
        <form onSubmit={formik.handleSubmit} className="h-full mt-4 flex flex-col gap-4">
            {formik.values.id && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-zinc-400">
                    <Input
                        className="bg-gray-200 text-gray-500 border-none cursor-not-allowed opacity-70"
                        id="id"
                        name="id"
                        label="Id:"
                        value={formik.values.id}
                        disabled
                        icon={<span>🔒</span>}
                    />

                    <Input
                        className="bg-gray-200 text-gray-500 border-none cursor-not-allowed opacity-70"
                        id="registration"
                        name="registration"
                        label="Registration:"
                        value={formik.values.registrationDate}
                        disabled
                        icon={<span>🔒</span>}
                    />
                </div>
            )}
            <div className="text-zinc-400">
                <Input
                    id="name"
                    name="name"
                    label="Name: *"
                    placeholder="full name"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    error={formik.errors.name}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-zinc-400">
                <InputCPF
                    id="cpf"
                    name="cpf"
                    label="CPF: *"
                    placeholder="xxx.xxx.xxx-xx"
                    onChange={formik.handleChange}
                    value={formik.values.cpf}
                    error={formik.errors.cpf}
                />
                <InputDate
                    id="birthDate"
                    name="birthDate"
                    label="birthDate: *"
                    placeholder="dd/mm/yyyy"
                    onChange={formik.handleChange}
                    value={formik.values.birthDate}
                    error={formik.errors.birthDate}
                />
            </div>
            <div className="text-zinc-400">
                <Input
                    id="address"
                    name="address"
                    label="Address: *"
                    placeholder="full address"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                    error={formik.errors.address}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-zinc-400">
                <Input
                    id="email"
                    name="email"
                    label="Email: *"
                    placeholder="example@gmail.com"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={formik.errors.email}
                />
                <InputPhone
                    id="phone"
                    name="phone"
                    label="phone: *"
                    placeholder="(xx) xxxxx-xxxx"
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    error={formik.errors.phone}
                />
            </div>
            <button
                type="submit"
                className={`${
                    formik.values.id ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            >
                {formik.values.id ? "Update" : "Save"}
            </button>
        </form>
    );
};
