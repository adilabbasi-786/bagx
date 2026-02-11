'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { StoreProvider, useStore } from '@/lib/store-context'
import Link from 'next/link'
import { Trash2 } from 'lucide-react'
import { useState } from 'react'

function CartPage() {
  const { cart, removeFromCart, updateCartQuantity, cartTotal, clearCart } = useStore()
  const [coupon, setCoupon] = useState('')
  const discount = Math.floor(cartTotal * 0.1) // 10% discount example
  const shipping = cartTotal > 3000 ? 0 : 199
  const total = cartTotal - discount + shipping

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <div className="bg-secondary/50 px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-playfair font-bold text-foreground">Shopping Cart</h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">
                Your cart is empty
              </h2>
              <p className="text-muted-foreground mb-8">
                Start shopping and add items to your cart
              </p>
              <Link
                href="/bags"
                className="inline-block px-8 py-3 bg-accent text-accent-foreground font-medium rounded hover:opacity-90 transition-opacity"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-border">
                    <h2 className="text-xl font-semibold text-foreground">
                      {cart.length} item{cart.length !== 1 ? 's' : ''} in cart
                    </h2>
                  </div>

                  <div className="divide-y divide-border">
                    {cart.map((item) => (
                      <div key={item.productId} className="p-6 flex gap-6">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                            {item.name}
                          </h3>
                          <div className="text-sm text-muted-foreground space-y-1">
                            {item.color && <p>Color: {item.color}</p>}
                            {item.size && <p>Size: {item.size}</p>}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3 mt-4 border border-border rounded-lg w-fit">
                            <button
                              onClick={() =>
                                updateCartQuantity(item.productId, Math.max(1, item.quantity - 1))
                              }
                              className="px-3 py-1 hover:bg-secondary transition-colors"
                            >
                              −
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) =>
                                updateCartQuantity(
                                  item.productId,
                                  Math.max(1, parseInt(e.target.value) || 1)
                                )
                              }
                              className="w-12 text-center border-l border-r border-border py-1 text-foreground"
                            />
                            <button
                              onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                              className="px-3 py-1 hover:bg-secondary transition-colors"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Price & Remove */}
                        <div className="flex flex-col items-end justify-between">
                          <div>
                            <p className="text-lg font-bold text-foreground">
                              PKR {(item.price * item.quantity).toLocaleString()}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              PKR {item.price.toLocaleString()} each
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.productId)}
                            className="text-destructive hover:bg-destructive/10 p-2 rounded transition-colors"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coupon */}
                <div className="mt-6 bg-secondary/30 p-6 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-4">Apply Coupon</h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      className="flex-1 px-4 py-2 border border-border rounded text-foreground bg-background placeholder-muted-foreground"
                    />
                    <button className="px-6 py-2 bg-primary text-primary-foreground rounded font-medium hover:opacity-90 transition-opacity">
                      Apply
                    </button>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-secondary/30 rounded-lg p-6 sticky top-24">
                  <h3 className="text-xl font-semibold text-foreground mb-6">Order Summary</h3>

                  <div className="space-y-3 mb-6 pb-6 border-b border-border">
                    <div className="flex justify-between text-foreground">
                      <span>Subtotal</span>
                      <span>PKR {cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-foreground">
                      <span>Discount (10%)</span>
                      <span className="text-accent">-PKR {discount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-foreground">
                      <span>Shipping</span>
                      <span className={shipping === 0 ? 'text-accent font-semibold' : ''}>
                        {shipping === 0 ? 'FREE' : `PKR ${shipping}`}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-6">
                    <span className="font-semibold text-foreground">Total</span>
                    <span className="text-2xl font-bold text-accent">PKR {total.toLocaleString()}</span>
                  </div>

                  <button className="w-full bg-accent text-accent-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity mb-3">
                    Proceed to Checkout
                  </button>

                  <button
                    onClick={() => clearCart()}
                    className="w-full border-2 border-border text-foreground py-2 rounded-lg font-medium hover:border-accent transition-colors"
                  >
                    Clear Cart
                  </button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Free delivery on orders above PKR 3000/-
                  </p>

                  <Link
                    href="/bags"
                    className="block text-center text-accent font-medium mt-4 hover:underline"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function Page() {
  return (
    <StoreProvider>
      <CartPage />
    </StoreProvider>
  )
}
