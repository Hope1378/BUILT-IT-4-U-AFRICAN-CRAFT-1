import { useEffect } from 'react'
import { X, ZoomIn } from 'lucide-react'
import './ImageModal.css'

export default function ImageModal({ isOpen, image, alt, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="image-modal__backdrop" onClick={onClose}>
      <div className="image-modal__container">
        <button
          className="image-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <img
          src={image}
          alt={alt}
          className="image-modal__image"
        />
        <div className="image-modal__info">
          <p className="image-modal__alt">{alt}</p>
        </div>
      </div>
    </div>
  )
}
