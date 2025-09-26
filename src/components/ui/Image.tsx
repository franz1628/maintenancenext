interface ImageProps {
    text: string;
    className?: string;
    value?: string | number;
}

export default function Image({ text, className, value }: ImageProps) {
    const defaultClass = "border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-900 text-white";
    
    return (
        <div className="mb-4 w-full grid grid-cols-6">
            <label htmlFor="" className="col-span-2 mt-2">{text}</label>
            <img src={value?.toString() || ""} alt={text} className={defaultClass + " col-span-4 " + className} onError={(e) => { e.currentTarget.src = "/images/placeholder.png"; }} />
        </div>
    );
}
