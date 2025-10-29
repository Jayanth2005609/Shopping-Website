"use client"

import Link from "next/link"
import { useStore } from "@/lib/store"
import { ShoppingCart, Heart, LogOut, User } from "lucide-react"
import { useState } from "react"
import { logout } from "@/lib/auth"
import { useRouter } from "next/navigation"

export function Navbar() {
  const user = useStore((state) => state.user)
  const cart = useStore((state) => state.cart)
  const wishlist = useStore((state) => state.wishlist)
  const setUser = useStore((state) => state.setUser)
  const [showMenu, setShowMenu] = useState(false)
  const router = useRouter()

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleLogout = () => {
    logout()
    setUser(null)
    setShowMenu(false)
    router.push("/")
  }

  return (
    <nav className="sticky top-0 z-50 bg-green-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          E Commerce
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/" className="hover:opacity-80 transition">
            Home
          </Link>
          {user && (
            <Link href="/orders" className="hover:opacity-80 transition">
              Orders
            </Link>
          )}

          <div className="flex items-center gap-4">
            <Link href="/wishlist" className="relative hover:opacity-80 transition">
              <Heart size={24} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            <Link href="/cart" className="relative hover:opacity-80 transition">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-2 hover:opacity-80 transition"
              >
                <User size={24} />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-card text-card-foreground rounded-lg shadow-lg py-2">
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b border-border">
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-muted flex items-center gap-2"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="block px-4 py-2 hover:bg-muted" onClick={() => setShowMenu(false)}>
                        Login
                      </Link>
                      <Link
                        href="/register"
                        className="block px-4 py-2 hover:bg-muted"
                        onClick={() => setShowMenu(false)}
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
