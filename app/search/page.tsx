'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { StoreProvider } from '@/lib/store-context'
import { mockProducts } from '@/lib/mock-data'
import { useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'
import Link from 'next/link'

function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [sortBy, setSortBy] = useState<string>('featured')

  const filteredProducts = mockProducts
    .filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price
        case 'price-high':
          return b.price - a.price
        case 'rating':
          return b.rating - a.rating
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Search Header */}
        <div className="bg-secondary/50 px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-playfair font-bold text-foreground mb-2">Search Results</h1>
            <p className="text-muted-foreground">
              {query ? (
                <>
                  Found <strong>{filteredProducts.length}</strong> result
                  {filteredProducts.length !== 1 ? 's' : ''} for "<strong>{query}</strong>"
                </>
              ) : (
                'Enter a search term to get started'
              )}
            </p>
          </div>
        </div>

        {/* Search Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">
                No products found
              </h2>
              <p className="text-muted-foreground mb-8">
                {query
                  ? `We couldn't find any products matching "${query}". Try a different search term.`
                  : 'Enter a search term to find products.'}
              </p>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/bags"
                  className="inline-block px-8 py-3 bg-accent text-accent-foreground font-medium rounded hover:opacity-90 transition-opacity"
                >
                  Browse Bags
                </Link>
                <Link
                  href="/watches"
                  className="inline-block px-8 py-3 border-2 border-accent text-accent font-medium rounded hover:bg-accent/5 transition-colors"
                >
                  Browse Watches
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Sort Bar */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredProducts.length} product
                  {filteredProducts.length !== 1 ? 's' : ''}
                </p>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none px-4 py-2 bg-background border border-border rounded text-sm text-foreground cursor-pointer pr-10"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-muted-foreground">
                    ▼
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
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
      <Suspense fallback={<div>Loading...</div>}>
        <SearchPage />
      </Suspense>
    </StoreProvider>
  )
}
