import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  rating: number
  reviews: number
  description: string
  stock: number
}

export interface CartItem {
  productId: string
  quantity: number
}

export interface Review {
  productId: string
  userId: string
  rating: number
  comment: string
  date: string
}

export interface User {
  id: string
  email: string
  name: string
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  date: string
  status: string
}

interface StoreState {
  user: User | null
  cart: CartItem[]
  wishlist: string[]
  reviews: Review[]
  products: Product[]
  orders: Order[] // Added orders array

  // User actions
  setUser: (user: User | null) => void

  // Cart actions
  addToCart: (productId: string, quantity: number) => void
  removeFromCart: (productId: string) => void
  updateCartQuantity: (productId: string, quantity: number) => void
  clearCart: () => void

  // Wishlist actions
  addToWishlist: (productId: string) => void
  removeFromWishlist: (productId: string) => void

  // Review actions
  addReview: (productId: string, rating: number, comment: string) => void
  getProductReviews: (productId: string) => Review[]

  placeOrder: (total: number) => void
  getOrders: () => Order[]
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      user: null,
      cart: [],
      wishlist: [],
      reviews: [],
      orders: [], // Initialize orders array
      products: [
        {
          id: "1",
          name: "Wireless Headphones Pro",
          price: 16999, // Converted to INR (₹)
          image: "/wireless-headphones.png",
          category: "Audio",
          rating: 4.8,
          reviews: 324,
          description: "Premium wireless headphones with noise cancellation and 30-hour battery life",
          stock: 45,
        },
        {
          id: "2",
          name: "4K Webcam Ultra",
          price: 12999, // Converted to INR (₹)
          image: "/4k-webcam.png",
          category: "Cameras",
          rating: 4.6,
          reviews: 218,
          description: "Crystal clear 4K video streaming with auto-focus and built-in microphone",
          stock: 32,
        },
        {
          id: "3",
          name: "USB-C Hub Pro",
          price: 6499, // Converted to INR (₹)
          image: "/usb-c-hub.png",
          category: "Accessories",
          rating: 4.7,
          reviews: 456,
          description: "7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader",
          stock: 78,
        },
        {
          id: "4",
          name: "Mechanical Keyboard RGB",
          price: 10999, // Converted to INR (₹)
          image: "/mechanical-keyboard.png",
          category: "Peripherals",
          rating: 4.9,
          reviews: 567,
          description: "Premium mechanical keyboard with customizable RGB lighting and hot-swap switches",
          stock: 56,
        },
        {
          id: "5",
          name: "Portable SSD 1TB",
          price: 8499, // Converted to INR (₹)
          image: "/portable-ssd.jpg",
          category: "Storage",
          rating: 4.8,
          reviews: 389,
          description: "Ultra-fast portable SSD with 1TB storage and USB-C connectivity",
          stock: 64,
        },
        {
          id: "6",
          name: "Wireless Mouse Pro",
          price: 4999, // Converted to INR (₹)
          image: "/wireless-mouse.png",
          category: "Peripherals",
          rating: 4.5,
          reviews: 234,
          description: "Ergonomic wireless mouse with precision tracking and 12-month battery",
          stock: 89,
        },
        {
          id: "7",
          name: "Monitor Stand Adjustable",
          price: 3999, // Converted to INR (₹)
          image: "/monitor-stand.jpg",
          category: "Accessories",
          rating: 4.4,
          reviews: 145,
          description: "Adjustable monitor stand with storage drawer and cable management",
          stock: 42,
        },
        {
          id: "8",
          name: "Laptop Cooling Pad",
          price: 2999, // Converted to INR (₹)
          image: "/laptop-cooling-pad.jpg",
          category: "Accessories",
          rating: 4.6,
          reviews: 198,
          description: "Efficient cooling pad with dual fans and USB power supply",
          stock: 71,
        },
      ],

      setUser: (user) => set({ user }),

      addToCart: (productId, quantity) =>
        set((state) => {
          const existing = state.cart.find((item) => item.productId === productId)
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item,
              ),
            }
          }
          return { cart: [...state.cart, { productId, quantity }] }
        }),

      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.productId !== productId),
        })),

      updateCartQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) => (item.productId === productId ? { ...item, quantity } : item)),
        })),

      clearCart: () => set({ cart: [] }),

      addToWishlist: (productId) =>
        set((state) => {
          if (state.wishlist.includes(productId)) {
            return state
          }
          return { wishlist: [...state.wishlist, productId] }
        }),

      removeFromWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.filter((id) => id !== productId),
        })),

      addReview: (productId, rating, comment) =>
        set((state) => ({
          reviews: [
            ...state.reviews,
            {
              productId,
              userId: state.user?.id || "anonymous",
              rating,
              comment,
              date: new Date().toISOString(),
            },
          ],
        })),

      getProductReviews: (productId) => {
        const state = get()
        return state.reviews.filter((review) => review.productId === productId)
      },

      placeOrder: (total) =>
        set((state) => {
          const newOrder: Order = {
            id: `ORD-${Date.now()}`,
            userId: state.user?.id || "anonymous",
            items: state.cart,
            total,
            date: new Date().toISOString(),
            status: "Confirmed",
          }
          return {
            orders: [...state.orders, newOrder],
            cart: [],
          }
        }),

      getOrders: () => {
        const state = get()
        return state.orders.filter((order) => order.userId === state.user?.id)
      },
    }),
    {
      name: "ecommerce-store",
    },
  ),
)
