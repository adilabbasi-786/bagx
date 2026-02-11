'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { StoreProvider, useStore } from '@/lib/store-context'
import { mockProducts } from '@/lib/mock-data'
import { useState } from 'react'
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

function ProductDetail({ productId }: { productId: string }) {
  const normalizedId = decodeURIComponent(productId).trim().toLowerCase()
  const product = mockProducts.find((p) => p.id.toLowerCase() === normalizedId)
  const { addToCart, toggleWishlist, isInWishlist } = useStore()
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState(product?.colors[0].name)
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0])
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [imageError, setImageError] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-2">Product not found</h1>
            <Link href="/bags" className="text-accent hover:underline">
              Back to shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const isFavorited = isInWishlist(product.id)

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      color: selectedColor,
      size: selectedSize,
      image: product.image,
    })
    setQuantity(1)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 py-4 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          {' / '}
          <Link href={`/${product.category}`} className="hover:text-accent capitalize">
            {product.category}
          </Link>
          {' / '}
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Product Section */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div>
              <div className="bg-secondary rounded-lg overflow-hidden mb-4 relative h-96 lg:h-[500px]">
                {imageError ? (
                  <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground">
                    Image not available
                  </div>
                ) : (
                  <img
                    src={product.images[currentImageIndex] || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                )}

                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                    >
                      <ChevronLeft size={20} className="text-foreground" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                    >
                      <ChevronRight size={20} className="text-foreground" />
                    </button>
                  </>
                )}

                {product.discount > 0 && (
                  <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full font-bold text-sm">
                    -{product.discount}%
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      idx === currentImageIndex ? 'border-accent' : 'border-border'
                    }`}
                  >
                    <img src={img || "/placeholder.svg"} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-6">
                <h1 className="text-4xl font-playfair font-bold text-foreground mb-2">
                  {product.name}
                </h1>
                <div className="flex items-center gap-3">
                  <div className="flex text-accent">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < Math.floor(product.rating) ? '' : 'opacity-30'}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              {/* Pricing */}
              <div className="mb-6 pb-6 border-b border-border">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold text-foreground">
                    PKR {product.price.toLocaleString()}
                  </span>
                  <span className="text-xl text-muted-foreground line-through">
                    PKR {product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-lg font-semibold text-accent">
                    Save {product.discount}%
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Free delivery on orders above RS 3000/-
                </p>
              </div>

              {/* Description */}
              <div className="mb-6">
                <p className="text-foreground leading-relaxed">{product.description}</p>
              </div>

              {/* Options */}
              <div className="space-y-6 mb-8">
                {/* Color Selection */}
                {product.colors.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      Color: {selectedColor}
                    </label>
                    <div className="flex gap-3 flex-wrap">
                      {product.colors.map((color) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedColor(color.name)}
                          className={`w-10 h-10 rounded-full border-2 transition-all ${
                            selectedColor === color.name ? 'border-foreground ring-2 ring-accent' : 'border-border'
                          }`}
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                {product.sizes && product.sizes.length > 0 && (
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      Size: {selectedSize}
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 rounded border-2 transition-all ${
                            selectedSize === size
                              ? 'border-accent bg-accent text-accent-foreground'
                              : 'border-border text-foreground hover:border-accent'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Quantity
                  </label>
                  <div className="flex items-center border border-border rounded-lg w-fit">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-secondary transition-colors"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-16 text-center border-l border-r border-border py-2 text-foreground"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 hover:bg-secondary transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary text-primary-foreground py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`px-6 py-4 rounded-lg border-2 font-semibold transition-all ${
                    isFavorited
                      ? 'border-accent bg-accent text-accent-foreground'
                      : 'border-border text-foreground hover:border-accent'
                  }`}
                >
                  <Heart size={20} className={isFavorited ? 'fill-current' : ''} />
                </button>
              </div>

              {/* Additional Info */}
              <div className="bg-secondary/30 p-4 rounded-lg space-y-2 text-sm">
                <p className="text-foreground">
                  <strong>SKU:</strong> GS{Math.random().toString().slice(2, 8)}
                </p>
                <p className="text-foreground">
                  <strong>Stock:</strong>{' '}
                  <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                </p>
                <p className="text-muted-foreground">
                  Free returns within 14 days. Cash on delivery available.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-secondary/20 py-12 mt-8">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-playfair font-bold text-foreground mb-8">
              Customer Reviews
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Review Summary */}
              <div className="bg-white p-6 rounded-lg">
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-foreground mb-2">{product.rating}</div>
                  <div className="flex justify-center text-2xl text-accent mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < Math.floor(product.rating) ? '' : 'opacity-30'}>
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground">Based on {product.reviews} reviews</p>
                </div>

                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2 text-sm">
                      <span className="text-accent">{'★'.repeat(star)}{'☆'.repeat(5 - star)}</span>
                      <div className="flex-1 h-2 bg-border rounded-full"></div>
                      <span className="text-muted-foreground">{Math.floor(product.reviews * 0.2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Individual Reviews */}
              <div className="lg:col-span-2 space-y-4">
                {product.reviews_list.map((review) => (
                  <div key={review.id} className="bg-white p-6 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-foreground">{review.author}</h4>
                        <div className="flex items-center gap-2">
                          <div className="text-accent">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                      {review.verified && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <h5 className="font-semibold text-foreground mb-2">{review.title}</h5>
                    <p className="text-muted-foreground text-sm">{review.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-playfair font-bold text-foreground mb-8">
            You might also like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProducts
              .filter((p) => p.category === product.category && p.id !== product.id)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
                  <div className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative h-64 bg-secondary overflow-hidden">
                      <img
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                      {relatedProduct.discount > 0 && (
                        <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-bold">
                          -{relatedProduct.discount}%
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-playfair font-semibold text-foreground line-clamp-2 mb-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-lg font-bold text-foreground">
                        PKR {relatedProduct.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function Page() {
  const params = useParams<{ id: string }>()
  const productId = typeof params.id === 'string' ? params.id : params.id?.[0] ?? ''

  return (
    <StoreProvider>
      <ProductDetail productId={productId} />
    </StoreProvider>
  )
}
