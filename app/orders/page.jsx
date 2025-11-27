"use client"

import { useStore } from "../../lib/store"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function OrdersPage() {
  const user = useStore((state) => state.user)
  const getOrders = useStore((state) => state.getOrders) 
  const products = useStore((state) => state.products)
  const router = useRouter()
  const orders = getOrders() 

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="bg-card p-8 rounded-lg text-center">
            <p className="text-lg text-muted-foreground mb-4">You haven't placed any orders yet.</p>
            <p className="text-muted-foreground mb-6">Start shopping and your orders will appear here.</p>
            <Link
              href="/"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition inline-block"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-card p-6 rounded-lg">
                <div className="flex justify-between items-start mb-4 pb-4 border-b border-border">
                  <div>
                    <p className="text-sm text-muted-foreground">Order ID</p>
                    <p className="font-semibold text-lg">{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="font-semibold text-green-600">{order.status}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-3">Order Date</p>
                  <p className="font-semibold">{new Date(order.date).toLocaleDateString()}</p>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-3">Items</p>
                  <div className="space-y-2">
                    {order.items.map((item) => {
                      const product = products.find((p) => p.id === item.productId)
                      return (
                        <div key={item.productId} className="flex justify-between text-sm">
                          <span>{product?.name}</span>
                          <span>
                            {item.quantity} x ₹{product?.price} = ₹{((product?.price || 0) * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total Amount</span>
                    <span className="text-2xl font-bold text-primary">₹{order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Your Account</h2>
          <div className="bg-card p-6 rounded-lg">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-semibold">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-semibold">{user.name}</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
