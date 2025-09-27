interface BadgeProps {
    color: "primary" | "success" | "warning" | "info" | "danger" | "secondary";
    children?: React.ReactNode;
}

export default function Badge({ color, children }: BadgeProps) {

    let badgeClassName = 'text-white px-2 py-1 rounded text-sm';
    if (color === 'primary') {
        badgeClassName += ' bg-blue-500';
    } else if (color === 'success') {
        badgeClassName += ' bg-green-500';
    } else if (color === 'warning') {
        badgeClassName += ' bg-yellow-500';
    } else if (color === 'info') {
        badgeClassName += ' bg-teal-500';
    } else if (color === 'danger') {
        badgeClassName += ' bg-red-500';
    } else if (color === 'secondary') {
        badgeClassName += ' bg-gray-500';
    }
    return (
        <span className={badgeClassName} >
          {children}
        </span>
    );
}
