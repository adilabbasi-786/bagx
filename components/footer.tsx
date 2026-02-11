import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold font-playfair mb-2">BAGX</h3>
            <p className="text-sm text-primary-foreground/80">
              Luxury bags, watches, and cosmetics for the modern woman.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">SHOP</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link href="/bags" className="hover:text-primary-foreground transition-colors">
                  Bags
                </Link>
              </li>
              <li>
                <Link href="/watches" className="hover:text-primary-foreground transition-colors">
                  Watches
                </Link>
              </li>
              <li>
                <Link href="/cosmetics" className="hover:text-primary-foreground transition-colors">
                  Cosmetics
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">SUPPORT</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link href="/contact" className="hover:text-primary-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-primary-foreground transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">NEWSLETTER</h4>
            <p className="text-sm text-primary-foreground/80 mb-3">
              Subscribe for exclusive offers and updates
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 text-sm text-foreground placeholder-muted-foreground bg-primary-foreground rounded"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-accent text-accent-foreground text-sm font-medium rounded hover:opacity-90 transition-opacity"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/20 pt-8 text-sm text-primary-foreground/70 text-center">
          <p>
            &copy; 2024 BAGX - All rights reserved. Free delivery above RS 3000/- Orders. Standard Delivery RS 199/-
          </p>
        </div>
      </div>
    </footer>
  )
}
