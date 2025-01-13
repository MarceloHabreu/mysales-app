import { InputHTMLAttributes, ChangeEvent } from "react";
import { formatReal } from "@/app/utils/money";
/* import { FormatUtils } from "@4us-dev/utils";

const formatUtils = new FormatUtils(); */

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    label: string;
    icon?: React.ReactNode;
    columnClasses?: string;
    error?: string;
    formatter?: (value: string) => string;
}

export const Input: React.FC<InputProps> = ({
    onChange,
    label,
    id,
    icon,
    error,
    className,
    formatter,
    ...inputProps
}: InputProps) => {
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const name = e.target.name;

        // Aplica a formatação, se existir
        const formattedValue = formatter ? formatter(value) : value;

        // Propaga o evento com o valor formatado
        if (onChange) {
            onChange({
                ...e,
                target: {
                    ...e.target,
                    name,
                    value: formattedValue,
                },
            });
        }
    };

    return (
        <div className="relative">
            <label htmlFor={id} className="block text-gray-700 text-md font-bold mb-2">
                {label}
            </label>
            <div className="relative mb-4">
                <input
                    id={id}
                    name={id}
                    {...inputProps}
                    onChange={onInputChange}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                        error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                    } ${className}`}
                />
                {icon && <div className="absolute inset-y-0 right-3 flex items-center text-gray-400">{icon}</div>}
            </div>
            {error && (
                <p role="alert" aria-live="assertive" className="text-red-500 text-sm mt-1">
                    {error}
                </p>
            )}
        </div>
    );
};
export const InputMoney: React.FC<InputProps> = (props: InputProps) => {
    return <Input {...props} formatter={formatReal} />;
};

export const InputCPF: React.FC<InputProps> = (props: InputProps) => {
    const formatCPF = (cpf: string) => cpf.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    return <Input {...props} maxLength={14} formatter={formatCPF} />;
};

export const InputPhone: React.FC<InputProps> = (props: InputProps) => {
    const formatPhone = (phone: string) => {
        phone = phone.replace(/\D/g, ""); // Remove tudo que não for número
        if (phone.length <= 10) {
            return phone.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
        }
        return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    };
    return <Input {...props} maxLength={15} formatter={formatPhone} />;
};

export const InputDate: React.FC<InputProps> = (props: InputProps) => {
    const formatDate = (value: string) => {
        value = value.replace(/\D/g, ""); // Remove tudo que não for número
        if (value.length <= 2) {
            return value;
        }
        if (value.length <= 4) {
            return value.replace(/(\d{2})(\d{2})/, "$1/$2");
        }
        return value.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
    };

    return <Input {...props} maxLength={10} formatter={formatDate} />;
};
