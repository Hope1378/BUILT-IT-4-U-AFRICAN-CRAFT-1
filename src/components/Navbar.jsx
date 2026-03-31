import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingBag, Search } from 'lucide-react'
import './Navbar.css'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const isOverlay = isHome && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const toneClass = isOverlay ? 'navbar__tone--light' : 'navbar__tone--dark'

  const activeClass = isOverlay
    ? 'navbar__link--active-light'
    : 'navbar__link--active-dark'

  return (
    <header className={`navbar ${isOverlay ? 'navbar--overlay' : 'navbar--solid'}`}>
      <div className="navbar__container">
        <div className="navbar__row">

          {/* Logo */}
          <Link to="/" className="navbar__brand">
            <span className="navbar__brand-badge">
              A
            </span>
            <div className="navbar__brand-copy">
              <span className="navbar__brand-title">
                AfriCraft
              </span>
              <span className="navbar__brand-tagline">
                Authentic Artistry
              </span>
            </div>
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
            <button
              aria-label="Search"
              className={`navbar__icon-button ${toneClass}`}
            >
              <Search size={18} />
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
          <button
            className={`navbar__menu-toggle ${toneClass}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
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
        </div>
      </div>
    </header>
  )
}
