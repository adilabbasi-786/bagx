'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { StoreProvider } from '@/lib/store-context'

function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-accent/10 to-accent/5 px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-playfair font-bold text-foreground mb-4">
              About BAGX
            </h1>
            <p className="text-xl text-muted-foreground">
              Redefining luxury fashion for the modern woman
            </p>
          </div>
        </div>

        {/* Our Story */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-playfair font-bold text-foreground mb-6">Our Story</h2>
          <p className="text-lg text-foreground leading-relaxed mb-6">
            BAGX was founded with a simple mission: to bring premium luxury accessories to women who appreciate quality, elegance, and style. We believe that every woman deserves to feel confident and beautiful, and our carefully curated collection of handbags, watches, and cosmetics helps her achieve that goal.
          </p>
          <p className="text-lg text-foreground leading-relaxed mb-6">
            Since our inception, we've been committed to sourcing the finest materials and collaborating with the best designers to offer products that combine timeless elegance with contemporary design. Our team works tirelessly to ensure that every item in our collection meets our rigorous quality standards.
          </p>
          <p className="text-lg text-foreground leading-relaxed">
            Today, BAGX is trusted by thousands of women across Pakistan and beyond. We continue to expand our collection and improve our services to provide the ultimate luxury shopping experience.
          </p>
        </div>

        {/* Values Section */}
        <div className="bg-secondary/30 px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-playfair font-bold text-foreground mb-12 text-center">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-8">
                <h3 className="text-2xl font-playfair font-semibold text-foreground mb-4">
                  Quality
                </h3>
                <p className="text-foreground leading-relaxed">
                  We only offer authentic, premium products that meet our stringent quality standards. Every item is carefully inspected before shipping.
                </p>
              </div>
              <div className="bg-white rounded-lg p-8">
                <h3 className="text-2xl font-playfair font-semibold text-foreground mb-4">
                  Trust
                </h3>
                <p className="text-foreground leading-relaxed">
                  Our customers' trust is paramount. We're transparent about our products, pricing, and policies, and we stand behind every purchase.
                </p>
              </div>
              <div className="bg-white rounded-lg p-8">
                <h3 className="text-2xl font-playfair font-semibold text-foreground mb-4">
                  Excellence
                </h3>
                <p className="text-foreground leading-relaxed">
                  We're committed to excellence in every aspect of our business, from product selection to customer service.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-playfair font-bold text-foreground mb-8">
            Why Choose BAGX?
          </h2>
          <ul className="space-y-4">
            <li className="flex gap-4">
              <span className="text-accent text-2xl flex-shrink-0">✓</span>
              <div>
                <h4 className="font-semibold text-foreground text-lg">Authentic Products</h4>
                <p className="text-muted-foreground">
                  All our products are 100% authentic with certificates of authenticity.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-accent text-2xl flex-shrink-0">✓</span>
              <div>
                <h4 className="font-semibold text-foreground text-lg">Competitive Pricing</h4>
                <p className="text-muted-foreground">
                  We offer the best prices without compromising on quality. Regular discounts and seasonal sales.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-accent text-2xl flex-shrink-0">✓</span>
              <div>
                <h4 className="font-semibold text-foreground text-lg">Fast Delivery</h4>
                <p className="text-muted-foreground">
                  Free delivery on orders above PKR 3000/- with reliable courier partners.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-accent text-2xl flex-shrink-0">✓</span>
              <div>
                <h4 className="font-semibold text-foreground text-lg">Easy Returns</h4>
                <p className="text-muted-foreground">
                  14-day returns policy with full refund. No questions asked.
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="text-accent text-2xl flex-shrink-0">✓</span>
              <div>
                <h4 className="font-semibold text-foreground text-lg">Exceptional Customer Service</h4>
                <p className="text-muted-foreground">
                  Our dedicated team is available to help you 24/7 via WhatsApp, email, and phone.
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* CTA Section */}
        <div className="bg-accent text-accent-foreground px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-playfair font-bold mb-4">
              Ready to Elevate Your Style?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Explore our exclusive collection and discover your next favorite piece.
            </p>
            <a
              href="/bags"
              className="inline-block px-8 py-3 bg-accent-foreground text-accent font-semibold rounded hover:opacity-90 transition-opacity"
            >
              Shop Now
            </a>
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
      <AboutPage />
    </StoreProvider>
  )
}
