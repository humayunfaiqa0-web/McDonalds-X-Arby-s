// Interactive Shopping Cart System
import { playSizzle } from './audio';

export interface CartItem {
  id: string;
  name: string;
  arbyName: string;
  price: number;
  calories: number;
  image: string;
  quantity: number;
  customization?: string[];
}

let cartItems: CartItem[] = [];

// Initialize cart from localStorage if present
if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem('mc_cart_items');
    if (saved) {
      cartItems = JSON.parse(saved);
    }
  } catch (err) {
    console.error("Failed to load cart items", err);
  }
}

function saveCart() {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('mc_cart_items', JSON.stringify(cartItems));
    } catch (err) {
      console.error("Failed to save cart items", err);
    }
    // Dispatch custom event to notify all listeners
    window.dispatchEvent(new CustomEvent('cart-updated'));
  }
}

export function getCartItems(): CartItem[] {
  return cartItems;
}

export function addToCart(item: {
  id: string;
  name: string;
  arbyName: string;
  price: number;
  calories: number;
  image: string;
  customization?: string[];
}) {
  playSizzle();
  
  // Create a unique key for items with custom customizations
  const customStr = (item.customization || []).sort().join(',');
  const existingIndex = cartItems.findIndex(i => 
    i.id === item.id && 
    (i.customization || []).sort().join(',') === customStr
  );

  if (existingIndex > -1) {
    cartItems[existingIndex].quantity += 1;
  } else {
    cartItems.push({
      ...item,
      quantity: 1,
      customization: item.customization || []
    });
  }
  
  saveCart();
}

export function updateQuantity(id: string, customStr: string, delta: number) {
  const index = cartItems.findIndex(i => 
    i.id === id && 
    (i.customization || []).sort().join(',') === customStr
  );

  if (index > -1) {
    cartItems[index].quantity += delta;
    if (cartItems[index].quantity <= 0) {
      cartItems.splice(index, 1);
    }
    playSizzle();
    saveCart();
  }
}

export function removeFromCart(id: string, customStr: string) {
  const index = cartItems.findIndex(i => 
    i.id === id && 
    (i.customization || []).sort().join(',') === customStr
  );

  if (index > -1) {
    cartItems.splice(index, 1);
    playSizzle();
    saveCart();
  }
}

export function clearCart() {
  cartItems = [];
  saveCart();
}

export function getCartTotal() {
  return cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
}

export function getCartCalories() {
  return cartItems.reduce((acc, item) => acc + (item.calories * item.quantity), 0);
}

export function getCartCount() {
  return cartItems.reduce((acc, item) => acc + item.quantity, 0);
}
