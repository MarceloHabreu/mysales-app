import { InputHTMLAttributes, ChangeEventHandler, ChangeEvent } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    label: string;
    columnClasses?: string;
}

export const Input: React.FC<InputProps> = ({ onChange, label, columnClasses, id, ...inputProps }: InputProps) => {
    return (
        <div className={`field column ${columnClasses}`}>
            <label className="black text-gray-700 text-xl font-bold mb-2" htmlFor={id}>
                {label}
            </label>
            <div className="mb-4">
                <input
                    id={id}
                    {...inputProps}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        if (onChange) {
                            onChange(e);
                        }
                    }}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
        </div>
    );
};
