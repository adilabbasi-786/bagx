'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { StoreProvider } from '@/lib/store-context'
import { mockProducts } from '@/lib/mock-data'
import Link from 'next/link'

function HomePage() {
  const featuredProducts = mockProducts.filter((p) => p.featured).slice(0, 8)

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-98 md:h-96 bg-gradient-to-r from-accent/10 to-accent/5 flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-playfair font-bold text-foreground mb-4">
                Luxury for Every Woman
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Discover our curated collection of premium handbags, luxury watches, and high-end cosmetics.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link
                  href="/bags"
                  className="px-8 py-3 bg-accent text-accent-foreground font-medium rounded hover:opacity-90 transition-opacity"
                >
                  Shop Bags
                </Link>
                <Link
                  href="/watches"
                  className="px-8 py-3 border-2 border-accent text-accent font-medium rounded hover:bg-accent/5 transition-colors"
                >
                  Shop Watches
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                {
                  title: 'Handbags',
                  description: 'Premium leather bags for every occasion',
                  href: '/bags',
                  bgColor: 'bg-accent/10',
                },
                {
                  title: 'Watches',
                  description: 'Luxury timepieces with elegance and precision',
                  href: '/watches',
                  bgColor: 'bg-blue-100',
                },
                {
                  title: 'Cosmetics',
                  description: 'High-quality beauty products for radiant skin',
                  href: '/cosmetics',
                  bgColor: 'bg-pink-100',
                },
              ].map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  className={`${category.bgColor} p-8 rounded-lg hover:shadow-lg transition-shadow`}
                >
                  <h3 className="text-2xl font-playfair font-semibold text-foreground mb-2">
                    {category.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{category.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12 px-4 bg-secondary/30">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <h2 className="text-4xl font-playfair font-bold text-foreground mb-2">
                Featured Collection
              </h2>
              <p className="text-muted-foreground">Explore our latest and most sought-after items</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center mt-12">
              <Link
                href="/bags"
                className="inline-block px-8 py-3 border-2 border-accent text-accent font-medium rounded hover:bg-accent hover:text-accent-foreground transition-all"
              >
                View All Products
              </Link>
            </div>
          </div>
        </section>

        {/* Promo Section */}
        <section className="py-16 px-4 bg-accent text-accent-foreground">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
              Ramadan Special Sale
            </h2>
            <p className="text-lg mb-6 opacity-90">Get up to 70% off on selected items</p>
            <Link
              href="/bags"
              className="inline-block px-8 py-3 bg-accent-foreground text-accent font-medium rounded hover:opacity-90 transition-opacity"
            >
              Shop Now
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-3">🚚</div>
                <h3 className="font-semibold text-foreground mb-2">Free Delivery</h3>
                <p className="text-muted-foreground text-sm">
                  Free delivery on orders above RS 3000/-
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">💳</div>
                <h3 className="font-semibold text-foreground mb-2">Easy Payment</h3>
                <p className="text-muted-foreground text-sm">
                  Multiple payment options including installments
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">⭐</div>
                <h3 className="font-semibold text-foreground mb-2">Premium Quality</h3>
                <p className="text-muted-foreground text-sm">
                  Authentic luxury products with quality assurance
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default function Page() {
  return (
    <StoreProvider>
      <HomePage />
    </StoreProvider>
  )
}
