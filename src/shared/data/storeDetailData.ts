// Static fallback data for the store detail page.
// When the Python server is running, real data is fetched from /api/store/<id>.

import imgHeader from '@assets/food photos/bon-vivant-qom5MPOER-I-unsplash.jpg'
import logoSweetgreen from '@assets/logos/sweetgreen.jpeg'
import customerPhoto1 from '@assets/food photos/eiliv-aceron-5nvt9BrLaAc-unsplash.jpg'
import customerPhoto2 from '@assets/food photos/taylor-kiser-EvoIiaIVRzU-unsplash.jpg'
import imgChickenSalad from '@assets/food photos/eiliv-aceron-tcO50kQxQg4-unsplash.jpg'
import imgChickenSandwich from '@assets/food photos/christopher-alvarenga-5uYH4yTDp34-unsplash.jpg'
import imgLambSalad from '@assets/food photos/calum-lewis-8Nc_oQsc2qQ-unsplash.jpg'
import imgLambSandwich from '@assets/food photos/calum-lewis-rPkgYDh2bmo-unsplash.jpg'
import imgHarvestBowl from '@assets/food photos/luisa-brimble-vIm26fn_QKg-unsplash.jpg'
import imgGuacGreens from '@assets/food photos/monika-grabkowska-FVf1ESEBuMI-unsplash.jpg'
import imgKaleCaesar from '@assets/food photos/drew-taylor-jFu2L04tMBc-unsplash.jpg'
import imgCrispyRice from '@assets/food photos/cloris-ying-rmdo8r9iGfw-unsplash.jpg'
import imgMisoSalmon from '@assets/food photos/derek-duran-Jz4QMhLvGgw-unsplash.jpg'
import imgBuffaloChicken from '@assets/food photos/anthony-espinosa-InCMGusiAvA-unsplash.jpg'

export const STORE_DETAIL = {
  id: 1,
  name: 'Sweetgreen',
  description: 'Healthy salads & bowls with locally sourced ingredients',
  rating: '4.8',
  numRatings: 2400,
  time: '20 min',
  dist: '0.4 mi',
  fee: '$2.99 delivery fee',
  dashPassFee: '$0 delivery on $12+',
  address: '283 Hayes St, San Francisco',
  img: imgHeader,
  logo: logoSweetgreen,
  cuisineRank: { rank: 3, cuisine: 'Salads' },
  customerPhotos: [customerPhoto1, customerPhoto2],
  sentiment: {
    rating: '4.8',
    numRatings: '2.4K',
    cuisineRank: 3,
    cuisineLabel: 'Salads',
  },
  featuredItems: [
    { id: 101, name: 'Chicken Salad',      price: 14.00, originalPrice: 32.00, img: imgChickenSalad,     approval: null,  promoTag: 'Buy 1, get 1 free',  rankTag: null,        category: 'Featured' },
    { id: 102, name: 'Chicken Sandwich',   price: 15.00, originalPrice: null,  img: imgChickenSandwich,  approval: 92,    promoTag: null,                 rankTag: '#1 Most liked', category: 'Featured' },
    { id: 103, name: 'Lamb Salad',         price: 15.00, originalPrice: null,  img: imgLambSalad,        approval: 92,    promoTag: null,                 rankTag: '#2 Most liked', category: 'Featured' },
    { id: 104, name: 'Lamb Sandwich',      price: 15.00, originalPrice: null,  img: imgLambSandwich,     approval: 92,    promoTag: null,                 rankTag: null,        category: 'Featured' },
    { id: 105, name: 'Harvest Bowl',       price: 14.95, originalPrice: null,  img: imgHarvestBowl,      approval: 88,    promoTag: null,                 rankTag: null,        category: 'Vegetarian' },
    { id: 106, name: 'Guacamole Greens',   price: 13.45, originalPrice: null,  img: imgGuacGreens,       approval: 95,    promoTag: null,                 rankTag: '#1 Most liked', category: 'Vegetarian' },
    { id: 107, name: 'Kale Caesar',        price: 12.95, originalPrice: null,  img: imgKaleCaesar,       approval: 90,    promoTag: null,                 rankTag: null,        category: 'Healthier' },
    { id: 108, name: 'Crispy Rice Bowl',   price: 15.45, originalPrice: null,  img: imgCrispyRice,       approval: 87,    promoTag: null,                 rankTag: null,        category: 'Healthier' },
    { id: 109, name: 'Miso Glazed Salmon', price: 16.95, originalPrice: null,  img: imgMisoSalmon,       approval: 91,    promoTag: null,                 rankTag: null,        category: 'High protein' },
    { id: 110, name: 'Buffalo Chicken',    price: 14.45, originalPrice: null,  img: imgBuffaloChicken,   approval: 89,    promoTag: null,                 rankTag: null,        category: 'High protein' },
  ],
  menu: [
    { id: 1, name: 'Harvest Bowl',           price: 14.95, description: 'Roasted chicken, sweet potatoes, apples, goat cheese, warm wild rice.',            category: 'Popular Items', img: imgHarvestBowl,     approval: 99, tag: '25% off',       label: 'Picked for you' },
    { id: 2, name: 'Guacamole Greens',       price: 13.45, description: 'Avocado, black beans, tomatoes, tortilla chips, lime cilantro jalapeño vinaigrette.', category: 'Popular Items', img: imgGuacGreens,  approval: 99, tag: '#1 Most Liked', label: null },
    { id: 3, name: 'Kale Caesar',            price: 12.95, description: 'Shredded kale, parmesan crisps, tomatoes, lime squeeze, caesar dressing.',          category: 'Salads',        img: imgKaleCaesar,      approval: 99, tag: null,            label: 'Ordered 1/2/24' },
    { id: 4, name: 'Chicken Pesto Parm',     price: 14.95, description: 'Roasted chicken, spicy broccoli, tomatoes, shaved parmesan, pesto vinaigrette.',    category: 'Bowls',         img: imgChickenSandwich, approval: 99, tag: null,            label: 'Picked for you' },
    { id: 5, name: 'Buffalo Chicken Bowl',   price: 14.45, description: 'Blackened chicken, pickled onions, blue cheese, warm wild rice, buffalo sauce.',     category: 'Bowls',         img: imgBuffaloChicken,  approval: 99, tag: null,            label: null },
    { id: 6, name: 'Crispy Rice Bowl',       price: 15.45, description: 'Crispy rice, roasted tofu, raw carrots, shredded cabbage, spicy cashew dressing.',  category: 'Bowls',         img: imgCrispyRice,      approval: 99, tag: null,            label: null },
  ],
}
