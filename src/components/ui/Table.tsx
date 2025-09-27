interface TableProps {
    className?: string;
    children?: React.ReactNode;
}

export default function Table({ className, children }: TableProps) {

    let tableClassName = 'min-w-full divide-y divide-gray-200';

    return (
        <table className={`${tableClassName}${className ? ' ' + className : ''}`}>
            {children}
        </table>
    );
}
