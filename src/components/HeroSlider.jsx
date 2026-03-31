import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import { heroSlides } from '../data/products'
import './HeroSlider.css'

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)

  const goTo = useCallback(
    (index) => {
      if (animating) return
      setAnimating(true)
      setTimeout(() => {
        setCurrent((index + heroSlides.length) % heroSlides.length)
        setAnimating(false)
      }, 300)
    },
    [animating],
  )

  const prev = () => goTo(current - 1)
  const next = useCallback(() => goTo(current + 1), [current, goTo])

  // Auto-advance every 5 s
  useEffect(() => {
    const timer = setInterval(next, 5000)
    return () => clearInterval(timer)
  }, [next])

  const slide = heroSlides[current]

  return (
    <section className="hero-slider">
      {/* Slides */}
      {heroSlides.map((s, i) => (
        <div
          key={s.id}
          className={`hero-slider__slide ${
            i === current ? 'hero-slider__slide--active' : 'hero-slider__slide--inactive'
          }`}
        >
          <img
            src={s.image}
            alt={s.title}
            className="hero-slider__image"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
          {/* Gradient overlay */}
          <div className="hero-slider__overlay--side" />
          <div className="hero-slider__overlay--bottom" />
        </div>
      ))}

      {/* Content */}
      <div className="hero-slider__content-wrap">
        <div className="hero-slider__container">
          <div
            className={`hero-slider__content ${
              animating ? 'hero-slider__content--hidden' : 'hero-slider__content--visible'
            }`}
          >
            {/* Accent badge */}
            <span className="hero-slider__accent">
              {slide.accent}
            </span>

            {/* Title */}
            <h1 className="hero-slider__title">
              {slide.title}
            </h1>

            {/* Subtitle */}
            <p className="hero-slider__subtitle">
              {slide.subtitle}
            </p>

            {/* CTAs */}
            <div className="hero-slider__actions">
              <Link
                to={slide.ctaLink}
                className="btn-primary text-sm sm:text-base"
              >
                {slide.cta}
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/shop"
                className="hero-slider__secondary-cta"
              >
                View All Crafts
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="hero-slider__arrow hero-slider__arrow--left"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="hero-slider__arrow hero-slider__arrow--right"
      >
        <ChevronRight size={22} />
      </button>

      {/* Dot indicators */}
      <div className="hero-slider__dots">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`hero-slider__dot ${
              i === current
                ? 'hero-slider__dot--active'
                : 'hero-slider__dot--inactive'
            }`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="hero-slider__counter">
        {String(current + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}
      </div>
    </section>
  )
}
