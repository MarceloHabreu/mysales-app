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
            <label className="label" htmlFor={id}>
                {label}
            </label>
            <div className="control">
                <input
                    id={id}
                    {...inputProps}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        if (onChange) {
                            onChange(e);
                        }
                    }}
                    className="input"
                />
            </div>
        </div>
    );
};
