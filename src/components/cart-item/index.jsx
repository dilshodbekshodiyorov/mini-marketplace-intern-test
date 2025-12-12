export function CartItem({ item, onRemove }) {
    return (
        <li className="cart-item">
            <div className="cart-item-info">
                <strong>{item.title}</strong>
                <p>{item.quantity} x ${item.price.toFixed(2)}</p>
            </div>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
            { }
            <button 
                className="remove-btn" 
                onClick={() => onRemove(item.id)}>
                O'chirish
            </button>
        </li>
    );
}