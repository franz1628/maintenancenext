import { useState } from "react";

interface ImageProps {
    text: string;
    className?: string;
    value?: string | number;
    modal?: boolean;
}

export default function Image({ text, className, value, modal=false }: ImageProps) {
    const defaultClass = "border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-900 text-white";
    const [showModal, setShowModal] = useState(false);

    return (
        <div>
            <div className="mb-4 w-full grid grid-cols-6">
                <label htmlFor="" className="col-span-2 mt-2">{text}</label>
                <img src={value?.toString() || ""} alt={text} className={defaultClass + " col-span-4 " + className} onError={(e) => { e.currentTarget.src = "/images/placeholder.png"; }} onClick={() => setShowModal(modal)} />
            </div>
            {showModal && 
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
                    <div className="bg-white p-4 rounded">
                        <img src={value?.toString() || ""} alt={text} className="w-full h-auto" onError={(e) => { e.currentTarget.src = "/images/placeholder.png"; }} />
                    </div>
                </div>
            }
        </div>

        
    );
}
