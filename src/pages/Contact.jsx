import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import './Contact.css'

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    detail: 'hello@kajabocrafty.com',
    sub: 'We reply within 24 hours',
    href: 'mailto:hello@kajabocrafty.com',
  },
  {
    icon: Phone,
    title: 'Call Us',
    detail: '+256 700 123 456',
    sub: 'Mon–Fri, 9am – 6pm EAT',
    href: 'tel:+256700123456',
  },
  {
    icon: MapPin,
    title: 'Visit Us',
    detail: 'Plot 14 Buganda Road, Kampala',
    sub: 'Uganda, East Africa',
    href: 'https://maps.google.com',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    detail: 'Mon – Fri: 9am – 6pm',
    sub: 'Weekends: 10am – 4pm',
    href: null,
  },
]

const initialForm = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  const [form, setForm]         = useState(initialForm)
  const [errors, setErrors]     = useState({})
  const [loading, setLoading]   = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.name.trim())          e.name    = 'Name is required.'
    if (!form.email.trim())         e.email   = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
                                    e.email   = 'Enter a valid email address.'
    if (!form.subject.trim())       e.subject = 'Subject is required.'
    if (!form.message.trim())       e.message = 'Message is required.'
    else if (form.message.trim().length < 10)
                                    e.message = 'Message must be at least 10 characters.'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) { setErrors(e2); return }

    setLoading(true)
    // Simulate submission delay
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setForm(initialForm)
    }, 1500)
  }

  const fieldClass = (name) =>
    `contact__field ${
      errors[name]
        ? 'contact__field--error'
        : 'contact__field--default'
    }`

  return (
    <div className="page-shell">
      {/* ── Page Header ── */}
      <div className="page-hero">
        <div className="page-hero__container">
          <span className="page-hero__eyebrow">
            Get in Touch
          </span>
          <h1 className="page-hero__title">
            Contact Us
          </h1>
          <p className="page-hero__copy">
            Questions about Ugandan cultural wear, barkcloth decor, or custom Kajabo Crafty sourcing? We'd love to hear from you.
          </p>
        </div>
      </div>

      <div className="page-section__container py-16">
        <div className="contact__grid">

          {/* ── Contact Info ── */}
          <div className="contact__info">
            <div>
              <h2 className="contact__info-title">
                We're Here for You
              </h2>
              <p className="contact__info-copy">
                Reach out via any channel below or use the form. Our team of Ugandan craft specialists
                is always happy to help.
              </p>
            </div>

            {contactInfo.map(({ icon: Icon, title, detail, sub, href }) => (
              <div key={title} className="contact__card">
                <div className="contact__card-icon-wrap">
                  <Icon size={20} className="contact__card-icon" />
                </div>
                <div>
                  <h3 className="contact__card-title">{title}</h3>
                  {href ? (
                    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                      className="contact__card-link">
                      {detail}
                    </a>
                  ) : (
                    <span className="contact__card-detail">{detail}</span>
                  )}
                  <p className="contact__card-sub">{sub}</p>
                </div>
              </div>
            ))}

            {/* Map embed */}
            <div className="contact__map">
              <iframe
                title="Kajabo Crafty Location"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.openstreetmap.org/export/embed.html?bbox=32.54,0.28,32.66,0.38&layer=mapnik"
                className="contact__map-frame"
              />
            </div>
            <p className="contact__map-caption">📍 Plot 14 Buganda Road, Kampala, Uganda</p>
          </div>

          {/* ── Contact Form ── */}
          <div className="contact__form-column">
            <div className="contact__form-card">
              {submitted ? (
                <div className="contact__submitted">
                  <CheckCircle size={56} className="contact__submitted-icon" />
                  <h3 className="contact__submitted-title">
                    Message Sent!
                  </h3>
                  <p className="contact__submitted-copy">
                    Thank you for reaching out. One of our team members will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn-primary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="contact__form-title">
                    Send Us a Message
                  </h2>
                  <form onSubmit={handleSubmit} noValidate className="contact__form">
                    {/* Name + Email row */}
                    <div className="contact__form-grid">
                      <div>
                        <label htmlFor="name" className="contact__label">
                          Full Name *
                        </label>
                        <input
                          id="name"
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="e.g. Nakaayi Sarah"
                          autoComplete="name"
                          className={fieldClass('name')}
                        />
                        {errors.name && <p className="contact__error">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="email" className="contact__label">
                          Email Address *
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          autoComplete="email"
                          className={fieldClass('email')}
                        />
                        {errors.email && <p className="contact__error">{errors.email}</p>}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="contact__label">
                        Subject *
                      </label>
                      <input
                        id="subject"
                        type="text"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="Cultural wear order, custom sourcing, wholesale…"
                        className={fieldClass('subject')}
                      />
                      {errors.subject && <p className="contact__error">{errors.subject}</p>}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="contact__label">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us how we can help you…"
                        className={`${fieldClass('message')} contact__textarea`}
                      />
                      {errors.message && <p className="contact__error">{errors.message}</p>}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="contact__submit"
                    >
                      {loading ? (
                        <>
                          <svg className="contact__spinner" viewBox="0 0 24 24" fill="none">
                            <circle className="contact__spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="contact__spinner-fill" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
