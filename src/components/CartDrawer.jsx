import { Link } from 'react-router-dom'
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import './CartDrawer.css'

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    subtotal,
    closeCart,
    clearCart,
    removeItem,
    updateQuantity,
    totalItems,
  } = useCart()

  return (
    <aside className={`cart-drawer ${isCartOpen ? 'cart-drawer--open' : ''}`} aria-hidden={!isCartOpen}>
      <button className="cart-drawer__backdrop" onClick={closeCart} aria-label="Close cart" />
      <div className="cart-drawer__panel" role="dialog" aria-modal="true" aria-label="Shopping cart">
        <div className="cart-drawer__header">
          <div>
            <h2 className="cart-drawer__title">Your Cart</h2>
            <p className="cart-drawer__header-copy">{totalItems} item{totalItems === 1 ? '' : 's'} ready for checkout</p>
          </div>
          <button className="cart-drawer__close" onClick={closeCart} aria-label="Close cart">
            <X size={18} />
          </button>
        </div>

        <div className="cart-drawer__content">
          {items.length === 0 ? (
            <div className="cart-drawer__empty">
              <div className="cart-drawer__empty-icon">
                <ShoppingBag size={28} />
              </div>
              <h3 className="cart-drawer__empty-title">Your cart is empty</h3>
              <p className="cart-drawer__empty-copy">Start with a handpicked African craft or a cultural clothing piece from the shop.</p>
              <Link to="/shop" className="cart-drawer__shop-link" onClick={closeCart}>
                Explore the Shop
              </Link>
            </div>
          ) : (
            <div className="cart-drawer__list">
              {items.map((item) => (
                <div key={item.id} className="cart-drawer__item">
                  <img src={item.image} alt={item.name} className="cart-drawer__image" />
                  <div className="cart-drawer__item-body">
                    <div className="cart-drawer__item-top">
                      <div>
                        <h3 className="cart-drawer__item-name">{item.name}</h3>
                        <p className="cart-drawer__item-origin">{item.origin}</p>
                      </div>
                      <button className="cart-drawer__remove" onClick={() => removeItem(item.id)} aria-label={`Remove ${item.name}`}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="cart-drawer__item-bottom">
                      <div className="cart-drawer__quantity">
                        <button className="cart-drawer__quantity-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label={`Decrease quantity of ${item.name}`}>
                          <Minus size={14} />
                        </button>
                        <span className="cart-drawer__quantity-value">{item.quantity}</span>
                        <button className="cart-drawer__quantity-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label={`Increase quantity of ${item.name}`}>
                          <Plus size={14} />
                        </button>
                      </div>
                      <div className="cart-drawer__price">${(item.price * item.quantity).toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="cart-drawer__footer">
          <div className="cart-drawer__summary">
            <span className="cart-drawer__summary-label">Subtotal</span>
            <span className="cart-drawer__summary-value">${subtotal.toFixed(2)}</span>
          </div>
          <p className="cart-drawer__note">Shipping and taxes are calculated at checkout.</p>
          <div className="cart-drawer__actions">
            <button className="cart-drawer__checkout" type="button">
              Proceed to Checkout
            </button>
            <button className="cart-drawer__clear" type="button" onClick={clearCart} disabled={items.length === 0}>
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
