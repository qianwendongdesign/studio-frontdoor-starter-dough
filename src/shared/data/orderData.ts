// Static fallback data for the post-checkout page.
// When the Python server is running, real data is fetched from /api/order/recent.

import imgHeader from '@assets/food photos/bon-vivant-qom5MPOER-I-unsplash.jpg'

export const RECENT_ORDER = {
  store: {
    name: 'Sweetgreen',
    img: imgHeader,
    logo: '',
  },
  items: [
    { name: 'Harvest Bowl',     qty: 1, price: 14.95 },
    { name: 'Guacamole Greens', qty: 1, price: 13.45 },
    { name: 'Hibiscus Limeade', qty: 2, price: 4.95  },
  ],
  subtotal: 38.30,
  tax: 3.35,
  deliveryFee: 2.99,
  tip: 6.89,
  total: 51.53,
  eta: '25 min',
  status: 'Preparing your order',
}
