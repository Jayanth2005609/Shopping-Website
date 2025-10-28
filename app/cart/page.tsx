"use client"

import { useStore } from "@/lib/store"
import { Trash2, Plus, Minus } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function CartPage() {
  const cart = useStore((state) => state.cart)
  const products = useStore((state) => state.products)
  const removeFromCart = useStore((state) => state.removeFromCart)
  const updateCartQuantity = useStore((state) => state.updateCartQuantity)
  const placeOrder = useStore((state) => state.placeOrder) // Use placeOrder instead of clearCart
  const user = useStore((state) => state.user)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const cartItems = cart
    .map((item) => ({
      ...item,
      product: products.find((p) => p.id === item.productId),
    }))
    .filter((item) => item.product)

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  const handleCheckout = () => {
    if (!user) {
      alert("Please login to checkout")
      return
    }
    placeOrder(total)
    setOrderPlaced(true)
    setTimeout(() => {
      setOrderPlaced(false)
    }, 3000)
  }

  if (orderPlaced) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">✓</div>
          <h1 className="text-3xl font-bold mb-2">Order Placed Successfully!</h1>
          <p className="text-muted-foreground mb-6">Thank you for your purchase. Your order has been confirmed.</p>
          <Link
            href="/orders"
            className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition inline-block"
          >
            View Orders
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground mb-6">Your cart is empty</p>
            <Link
              href="/"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.productId} className="bg-card p-6 rounded-lg flex gap-4">
                    <img
                      src={item.product?.image || "/placeholder.svg"}
                      alt={item.product?.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <Link href={`/product/${item.productId}`}>
                        <h3 className="font-semibold hover:text-primary transition">{item.product?.name}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">₹{item.product?.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateCartQuantity(item.productId, Math.max(1, item.quantity - 1))}
                          className="p-1 hover:bg-muted rounded"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}
                          className="p-1 hover:bg-muted rounded"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{((item.product?.price || 0) * item.quantity).toFixed(2)}</p>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-destructive hover:opacity-70 transition mt-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card p-6 rounded-lg h-fit sticky top-20">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4 pb-4 border-b border-border">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax (10%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
              </div>
              <div className="flex justify-between text-lg font-bold mb-6">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition"
              >
                Checkout
              </button>
              <Link href="/" className="block text-center mt-3 text-primary hover:underline">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
