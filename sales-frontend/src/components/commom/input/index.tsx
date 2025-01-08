import { InputHTMLAttributes, ChangeEventHandler, ChangeEvent } from "react";
import { formatReal } from "app/utils/money";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    label: string;
    icon?: React.ReactNode;
    columnClasses?: string;
    currency?: boolean;
    error?: string;
}

export const Input: React.FC<InputProps> = ({
    onChange,
    label,
    columnClasses,
    id,
    icon,
    currency,
    error,
    className,
    ...inputProps
}: InputProps) => {
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        if (value && currency) {
            value = formatReal(value);
        }

        if (onChange) {
            const event = {
                ...e,
                target: {
                    ...e.target,
                    value,
                },
            };
            onChange(event as ChangeEvent<HTMLInputElement>);
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
