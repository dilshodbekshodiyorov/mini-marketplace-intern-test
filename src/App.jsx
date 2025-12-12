
import { useState, useEffect } from 'react';
import { CartList } from './components/cart-list';

export function App() {
  
    const [cartItems, setCartItems] = useState([]);

   
    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
           
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
          
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

   
    const removeFromCart = (id) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };

    
    useEffect(() => {

        const storedCart = localStorage.getItem('miniMarketCart');
        if (storedCart) {
            try {
                setCartItems(JSON.parse(storedCart));
            } catch (e) {
                console.error("localStorage ma'lumotlarini yuklashda xato:", e);
            }
        }

     
        const handleAddToCartEvent = (event) => {
            addToCart(event.detail);
        };

        document.addEventListener('addToCart', handleAddToCartEvent);
        
     
        return () => {
            document.removeEventListener('addToCart', handleAddToCartEvent);
        };
    }, []);


    useEffect(() => {
        if (cartItems.length > 0 || localStorage.getItem('miniMarketCart') !== JSON.stringify(cartItems)) {
            localStorage.setItem('miniMarketCart', JSON.stringify(cartItems));
        }
    }, [cartItems]);

    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0); 

    return (
        <div className="cart-container">
            <h2>🛍️ Savat</h2>
            
            <CartList items={cartItems} onRemove={removeFromCart} />

            <div className="cart-summary">
                <p>Umumiy Mahsulotlar Soni: <span>{totalItems}</span></p>
                <p>Jami Summa: <span>${totalAmount.toFixed(2)}</span></p>
            </div>
        </div>
    );
}