import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
} from 'lucide-react'
import './Footer.css'

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Youtube, href: '#', label: 'YouTube' },
]

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/shop', label: 'Shop All' },
  { to: '/shop?category=baskets', label: 'Baskets' },
  { to: '/shop?category=masks', label: 'Masks' },
  { to: '/shop?category=jewelry', label: 'Jewelry' },
  { to: '/shop?category=clothing', label: 'Clothing' },
  { to: '/shop?category=instruments', label: 'Instruments' },
]

const infoLinks = [
  { to: '/contact', label: 'Contact Us' },
  { href: '#', label: 'Shipping Policy' },
  { href: '#', label: 'Returns & Refunds' },
  { href: '#', label: 'Artisan Stories' },
  { href: '#', label: 'About AfriCraft' },
]

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer className="footer">
      {/* Top band */}
      <div className="footer__promo">
        <div className="footer__promo-inner">
          <p className="footer__promo-text">
            🌍 Free worldwide shipping on orders over <strong>$100</strong>
          </p>
          <Link
            to="/shop"
            className="footer__promo-link"
          >
            Shop Now →
          </Link>
        </div>
      </div>

      {/* Main footer content */}
      <div className="footer__content">
        {/* Brand */}
        <div>
          <div className="footer__brand-row">
            <span className="footer__brand-badge">
              A
            </span>
            <div className="footer__brand-copy">
              <span className="footer__brand-title">AfriCraft</span>
              <span className="footer__brand-tagline">
                Authentic Artistry
              </span>
            </div>
          </div>
          <p className="footer__brand-text">
            Connecting the world with authentic African artisans since 2018. Every purchase supports
            a family and preserves a tradition.
          </p>
          {/* Social */}
          <div className="footer__socials">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="footer__social-link"
              >
                <Icon size={15} className="text-white" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="footer__section-title">Quick Links</h3>
          <ul className="footer__list">
            {quickLinks.map(({ to, label }) => (
              <li key={label}>
                <Link
                  to={to}
                  className="footer__list-link"
                >
                  <ArrowRight size={13} className="footer__list-icon" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div>
          <h3 className="footer__section-title">Info</h3>
          <ul className="footer__list">
            {infoLinks.map(({ to, href, label }) => (
              <li key={label}>
                {to ? (
                  <Link
                    to={to}
                    className="footer__list-link"
                  >
                    <ArrowRight size={13} className="footer__list-icon" />
                    {label}
                  </Link>
                ) : (
                  <a
                    href={href}
                    className="footer__list-link"
                  >
                    <ArrowRight size={13} className="footer__list-icon" />
                    {label}
                  </a>
                )}
              </li>
            ))}
          </ul>
          {/* Contact */}
          <div className="footer__contact">
            <a href="mailto:hello@africraft.com" className="footer__contact-link">
              <Mail size={14} className="footer__contact-icon" />
              hello@africraft.com
            </a>
            <a href="tel:+1234567890" className="footer__contact-link">
              <Phone size={14} className="footer__contact-icon" />
              +1 (234) 567-890
            </a>
            <span className="footer__contact-text">
              <MapPin size={14} className="footer__contact-icon footer__contact-pin" />
              14 Craft Lane, Nairobi, Kenya
            </span>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="footer__section-title mb-2">Newsletter</h3>
          <p className="footer__newsletter-copy">
            Get artisan stories, exclusive deals and new arrivals straight to your inbox.
          </p>
          {subscribed ? (
            <div className="footer__newsletter-success">
              🎉 You're subscribed! Welcome to the tribe.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="footer__newsletter-form">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="footer__newsletter-input"
              />
              <button
                type="submit"
                className="footer__newsletter-button"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <span>© {new Date().getFullYear()} AfriCraft. All rights reserved.</span>
          <div className="footer__bottom-links">
            <a href="#" className="footer__bottom-link">Privacy Policy</a>
            <a href="#" className="footer__bottom-link">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
