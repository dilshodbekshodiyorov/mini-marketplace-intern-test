import { CartItem } from "../cart-item";

export function CartList({ items, onRemove }) {
    if (items.length === 0) {
        return <p>Savat bo'sh. Mahsulot qo'shing!</p>;
    }

    return (
        <ul className="cart-list">
            {items.map(item => (
                <CartItem 
                    key={item.id} 
                    item={item} 
                    onRemove={onRemove} 
                />
            ))}
        </ul>
    );
}