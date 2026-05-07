const ITEM_POOL = [
  'Signature Bowl',
  'House Salad',
  'Garlic Fries',
  'Crispy Tenders',
  'Sesame Noodles',
  'Avocado Toast',
  'Spicy Tacos',
  'Margherita Slice',
  'Veggie Wrap',
  'Loaded Burrito',
  'Chicken Caesar',
  'Falafel Plate',
]

function hash(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h + s.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

export function makeDraftItemNames(seed: string, count: number): string[] {
  const offset = hash(seed) % ITEM_POOL.length
  return Array.from({ length: count }, (_, i) => ITEM_POOL[(offset + i) % ITEM_POOL.length])
}
