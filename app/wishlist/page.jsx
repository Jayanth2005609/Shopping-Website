"use client"

import { useStore } from "../lib/store"
import { ProductCard } from "@/components/product-card"
import Link from "next/link"

export default function WishlistPage() {
  const wishlist = useStore((state) => state.wishlist)
  const products = useStore((state) => state.products)

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id))

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">My Wishlist</h1>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground mb-6">Your wishlist is empty</p>
            <Link
              href="/"
              className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition inline-block"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
