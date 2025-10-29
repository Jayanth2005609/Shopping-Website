import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useStore = create(
  persist(
    (set, get) => ({
      user: null,
      cart: [],
      wishlist: [],
      reviews: [],
      orders: [],
      products: [
        {
          id: "1",
          name: "Wireless Headphones Pro",
          price: 16999,
          image: "/wireless-headphones.png",
          category: "Audio",
          rating: 4.8,
          reviews: 324,
          description:
            "Premium wireless headphones with noise cancellation and 30-hour battery life",
          stock: 45,
        },
        {
          id: "2",
          name: "4K Webcam Ultra",
          price: 12999,
          image: "/4k-webcam.png",
          category: "Cameras",
          rating: 4.6,
          reviews: 218,
          description:
            "Crystal clear 4K video streaming with auto-focus and built-in microphone",
          stock: 32,
        },
        {
          id: "3",
          name: "USB-C Hub Pro",
          price: 6499,
          image: "/usb-c-hub.png",
          category: "Accessories",
          rating: 4.7,
          reviews: 456,
          description:
            "7-in-1 USB-C hub with HDMI, USB 3.0, and SD card reader",
          stock: 78,
        },
        {
          id: "4",
          name: "Mechanical Keyboard RGB",
          price: 10999,
          image: "/mechanical-keyboard.png",
          category: "Peripherals",
          rating: 4.9,
          reviews: 567,
          description:
            "Premium mechanical keyboard with customizable RGB lighting and hot-swap switches",
          stock: 56,
        },
        {
          id: "5",
          name: "Portable SSD 1TB",
          price: 8499,
          image: "/portable-ssd.jpg",
          category: "Storage",
          rating: 4.8,
          reviews: 389,
          description:
            "Ultra-fast portable SSD with 1TB storage and USB-C connectivity",
          stock: 64,
        },
        {
          id: "6",
          name: "Wireless Mouse Pro",
          price: 4999,
          image: "/wireless-mouse.png",
          category: "Peripherals",
          rating: 4.5,
          reviews: 234,
          description:
            "Ergonomic wireless mouse with precision tracking and 12-month battery",
          stock: 89,
        },
        {
          id: "7",
          name: "Monitor Stand Adjustable",
          price: 3999,
          image: "/monitor-stand.jpg",
          category: "Accessories",
          rating: 4.4,
          reviews: 145,
          description:
            "Adjustable monitor stand with storage drawer and cable management",
          stock: 42,
        },
        {
          id: "8",
          name: "Laptop Cooling Pad",
          price: 2999,
          image: "/laptop-cooling-pad.jpg",
          category: "Accessories",
          rating: 4.6,
          reviews: 198,
          description:
            "Efficient cooling pad with dual fans and USB power supply",
          stock: 71,
        },
      ],

      // 🔹 User Actions
      setUser: (user) => set({ user }),

      // 🔹 Cart Actions
      addToCart: (productId, quantity) =>
        set((state) => {
          const existing = state.cart.find(
            (item) => item.productId === productId
          );
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                item.productId === productId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { cart: [...state.cart, { productId, quantity }] };
        }),

      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.productId !== productId),
        })),

      updateCartQuantity: (productId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        })),

      clearCart: () => set({ cart: [] }),

      // 🔹 Wishlist Actions
      addToWishlist: (productId) =>
        set((state) => {
          if (state.wishlist.includes(productId)) {
            return state;
          }
          return { wishlist: [...state.wishlist, productId] };
        }),

      removeFromWishlist: (productId) =>
        set((state) => ({
          wishlist: state.wishlist.filter((id) => id !== productId),
        })),

      // 🔹 Review Actions
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
        const state = get();
        return state.reviews.filter((review) => review.productId === productId);
      },

      // 🔹 Orders
      placeOrder: (total) =>
        set((state) => {
          const newOrder = {
            id: `ORD-${Date.now()}`,
            userId: state.user?.id || "anonymous",
            items: state.cart,
            total,
            date: new Date().toISOString(),
            status: "Confirmed",
          };
          return {
            orders: [...state.orders, newOrder],
            cart: [],
          };
        }),

      getOrders: () => {
        const state = get();
        return state.orders.filter((order) => order.userId === state.user?.id);
      },
    }),
    {
      name: "ecommerce-store",
    }
  )
);
