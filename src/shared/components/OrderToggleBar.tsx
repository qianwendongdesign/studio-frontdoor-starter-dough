import { useState } from 'react'
import { InfoLineIcon16, DashPassIcon } from '@shared/icons/icons'

type OrderMode = 'delivery' | 'pickup'

export interface OrderToggleBarProps {
  deliveryFee?: string
  deliveryTime?: string
  pricingLabel?: string
}

export function OrderToggleBar({
  deliveryFee = '$0 delivery fee on $12+',
  deliveryTime = '14 min',
  pricingLabel = 'pricing & fees',
}: OrderToggleBarProps) {
  const [mode, setMode] = useState<OrderMode>('delivery')

  return (
    <div className="order-toggle-bar">
      <div className="order-toggle-controls">
        <div className="order-toggle-group">
          <button
            className={`order-toggle-btn ${mode === 'delivery' ? 'order-toggle-btn--active' : ''}`}
            onClick={() => setMode('delivery')}
          >
            Delivery
          </button>
          <button
            className={`order-toggle-btn ${mode === 'pickup' ? 'order-toggle-btn--active' : ''}`}
            onClick={() => setMode('pickup')}
          >
            Pickup
          </button>
        </div>
        <button className="order-toggle-group-btn">Group Order</button>
      </div>

      <div className="order-toggle-info">
        <div className="order-toggle-info-col">
          <div className="order-toggle-fee-line">
            <span className="order-toggle-dashpass"><DashPassIcon /></span>
            <span className="order-toggle-fee-text">{deliveryFee}</span>
          </div>
          <button className="order-toggle-pricing">
            <span>{pricingLabel}</span>
            <InfoLineIcon16 />
          </button>
        </div>
        <div className="order-toggle-divider" />
        <div className="order-toggle-info-col">
          <span className="order-toggle-time">{deliveryTime}</span>
          <span className="order-toggle-time-label">delivery time</span>
        </div>
      </div>
    </div>
  )
}
