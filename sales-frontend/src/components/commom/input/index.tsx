import { InputHTMLAttributes, ChangeEventHandler, ChangeEvent } from "react";
import { formatReal } from "app/utils/money";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    label: string;
    columnClasses?: string;
    currency?: boolean;
}

export const Input: React.FC<InputProps> = ({ onChange, label, columnClasses, id, currency, ...inputProps }: InputProps) => {
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        if (value && currency) {
            value = formatReal(value);
        }

        if (onChange) {
            // Crie um novo evento com o valor atualizado
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
        <div className={`field column ${columnClasses}`}>
            <label className="black text-gray-700 text-xl font-bold mb-2" htmlFor={id}>
                {label}
            </label>
            <div className="mb-4">
                <input
                    id={id}
                    {...inputProps}
                    onChange={onInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
        </div>
    );
};
