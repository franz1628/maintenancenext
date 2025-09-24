interface ButtonProps {
    text: string;
    color: "primary" | "success" | "warning" | "info" | "danger" | "secondary";
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    onSubmit?: () => void;
    className?: string;
    disabled?: boolean;
}

export default function Button({ text, color, type = "button", onClick, onSubmit, className, disabled }: ButtonProps) {

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
    return (
        <button className={buttonClassName + ' ' + className} onClick={onClick} type={type} onSubmit={onSubmit} disabled={disabled}>
            {text}
        </button>
    );
}
