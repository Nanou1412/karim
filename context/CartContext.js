import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart')
      if (raw) setItems(JSON.parse(raw))
    } catch (e) {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(items))
    } catch (e) {}
  }, [items])

  const addItem = (item) => {
    setItems((prev) => {
      const exists = prev.find((p) => p.id === item.id)
      if (exists) return prev.map((p) => p.id === item.id ? { ...p, qty: p.qty + (item.qty || 1) } : p)
      return [...prev, { ...item, qty: item.qty || 1 }]
    })
  }

  const updateQty = (id, qty) => setItems((prev) => prev.map((p) => p.id === id ? { ...p, qty } : p).filter(p => p.qty > 0))
  const removeItem = (id) => setItems((prev) => prev.filter((p) => p.id !== id))
  const clear = () => setItems([])

  return <CartContext.Provider value={{ items, addItem, updateQty, removeItem, clear }}>{children}</CartContext.Provider>
}

export function useCart() { return useContext(CartContext) }
