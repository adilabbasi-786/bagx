'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { StoreProvider } from '@/lib/store-context'
import { mockProducts } from '@/lib/mock-data'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

function BagsPage() {
  const products = mockProducts.filter((p) => p.category === 'bags')
  const [sortBy, setSortBy] = useState<string>('featured')
  const [minPrice, setMinPrice] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(10000)

  const filteredProducts = products
    .filter((p) => p.price >= minPrice && p.price <= maxPrice)
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
        {/* Header Section */}
        <div className="bg-secondary/50 px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-playfair font-bold text-foreground mb-2">Handbags</h1>
            <p className="text-muted-foreground">{filteredProducts.length} products available</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className="lg:col-span-1">
              <div className="bg-secondary/30 p-6 rounded-lg space-y-6">
                {/* Price Filter */}
                <div>
                  <h3 className="font-semibold text-foreground mb-4">Price Range</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-muted-foreground">Min: PKR {minPrice}</label>
                      <input
                        type="range"
                        min="0"
                        max="10000"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                        className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-accent"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground">Max: PKR {maxPrice}</label>
                      <input
                        type="range"
                        min="0"
                        max="10000"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-accent"
                      />
                    </div>
                  </div>
                </div>

                {/* Color Filter */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Colors</h3>
                  <div className="space-y-2">
                    {['Black', 'Brown', 'Red', 'Yellow', 'Gold'].map((color) => (
                      <label key={color} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded accent-accent" />
                        <span className="text-foreground">{color}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <h3 className="font-semibold text-foreground mb-3">Rating</h3>
                  <div className="space-y-2">
                    {[5, 4, 3].map((rating) => (
                      <label key={rating} className="flex items-center gap-2 text-sm cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded accent-accent" />
                        <span className="text-accent">{'★'.repeat(rating)}</span>
                        <span className="text-muted-foreground">& up</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              {/* Sort Bar */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredProducts.length} products
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
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-muted-foreground"
                  />
                </div>
              </div>

              {/* Products */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No products found matching your filters.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function Page() {
  return (
    <StoreProvider>
      <BagsPage />
    </StoreProvider>
  )
}
