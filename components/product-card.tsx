'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart } from 'lucide-react'
import { useState } from 'react'
import { useStore } from '@/lib/store-context'
import { Product } from '@/lib/mock-data'

interface ProductCardProps {
  product: Product
  showOverlay?: boolean
}

export function ProductCard({ product, showOverlay = true }: ProductCardProps) {
  const { toggleWishlist, isInWishlist } = useStore()
  const [imageError, setImageError] = useState(false)

  const isFavorited = isInWishlist(product.id)

  return (
    <div className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Image Container */}
      <Link href={`/product/${product.id}`}>
        <div className="relative h-80 bg-secondary overflow-hidden">
          {imageError ? (
            <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground">
              Image not available
            </div>
          ) : (
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          )}

          {/* Discount Badge */}
          {product.discount > 0 && (
            <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
              -{product.discount}%
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              toggleWishlist(product.id)
            }}
            className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full transition-colors"
          >
            <Heart
              size={20}
              className={isFavorited ? 'fill-accent text-accent' : 'text-foreground'}
            />
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4">
        <Link
          href={`/product/${product.id}`}
          className="block mb-2 hover:text-accent transition-colors"
        >
          <h3 className="font-playfair text-lg font-semibold text-foreground line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex text-accent">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={i < Math.floor(product.rating) ? 'text-lg' : 'text-lg opacity-30'}>
                ★
              </span>
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>

        {/* Pricing */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-xl font-bold text-foreground">PKR {product.price.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground line-through">
            PKR {product.originalPrice.toLocaleString()}
          </span>
        </div>

        {/* Category */}
        <p className="text-xs text-muted-foreground capitalize mb-3">{product.category}</p>

        {/* Add to Cart Button - visible on hover */}
        <button className="w-full bg-primary text-primary-foreground py-2 rounded font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          Quick View
        </button>
      </div>
    </div>
  )
}
