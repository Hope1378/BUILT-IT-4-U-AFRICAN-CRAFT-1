import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingBag, Search, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import './Navbar.css'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const location = useLocation()
  const { totalItems, openCart } = useCart()
  const isHome = location.pathname === '/'
  // On mobile: always sticky (never overlay). On desktop: overlay if home + !scrolled
  const isOverlay = isHome && !scrolled && !isMobile && !menuOpen

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  useEffect(() => {
    if (!menuOpen || !isMobile) {
      return undefined
    }

    const scrollY = window.scrollY
    document.body.classList.add('no-scroll')
    document.body.style.top = `-${scrollY}px`

    return () => {
      document.body.classList.remove('no-scroll')
      document.body.style.top = ''
      window.scrollTo(0, scrollY)
    }
  }, [menuOpen, isMobile])

  const toneClass = isOverlay ? 'navbar__tone--light' : 'navbar__tone--dark'

  const activeClass = isOverlay
    ? 'navbar__link--active-light'
    : 'navbar__link--active-dark'

  return (
    <header className={`navbar ${menuOpen ? 'navbar--menu-open' : isOverlay ? 'navbar--overlay' : 'navbar--solid'}`}>
      <div className="navbar__container">
        <div className="navbar__row">

          {/* Logo */}
          <Link to="/" className="navbar__brand">
            <img src="/branding/kajabo-crafty-logo.svg" alt="Kajabo Crafty" className="navbar__logo" />
          </Link>

          {/* Desktop Nav */}
          <nav className="navbar__nav">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `navbar__link ${
                    isActive ? activeClass : toneClass
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="navbar__actions">
            <Link
              to="/shop"
              aria-label="Search products"
              className={`navbar__icon-button ${toneClass}`}
              title="Search products"
            >
              <Search size={18} />
            </Link>
            <button
              type="button"
              aria-label="Open cart"
              className={`navbar__cart-button ${toneClass}`}
              onClick={openCart}
            >
              <ShoppingCart size={18} />
              {totalItems > 0 && <span className="navbar__cart-count">{totalItems}</span>}
            </button>
            <Link
              to="/shop"
              className="navbar__cta"
            >
              <ShoppingBag size={16} />
              Shop Now
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <div className="navbar__mobile-actions">
            <button
              type="button"
              aria-label="Open cart"
              className={`navbar__cart-button navbar__cart-button--mobile ${toneClass}`}
              onClick={openCart}
            >
              <ShoppingCart size={18} />
              {totalItems > 0 && <span className="navbar__cart-count">{totalItems}</span>}
            </button>
            <button
              className={`navbar__menu-toggle ${toneClass}`}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : 'navbar__mobile--closed'}`}
      >
        <div className="navbar__mobile-inner">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `navbar__mobile-link ${
                  isActive
                    ? 'navbar__mobile-link--active'
                    : 'navbar__mobile-link--inactive'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link
            to="/shop"
            className="navbar__mobile-cta"
          >
            <ShoppingBag size={16} />
            Shop Now
          </Link>
          <button type="button" className="navbar__mobile-cart" onClick={openCart}>
            <ShoppingCart size={16} />
            View Cart {totalItems > 0 ? `(${totalItems})` : ''}
          </button>
        </div>
      </div>
    </header>
  )
}
