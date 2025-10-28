"use client"

import { useStore } from "@/lib/store"
import { ProductCard } from "@/components/product-card"
import { Zap, TrendingUp, Award } from "lucide-react"

export default function Home() {
  const products = useStore((state) => state.products)

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-5xl font-bold mb-4">Welcome to E commerce Store</h1>
              <p className="text-xl opacity-90 mb-6">
                Discover premium electronics and accessories for your tech lifestyle
              </p>
              <div className="flex gap-4">
                <button className="bg-primary-foreground text-primary px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition">
                  Shop Now
                </button>
                <button className="border-2 border-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary-foreground/10 transition">
                  Learn More
                </button>
              </div>
            </div>
            <div className="hidden lg:block text-6xl opacity-20">
              <Zap />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-card py-12 border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <TrendingUp className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-semibold">Best Prices</h3>
                <p className="text-sm text-muted-foreground">Competitive pricing on all products</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Award className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-semibold">Quality Guaranteed</h3>
                <p className="text-sm text-muted-foreground">Premium products from trusted brands</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-primary/10 p-3 rounded-lg">
                <Zap className="text-primary" size={24} />
              </div>
              <div>
                <h3 className="font-semibold">Fast Shipping</h3>
                <p className="text-sm text-muted-foreground">Quick delivery to your doorstep</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-2">Featured Products</h2>
            <p className="text-muted-foreground">Explore our collection of premium electronics</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-6 opacity-90">Get exclusive deals and product updates</p>
          <div className="flex gap-2 max-w-md mx-auto">
            <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-3 rounded text-foreground" />
            <button className="bg-primary-foreground text-primary px-6 py-3 rounded font-semibold hover:opacity-90 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}
