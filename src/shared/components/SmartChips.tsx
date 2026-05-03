import { useDragToScroll } from '@shared/hooks/useDragToScroll'

import logoSweetgreen from '@assets/logos/sweetgreen.jpeg'
import logoChipotle   from '@assets/logos/chipotle.jpg'

import iconHealthy from '@assets/cuisines/Type=Healthy.svg'
import iconFastFood from '@assets/cuisines/Type=Fast Food.svg'
import iconPizza from '@assets/cuisines/Type=Pizza.svg'
import iconThai from '@assets/cuisines/Type=Thai.svg'
import iconNoodles from '@assets/cuisines/Type=Noodles.svg'
import iconSushi from '@assets/cuisines/Type=Sushi.svg'
import iconBiryani from '@assets/cuisines/Type=Biryani.svg'
import iconTacos from '@assets/cuisines/Type=Tacos.svg'
import iconSandwiches from '@assets/cuisines/Type=Sandwiches.svg'
import iconSalad from '@assets/cuisines/Type=Salad.svg'
import iconSoup from '@assets/cuisines/Type=Soup.svg'
import iconBurgers from '@assets/cuisines/Type=Burgers.svg'
import iconRamen from '@assets/cuisines/Type=Ramen.svg'
import iconIceCream from '@assets/cuisines/Type=Ice Cream.svg'
import iconWrap from '@assets/cuisines/Type=Wrap.svg'
import iconFriedRice from '@assets/cuisines/Type=Fried Rice.svg'
import iconCoffee from '@assets/cuisines/Type=Coffee.svg'
import iconDonuts from '@assets/cuisines/Type=Donuts.svg'

const CHIP_ROW_1 = [
  { label: 'Sweetgreen', img: logoSweetgreen, isAvatar: true },
  { label: 'Chipotle',   img: logoChipotle,   isAvatar: true },
  { label: 'Healthy', img: iconHealthy },
  { label: 'Fast food', img: iconFastFood },
  { label: 'Pizza', img: iconPizza },
  { label: 'Thai', img: iconThai },
  { label: 'Pho', img: iconNoodles },
  { label: 'Sushi', img: iconSushi },
  { label: 'Indian', img: iconBiryani },
  { label: 'Mexican', img: iconTacos },
]

const CHIP_ROW_2 = [
  { label: 'Chicken and rice bowl', img: iconFriedRice },
  { label: 'Shawarma wrap', img: iconWrap },
  { label: 'Coffee', img: iconCoffee },
  { label: 'Sandwiches', img: iconSandwiches },
  { label: 'Salads', img: iconSalad },
  { label: 'Soup', img: iconSoup },
  { label: 'Burgers', img: iconBurgers },
  { label: 'Ramen', img: iconRamen },
  { label: 'Ice cream', img: iconIceCream },
  { label: 'Donuts', img: iconDonuts },
]

function ChipButton({ label, img, isAvatar }: { label: string; img: string; isAvatar?: boolean }) {
  return (
    <button className="chip">
      <img
        src={img}
        alt=""
        className={isAvatar ? 'chip-avatar' : 'chip-icon'}
        draggable={false}
      />
      {label}
    </button>
  )
}

interface SmartChipsProps {
  greeting?: string
}

export function SmartChips({ greeting }: SmartChipsProps) {
  const scrollRef = useDragToScroll()

  return (
    <div style={{ marginBottom: 24 }}>
      <h2 className="greeting">{greeting ?? 'Time for dinner, Liam?'}</h2>
      <div className="chip-grid-scroll" ref={scrollRef}>
        <div className="chip-row">
          {CHIP_ROW_1.map((chip) => (
            <ChipButton key={`r1-${chip.label}`} {...chip} />
          ))}
        </div>
        <div className="chip-row">
          {CHIP_ROW_2.map((chip) => (
            <ChipButton key={`r2-${chip.label}`} {...chip} />
          ))}
        </div>
      </div>
    </div>
  )
}
