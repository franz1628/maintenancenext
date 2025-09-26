import { CloudArrowDownIcon, EyeIcon, MagnifyingGlassCircleIcon, PencilSquareIcon, PlusCircleIcon, TrashIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/16/solid";

interface ButtonProps {
    text: string;
    color: "primary" | "success" | "warning" | "info" | "danger" | "secondary";
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    onSubmit?: () => void;
    className?: string;
    disabled?: boolean;
    icon?: "edit" | "delete" | "view" | "add" | "save" | "search" | "clear";
}

export default function Button({ text, color, type = "button", onClick, onSubmit, className, disabled, icon }: ButtonProps) {

    let buttonClassName = 'text-white px-4 py-2 rounded hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer';

    if (disabled) {
        buttonClassName += ' bg-gray-400 cursor-not-allowed';
    }

    if (color === 'primary') {
        buttonClassName += ' bg-blue-500 hover:bg-blue-600';
    } else if (color === 'success') {
        buttonClassName += ' bg-green-500 hover:bg-green-600';
    } else if (color === 'warning') {
        buttonClassName += ' bg-yellow-500 hover:bg-yellow-600';
    } else if (color === 'info') {
        buttonClassName += ' bg-teal-500 hover:bg-teal-600';
    } else if (color === 'danger') {
        buttonClassName += ' bg-red-500 hover:bg-red-600';
    } else if (color === 'secondary') {
        buttonClassName += ' bg-gray-500 hover:bg-gray-600';
    }

    //heroicons
    if(icon){
        buttonClassName += ' flex items-center justify-center';
    }


    return (
        <button className={buttonClassName + ' ' + className} onClick={onClick} type={type} onSubmit={onSubmit} disabled={disabled}>
            {icon === 'edit' && <PencilSquareIcon className="w-4 h-4 mr-2" />}
            {icon === 'delete' && <TrashIcon className="w-4 h-4 mr-2" />}
            {icon === 'view' && <EyeIcon className="w-4 h-4 mr-2" />}
            {icon === 'save' && <CloudArrowDownIcon className="w-4 h-4 mr-2" />}
            {icon === 'add' && <PlusCircleIcon className="w-4 h-4 mr-2" />}
            {icon === 'search' && <MagnifyingGlassCircleIcon className="w-4 h-4 mr-2" />}
            {icon === 'clear' && <XMarkIcon className="w-4 h-4 mr-2" />}
            {text}
        </button>
    );
}
