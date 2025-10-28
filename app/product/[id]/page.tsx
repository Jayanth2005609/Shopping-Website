"use client"

import { useStore } from "@/lib/store"
import { useParams } from "next/navigation"
import { Star, ShoppingCart, Heart, MessageCircle } from "lucide-react"
import { useState } from "react"
import { ProductCard } from "@/components/product-card"

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  const products = useStore((state) => state.products)
  const addToCart = useStore((state) => state.addToCart)
  const addToWishlist = useStore((state) => state.addToWishlist)
  const removeFromWishlist = useStore((state) => state.removeFromWishlist)
  const wishlist = useStore((state) => state.wishlist)
  const reviews = useStore((state) => state.reviews)
  const addReview = useStore((state) => state.addReview)
  const user = useStore((state) => state.user)

  const product = products.find((p) => p.id === productId)
  const [quantity, setQuantity] = useState(1)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState("")
  const [showReviewForm, setShowReviewForm] = useState(false)

  if (!product) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
        </div>
      </main>
    )
  }

  const isInWishlist = wishlist.includes(product.id)
  const productReviews = reviews.filter((r) => r.productId === productId)
  const recommendedProducts = products.filter((p) => p.category === product.category && p.id !== productId).slice(0, 4)

  const handleAddReview = () => {
    if (!user) {
      alert("Please login to add a review")
      return
    }
    if (comment.trim()) {
      addReview(productId, rating, comment)
      setComment("")
      setRating(5)
      setShowReviewForm(false)
    }
  }

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-muted rounded-lg overflow-hidden h-96">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
          </div>

          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                    }
                  />
                ))}
              </div>
              <span className="text-lg font-semibold">{product.rating}</span>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            <p className="text-muted-foreground mb-6 text-lg">{product.description}</p>

            <div className="bg-card p-6 rounded-lg mb-6">
              <div className="text-4xl font-bold text-primary mb-4">₹{product.price.toLocaleString("en-IN")}</div>
              <div className="text-sm text-muted-foreground mb-4">
                {product.stock > 0 ? (
                  <span className="text-green-600 font-semibold">In Stock ({product.stock} available)</span>
                ) : (
                  <span className="text-destructive font-semibold">Out of Stock</span>
                )}
              </div>

              <div className="flex gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium">Quantity:</label>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                    className="w-20 px-3 py-2 border border-border rounded"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => addToCart(product.id, quantity)}
                  disabled={product.stock === 0}
                  className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button
                  onClick={() => (isInWishlist ? removeFromWishlist(product.id) : addToWishlist(product.id))}
                  className={`px-6 py-3 rounded-lg font-semibold transition ${
                    isInWishlist
                      ? "bg-destructive text-destructive-foreground"
                      : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
                >
                  <Heart size={20} fill={isInWishlist ? "currentColor" : "none"} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6">Customer Reviews</h2>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="mb-6 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition flex items-center gap-2"
          >
            <MessageCircle size={18} />
            Write a Review
          </button>

          {showReviewForm && (
            <div className="bg-card p-6 rounded-lg mb-6">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => setRating(star)} className="transition">
                      <Star
                        size={24}
                        className={star <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Your Review</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your experience with this product..."
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleAddReview}
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Submit Review
                </button>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="bg-muted text-foreground px-6 py-2 rounded-lg font-semibold hover:bg-muted/80 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {productReviews.length > 0 ? (
              productReviews.map((review, idx) => (
                <div key={idx} className="bg-card p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm">{review.comment}</p>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
            )}
          </div>
        </div>

        {/* Recommended Products */}
        {recommendedProducts.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
