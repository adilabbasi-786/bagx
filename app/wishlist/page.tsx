'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { StoreProvider, useStore } from '@/lib/store-context'
import { ProductCard } from '@/components/product-card'
import { mockProducts } from '@/lib/mock-data'
import Link from 'next/link'

function WishlistPage() {
  const { wishlist } = useStore()

  const wishlistProducts = mockProducts.filter((p) => wishlist.includes(p.id))

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <div className="bg-secondary/50 px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-playfair font-bold text-foreground">My Wishlist</h1>
            <p className="text-muted-foreground mt-2">
              {wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''} saved
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {wishlistProducts.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">
                Your wishlist is empty
              </h2>
              <p className="text-muted-foreground mb-8">
                Save your favorite items to your wishlist
              </p>
              <Link
                href="/bags"
                className="inline-block px-8 py-3 bg-accent text-accent-foreground font-medium rounded hover:opacity-90 transition-opacity"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {wishlistProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <div className="mt-12 text-center">
                <p className="text-muted-foreground mb-6">
                  Ready to checkout? View your cart or continue shopping.
                </p>
                <div className="flex gap-4 justify-center">
                  <Link
                    href="/cart"
                    className="px-8 py-3 bg-accent text-accent-foreground font-medium rounded hover:opacity-90 transition-opacity"
                  >
                    Go to Cart
                  </Link>
                  <Link
                    href="/bags"
                    className="px-8 py-3 border-2 border-accent text-accent font-medium rounded hover:bg-accent/5 transition-colors"
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
      <WishlistPage />
    </StoreProvider>
  )
}
