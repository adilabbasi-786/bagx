'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface CartItem {
  productId: string
  name: string
  price: number
  quantity: number
  color?: string
  size?: string
  image: string
}

interface StoreContextType {
  cart: CartItem[]
  wishlist: string[]
  addToCart: (item: CartItem) => void
  removeFromCart: (productId: string) => void
  updateCartQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleWishlist: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  cartTotal: number
  cartCount: number
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('bagx_cart')
    const savedWishlist = localStorage.getItem('bagx_wishlist')
    if (savedCart) setCart(JSON.parse(savedCart))
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist))
    setIsHydrated(true)
  }, [])

  // Save to localStorage whenever cart changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('bagx_cart', JSON.stringify(cart))
    }
  }, [cart, isHydrated])

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem('bagx_wishlist', JSON.stringify(wishlist))
    }
  }, [wishlist, isHydrated])

  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existing = prevCart.find((p) => p.productId === item.productId)
      if (existing) {
        return prevCart.map((p) =>
          p.productId === item.productId ? { ...p, quantity: p.quantity + item.quantity } : p
        )
      }
      return [...prevCart, item]
    })
  }

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((p) => p.productId !== productId))
  }

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
    } else {
      setCart((prevCart) =>
        prevCart.map((p) => (p.productId === productId ? { ...p, quantity } : p))
      )
    }
  }

  const clearCart = () => {
    setCart([])
  }

  const toggleWishlist = (productId: string) => {
    setWishlist((prevWishlist) =>
      prevWishlist.includes(productId)
        ? prevWishlist.filter((id) => id !== productId)
        : [...prevWishlist, productId]
    )
  }

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId)
  }

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0)

  return (
    <StoreContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return context
}
