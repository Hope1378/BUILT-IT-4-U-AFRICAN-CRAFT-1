import { Link } from 'react-router-dom'
import { Shield, Globe, Heart, Award, ArrowRight, Star } from 'lucide-react'
import HeroSlider from '../components/HeroSlider'
import ProductCard from '../components/ProductCard'
import { products, features, testimonials } from '../data/products'
import './Home.css'

const featuredProducts = products.filter((p) =>
  ['Bitengi - Traditional Gomesi Blue', 'Traditional Kanzu - Cream Heritage', "Women's Beaded Jewelry Set", 'Traditional Woven Baskets - Kids'].includes(p.name),
)

const iconMap = { Shield, Globe, Heart, Award }

const categoryCards = [
  {
    label: 'Women',
    value: 'women',
    image: '/images/uganda/ug11 women bitengi.jpg',
    count: 8,
  },
  {
    label: 'Men',
    value: 'men',
    image: '/images/uganda/ug13men.jpg',
    count: 6,
  },
  {
    label: 'Children',
    value: 'children',
    image: '/images/uganda/ug7 crafts.jpg',
    count: 6,
  },
  {
    label: 'Jewelry & Beads',
    value: 'women',
    image: '/images/uganda/ug10 women jewelry.webp',
    count: '12+',
  },
  {
    label: 'Baskets & Crafts',
    value: 'children',
    image: '/images/uganda/ug3 basckets.webp',
    count: '8+',
  },
]

export default function Home() {
  return (
    <div>
      {/* ── Hero Slider ── */}
      <HeroSlider />

      {/* ── Stats Bar ── */}
      <section className="home__stats">
        <div className="page-section__container">
          <div className="home__stats-grid">
            {[
              { value: '2,400+', label: 'Artisan Pieces' },
              { value: '340+', label: 'Artisan Families' },
              { value: '80+', label: 'Countries Shipped' },
              { value: '4.9★', label: 'Average Rating' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="home__stat-value">{value}</div>
                <div className="home__stat-label">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories Section ── */}
      <section className="page-section page-section--earth">
        <div className="page-section__container">
          <div className="page-section__header">
            <span className="page-section__eyebrow">
              Browse By Category
            </span>
            <h2 className="section-title mt-2">Shop by Gender & Age</h2>
            <p className="section-subtitle text-center">
              Kajabo Crafty brings together Ugandan cultural wear, jewelry, and handcrafted pieces for women, men, and children.
            </p>
          </div>
          <div className="home__category-grid">
            {categoryCards.map(({ label, value, image, count }) => (
              <Link
                key={value}
                to={`/shop?category=${value}`}
                className="home__category-card"
              >
                <img
                  src={image}
                  alt={label}
                  className="home__category-image"
                  loading="lazy"
                />
                <div className="home__category-overlay" />
                <div className="home__category-copy">
                  <h3 className="home__category-title">{label}</h3>
                  <p className="home__category-count">{count} items</p>
                </div>
                <div className="home__category-arrow">
                  <ArrowRight size={15} className="text-white" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section className="page-section page-section--light">
        <div className="page-section__container">
          <div className="page-section__header">
            <span className="page-section__eyebrow">
              Hand-Picked
            </span>
            <h2 className="section-title mt-2">Featured Ugandan Pieces</h2>
            <p className="section-subtitle text-center">
              Our most-loved Kajabo Crafty selections, chosen for cultural identity, beauty, and strong artisan finishing.
            </p>
          </div>
          <div className="home__products-grid">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="home__cta-row">
            <Link to="/shop" className="btn-primary">
              View All Products
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="page-section page-section--earth">
        <div className="page-section__container">
          <div className="page-section__header">
            <span className="page-section__eyebrow">
              Our Promise
            </span>
            <h2 className="section-title mt-2">Why Kajabo Crafty?</h2>
          </div>
          <div className="home__features-grid">
            {features.map(({ icon, title, desc }) => {
              const Icon = iconMap[icon]
              return (
                <div
                  key={title}
                  className="home__feature-card"
                >
                  <div className="home__feature-icon-wrap">
                    <Icon size={22} className="text-terracotta-600" />
                  </div>
                  <h3 className="home__feature-title">{title}</h3>
                  <p className="home__feature-copy">{desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Story / CTA Banner ── */}
      <section className="home__story">
        <img
          src="/images/uganda/market-story.svg"
          alt="Ugandan market craft and cultural wear illustration"
          className="home__story-image"
        />
        <div className="home__story-overlay" />
        <div className="home__story-content">
          <span className="home__story-eyebrow">
            Our Story
          </span>
          <h2 className="home__story-title">
            Uganda, Crafted with Pride
          </h2>
          <p className="home__story-copy">
            Kajabo Crafty is built around Ugandan material culture: barkcloth, beadwork, basketry,
            ceremonial wear, and rhythm. Every order supports makers preserving design languages
            that belong to families, kingdoms, and living communities across Uganda.
          </p>
          <div className="home__story-actions">
            <Link to="/shop" className="btn-primary">
              Shop the Collection
              <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="home__story-secondary">
              Contact an Expert
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="page-section page-section--light">
        <div className="page-section__container">
          <div className="page-section__header">
            <span className="page-section__eyebrow">
              Happy Customers
            </span>
            <h2 className="section-title mt-2">What People Say</h2>
          </div>
          <div className="home__testimonials">
            {testimonials.map(({ id, name, location, rating, text, avatar }) => (
              <div key={id} className="home__testimonial-card">
                <div className="home__testimonial-stars">
                  {Array.from({ length: rating }).map((_, i) => (
                    <Star key={i} size={15} className="fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <p className="home__testimonial-copy">"{text}"</p>
                <div className="home__testimonial-meta">
                  <img
                    src={avatar}
                    alt={name}
                    className="home__testimonial-avatar"
                  />
                  <div>
                    <div className="home__testimonial-name">{name}</div>
                    <div className="home__testimonial-location">{location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
