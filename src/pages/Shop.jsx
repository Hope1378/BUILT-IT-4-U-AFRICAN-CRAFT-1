import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import './Shop.css'

const CATEGORIES = ['all', 'baskets', 'masks', 'jewelry', 'instruments']

const SORT_OPTIONS = [
  { value: 'default',      label: 'Featured' },
  { value: 'price-asc',   label: 'Price: Low to High' },
  { value: 'price-desc',  label: 'Price: High to Low' },
  { value: 'rating',      label: 'Top Rated' },
]

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCat = searchParams.get('category') || 'all'

  const [activeCategory, setActiveCategory] = useState(initialCat)
  const [searchQuery, setSearchQuery]       = useState('')
  const [sortBy, setSortBy]                 = useState('default')
  const [filtersOpen, setFiltersOpen]       = useState(false)

  // Sync category when URL param changes (e.g. from navbar links)
  useEffect(() => {
    const cat = searchParams.get('category') || 'all'
    setActiveCategory(cat)
  }, [searchParams])

  const handleCategory = (cat) => {
    setActiveCategory(cat)
    if (cat === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ category: cat })
    }
  }

  const filtered = useMemo(() => {
    let list = [...products]

    if (activeCategory !== 'all') {
      list = list.filter((p) => p.category === activeCategory)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q),
      )
    }

    if (sortBy === 'price-asc')  list.sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price)
    if (sortBy === 'rating')     list.sort((a, b) => b.rating - a.rating)

    return list
  }, [activeCategory, searchQuery, sortBy])

  const clearSearch = () => setSearchQuery('')

  return (
    <div className="page-shell">
      {/* ── Page Header ── */}
      <div className="page-hero">
        <div className="page-hero__container">
          <span className="page-hero__eyebrow">
            Browse the Collection
          </span>
          <h1 className="page-hero__title">
            African Craft Shop
          </h1>
          <p className="page-hero__copy">
            {products.length} authentic pieces from across Africa — baskets, masks, jewelry &amp; instruments.
          </p>
        </div>
      </div>

      <div className="page-section__container py-8">
        {/* ── Search + Sort Bar ── */}
        <div className="shop__toolbar">
          {/* Search */}
          <div className="shop__search">
            <Search size={16} className="shop__search-icon" />
            <input
              type="text"
              placeholder="Search crafts, origins…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="shop__search-input"
            />
            {searchQuery && (
              <button onClick={clearSearch} className="shop__clear-search">
                <X size={15} />
              </button>
            )}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="shop__sort"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className="shop__filters-toggle"
          >
            <SlidersHorizontal size={15} />
            Filter
          </button>
        </div>

        {/* ── Category Tabs ── */}
        <div className={`shop__categories ${filtersOpen ? 'shop__categories--open' : 'shop__categories--closed'}`}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className={`shop__category ${
                activeCategory === cat
                  ? 'shop__category--active'
                  : 'shop__category--inactive'
              }`}
            >
              {cat === 'all' ? 'All Crafts' : cat}
            </button>
          ))}
        </div>

        {/* ── Results count ── */}
        <div className="shop__results">
          <p className="shop__results-copy">
            Showing <span className="shop__results-emphasis">{filtered.length}</span>{' '}
            {filtered.length === 1 ? 'item' : 'items'}
            {activeCategory !== 'all' && (
              <> in <span className="shop__results-category">{activeCategory}</span></>
            )}
          </p>
          {(activeCategory !== 'all' || searchQuery) && (
            <button
              onClick={() => { handleCategory('all'); clearSearch() }}
              className="shop__clear-filters"
            >
              <X size={12} /> Clear filters
            </button>
          )}
        </div>

        {/* ── Product Grid ── */}
        {filtered.length > 0 ? (
          <div className="shop__grid">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="shop__empty">
            <span className="shop__empty-icon">🔍</span>
            <h3 className="shop__empty-title">No crafts found</h3>
            <p className="shop__empty-copy">
              Try adjusting your search or removing the active filter.
            </p>
            <button
              onClick={() => { handleCategory('all'); clearSearch() }}
              className="btn-primary text-sm"
            >
              Show All Crafts
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
