interface InputProps {
    text: string;
    type?: "text" | "password" | "email" | "number" | "date" | "datetime-local";
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    value?: string | number;
    step?: string;
}

export default function Input({ text, type = "text", className, onChange, value, step }: InputProps) {
    const defaultClass = "border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-900 text-white ";
    
    return (
        <div className="mb-4 w-full grid grid-cols-6">
            <label htmlFor="" className="col-span-2 mt-2">{text}</label>
            <input step={step} type={type} placeholder="Write here..." className={defaultClass + " col-span-4 " + className} onChange={onChange} value={value} />
        </div>
    );
}
