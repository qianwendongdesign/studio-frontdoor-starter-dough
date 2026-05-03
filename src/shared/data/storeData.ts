// Placeholder data — run `python3 scripts/fetch_stores.py` to replace with real Snowflake data.
// After running the script, this file will be overwritten with real store images and metadata.

import imgBon        from '@assets/food photos/bon-vivant-qom5MPOER-I-unsplash.jpg'
import imgPaulo      from '@assets/food photos/paulo-doi-6uTQmtqcAzs-unsplash.jpg'
import imgShashi     from '@assets/food photos/shashi-chaturvedula-jEjCqbVt_bI-unsplash.jpg'
import imgYoav       from '@assets/food photos/yoav-aziz-AiHJiRCwB3w-unsplash.jpg'
import imgChristopher from '@assets/food photos/christopher-alvarenga-5uYH4yTDp34-unsplash.jpg'
import imgImad       from '@assets/food photos/imad-786-n5I4Ix008-0-unsplash.jpg'
import imgCrunch     from '@assets/food photos/crunch-xzT7w8paUr4-unsplash.jpg'
import imgMontatip   from '@assets/food photos/montatip-lilitsanong-iU26ZSJh9yw-unsplash.jpg'

// STORES[0..5]  → "Chicken and rice bowls" carousel
// STORES[6..11] → "Shawarma wrap" carousel
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const STORES: any[] = [
  { name: 'Sizzle & Crunch',    rating: '4.8', time: '32 min', dist: '0.6 mi', fee: '$3.99 delivery fee', tag: '$4 off on $25+',       img: imgBon,         logo: '' },
  { name: 'Palmita',            rating: '4.8', time: '32 min', dist: '0.6 mi', fee: '$3.99 delivery fee', tag: '',                      img: imgPaulo,       logo: '' },
  { name: 'Flame Broiler',      rating: '4.7', time: '25 min', dist: '0.8 mi', fee: '$2.99 delivery fee', tag: '15% off, up to $4',     img: imgShashi,      logo: '' },
  { name: 'Waba Grill',         rating: '4.5', time: '30 min', dist: '1.2 mi', fee: '$3.99 delivery fee', tag: '',                      img: imgYoav,        logo: '' },
  { name: 'Teriyaki Madness',   rating: '4.6', time: '28 min', dist: '0.9 mi', fee: '$1.99 delivery fee', tag: '$5 off on $30+',        img: imgBon,         logo: '' },
  { name: 'Rice & Bowls',       rating: '4.9', time: '20 min', dist: '0.4 mi', fee: '$2.99 delivery fee', tag: '',                      img: imgPaulo,       logo: '' },

  { name: "Shawarma 'N Hummus", rating: '4.8', time: '32 min', dist: '0.6 mi', fee: '$3.99 delivery fee', tag: '25% off select items',  img: imgChristopher, logo: '' },
  { name: 'Abu Salim Mi',       rating: '4.8', time: '32 min', dist: '0.6 mi', fee: '$3.99 delivery fee', tag: '20% off, up to $5',     img: imgImad,        logo: '' },
  { name: 'Mediterranean Grill',rating: '4.7', time: '35 min', dist: '1.1 mi', fee: '$3.99 delivery fee', tag: '$3 off on $20+',        img: imgCrunch,      logo: '' },
  { name: 'Zankou Chicken',     rating: '4.9', time: '22 min', dist: '0.5 mi', fee: '$1.99 delivery fee', tag: '',                      img: imgMontatip,    logo: '' },
  { name: 'Pita Palace',        rating: '4.6', time: '28 min', dist: '0.7 mi', fee: '$2.99 delivery fee', tag: 'Buy 1, get 1 free',     img: imgChristopher, logo: '' },
  { name: 'Falafel Corner',     rating: '4.4', time: '30 min', dist: '1.3 mi', fee: '$3.99 delivery fee', tag: '15% off select items',  img: imgImad,        logo: '' },
]
