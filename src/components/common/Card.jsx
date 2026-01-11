// Reusable Card component

export const Card = ({ children, className = '', hover = false, compact = false }) => {
    const baseClass = compact ? 'card-compact' : 'card';
    const hoverClass = hover ? 'hover:shadow-med cursor-pointer' : '';

    return (
        <div className={`${baseClass} ${hoverClass} ${className}`}>
            {children}
        </div>
    );
};

export default Card;
