import { useState } from 'react'
import { Star, ShoppingCart, Heart, MapPin } from 'lucide-react'
import './ProductCard.css'

const badgeColors = {
  Bestseller: 'bg-gold-500 text-white',
  Sale:       'bg-terracotta-500 text-white',
  Collector:  'bg-earth-700 text-white',
  Rare:       'bg-purple-700 text-white',
  Popular:    'bg-emerald-600 text-white',
  Premium:    'bg-gold-600 text-white',
  Handcrafted:'bg-earth-500 text-white',
}

export default function ProductCard({ product }) {
  const [wished, setWished] = useState(false)
  const [added, setAdded] = useState(false)

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  const handleAddToCart = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="product-card">
      {/* Image container */}
      <div className="product-card__media">
        <img
          src={product.image}
          alt={product.name}
          className="product-card__image"
          loading="lazy"
        />

        {/* Badges */}
        <div className="product-card__badges">
          {product.badge && (
            <span className={`product-card__badge ${badgeColors[product.badge] || 'product-card__badge--fallback'}`}>
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="product-card__badge product-card__badge--discount">
              -{discount}%
            </span>
          )}
          {!product.inStock && (
            <span className="product-card__badge product-card__badge--soldout">
              Sold Out
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={() => setWished((v) => !v)}
          aria-label="Add to wishlist"
          className="product-card__wishlist"
        >
          <Heart
            size={16}
            className={wished ? 'product-card__wishlist-icon--active' : 'product-card__wishlist-icon--inactive'}
          />
        </button>
      </div>

      {/* Content */}
      <div className="product-card__body">
        {/* Origin */}
        <div className="product-card__origin">
          <MapPin size={11} />
          <span>{product.origin}</span>
        </div>

        {/* Name */}
        <h3 className="product-card__title">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="product-card__rating">
          <div className="product-card__stars">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={13}
                className={
                  i < Math.floor(product.rating)
                    ? 'product-card__star--filled'
                    : 'product-card__star--empty'
                }
              />
            ))}
          </div>
          <span className="product-card__rating-copy">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Description */}
        <p className="product-card__description">
          {product.description}
        </p>

        {/* Price + Cart */}
        <div className="product-card__footer">
          <div>
            <span className="product-card__price">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="product-card__price-old">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`product-card__cta ${
              !product.inStock
                ? 'product-card__cta--disabled'
                : added
                ? 'product-card__cta--added'
                : 'product-card__cta--default'
            }`}
          >
            <ShoppingCart size={13} />
            {!product.inStock ? 'Sold Out' : added ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}
