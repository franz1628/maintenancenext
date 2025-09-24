interface SelectProps {
    text: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
    value?: string | number;
    children?: React.ReactNode;

}

export default function Select({ text, className, onChange, value, children }: SelectProps) {
    const defaultClass = "border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-900 text-white ";
    
    return (
        <div className="mb-4 w-full grid grid-cols-6">
            <label htmlFor="" className="col-span-2 mt-2">{text}</label>
            <select className={defaultClass + " col-span-4 " + className} onChange={onChange} value={value} >
                {children}
            </select>
        </div>
    );
}
