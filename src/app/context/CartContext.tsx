"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { products as initialProducts, type Product } from "../data/products";

export type CartItem = Product & {
  quantity: number;
};

type CartContextType = {
  products: Product[];
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (name: string) => void;
  increaseQuantity: (name: string) => void;
  decreaseQuantity: (name: string) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  deductStock: (orderedItems: CartItem[]) => void;
  updateProductStock: (name: string, newStock: number) => void;
  addNewProduct: (product: Product) => void;
  subtotal: number;
  deliveryCharge: number;
  grandTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initial load from MongoDB Atlas API with localStorage fallback
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setProducts(json.data);
          localStorage.setItem("inventory_products", JSON.stringify(json.data));
          return;
        }
      } catch (err) {
        console.warn("Could not load products from database API, using local fallback:", err);
      }

      try {
        const savedProducts = localStorage.getItem("inventory_products");
        if (savedProducts) {
          setProducts(JSON.parse(savedProducts));
        } else {
          localStorage.setItem("inventory_products", JSON.stringify(initialProducts));
        }
      } catch (e) {
        console.error("Failed to load state from localStorage:", e);
      }
    };

    loadProducts();

    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }

      const savedWishlist = localStorage.getItem("wishlist");
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (e) {
      console.error("Failed to load cart/wishlist:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save Cart
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isLoaded]);

  // Save Wishlist
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, isLoaded]);

  // Helper function to save products list
  const saveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    try {
      localStorage.setItem("inventory_products", JSON.stringify(updatedProducts));
    } catch (e) {
      console.error("Failed to save inventory to localStorage:", e);
    }
  };

  const addToCart = (product: Product) => {
    const currentProd = products.find((p) => p.name === product.name);
    const availableStock = currentProd ? currentProd.stock : product.stock;

    if (availableStock <= 0) {
      alert("This medicine is currently out of stock!");
      return;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === product.name);

      if (existingItem) {
        if (existingItem.quantity >= availableStock) {
          alert(`Only ${availableStock} items available in stock.`);
          return prevCart;
        }
        return prevCart.map((item) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1, stock: availableStock }];
    });
  };

  const removeFromCart = (name: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.name !== name));
  };

  const increaseQuantity = (name: string) => {
    const currentProd = products.find((p) => p.name === name);
    const availableStock = currentProd ? currentProd.stock : 0;

    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.name === name) {
          if (item.quantity >= availableStock) {
            alert(`Cannot add more than available stock (${availableStock}).`);
            return item;
          }
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  const decreaseQuantity = (name: string) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.name === name ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some((item) => item.name === product.name);
      if (exists) {
        return prevWishlist.filter((item) => item.name !== product.name);
      }
      return [...prevWishlist, product];
    });
  };

  const deductStock = (orderedItems: CartItem[]) => {
    const updatedProducts = products.map((prod) => {
      const matchedOrder = orderedItems.find((item) => item.name === prod.name);
      if (matchedOrder) {
        const remaining = Math.max(0, prod.stock - matchedOrder.quantity);
        return { ...prod, stock: remaining };
      }
      return prod;
    });

    saveProducts(updatedProducts);
  };

  const updateProductStock = async (name: string, newStock: number) => {
    const finalStock = Math.max(0, newStock);
    const updatedProducts = products.map((prod) =>
      prod.name === name ? { ...prod, stock: finalStock } : prod
    );
    saveProducts(updatedProducts);

    try {
      await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, stock: finalStock }),
      });
    } catch (err) {
      console.warn("Could not sync stock to database:", err);
    }
  };

  const addNewProduct = async (newProd: Product) => {
    const exists = products.some(
      (p) => p.name.toLowerCase() === newProd.name.toLowerCase()
    );
    if (exists) {
      alert("A medicine with this name already exists in the inventory!");
      return;
    }

    const updated = [newProd, ...products];
    saveProducts(updated);

    try {
      await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProd),
      });
    } catch (err) {
      console.warn("Could not sync new product to database:", err);
    }

    alert(`"${newProd.name}" added to inventory successfully!`);
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const deliveryCharge = cart.length > 0 ? 60 : 0;
  const grandTotal = subtotal + deliveryCharge;

  return (
    <CartContext.Provider
      value={{
        products,
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        toggleWishlist,
        deductStock,
        updateProductStock,
        addNewProduct,
        subtotal,
        deliveryCharge,
        grandTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}