/**
 * Stub components that mirror @doordash/prism-react API.
 * Replace with real Prism when you have registry access:
 *   npm install @doordash/prism-react
 * and change main.tsx/App imports to use '@doordash/prism-react'.
 */

import type { ReactNode, ButtonHTMLAttributes } from 'react'

// PrismConfig
export function PrismConfig({ children }: { children: ReactNode }) {
  return <>{children}</>
}

// ButtonType
export const ButtonType = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
  flatPrimary: 'flatPrimary',
  secondaryPill: 'secondaryPill',
} as const

// ButtonSize
export const ButtonSize = {
  Small: 'small',
  Medium: 'medium',
  Large: 'large',
} as const

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  type?: (typeof ButtonType)[keyof typeof ButtonType]
  size?: (typeof ButtonSize)[keyof typeof ButtonSize]
  isDisabled?: boolean
  isToggleable?: boolean
  isToggled?: boolean
  children: ReactNode
  style?: React.CSSProperties
}

export function Button({
  type: buttonType = ButtonType.primary,
  size = ButtonSize.Medium,
  isDisabled,
  children,
  style,
  ...rest
}: ButtonProps) {
  const isTertiary = buttonType === ButtonType.tertiary
  const isSmall = size === ButtonSize.Small
  return (
    <button
      type="button"
      disabled={isDisabled}
      style={{
        padding: isSmall ? '2px 12px' : '8px 16px',
        fontSize: isSmall ? 14 : 16,
        fontWeight: 500,
        border: '1px solid #f1f1f1',
        borderRadius: 9999,
        background: isTertiary ? '#f1f1f1' : '#eb1700',
        color: isTertiary ? '#191919' : '#fff',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        opacity: isDisabled ? 0.6 : 1,
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  )
}

// IconButtonType
export const IconButtonType = {
  primary: 'primary',
  secondary: 'secondary',
  tertiary: 'tertiary',
} as const

// IconButtonIconType – common icon names
export const IconButtonIconType = {
  search: 'search',
  arrowRight: 'arrowRight',
  chevronRight: 'chevronRight',
  bell: 'bell',
  person: 'person',
  cart: 'cart',
} as const

interface IconButtonProps {
  iconType: (typeof IconButtonIconType)[keyof typeof IconButtonIconType]
  type?: (typeof IconButtonType)[keyof typeof IconButtonType]
  accessibilityLabel: string
  onClick?: () => void
  style?: React.CSSProperties
  isRaised?: boolean
}

const ICON_SYMBOLS: Record<string, string> = {
  search: '🔍',
  arrowRight: '→',
  chevronRight: '›',
  bell: '🔔',
  person: '👤',
  cart: '🛒',
}

export function IconButton({
  iconType,
  type = IconButtonType.tertiary,
  accessibilityLabel,
  onClick,
  style,
}: IconButtonProps) {
  const symbol = ICON_SYMBOLS[iconType] ?? '·'
  return (
    <button
      type="button"
      aria-label={accessibilityLabel}
      onClick={onClick}
      style={{
        width: 32,
        height: 32,
        padding: 0,
        border: 'none',
        borderRadius: '50%',
        background: type === 'tertiary' ? '#f1f1f1' : 'transparent',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 16,
        ...style,
      }}
    >
      {symbol}
    </button>
  )
}

// TagType
export const TagType = {
  informational: 'informational',
  highlight: 'highlight',
} as const

// TagStyle
export const TagStyle = {
  default: 'default',
  emphasis: 'emphasis',
} as const

interface TagProps {
  text: string
  tagType?: (typeof TagType)[keyof typeof TagType]
  tagStyle?: (typeof TagStyle)[keyof typeof TagStyle]
  size?: 'small' | 'medium'
}

export function Tag({ text, tagType = TagType.informational }: TagProps) {
  const isHighlight = tagType === TagType.highlight
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 4px',
        borderRadius: 4,
        fontSize: 12,
        fontWeight: 700,
        background: isHighlight ? '#fff0ed' : '#f1f1f1',
        color: isHighlight ? '#eb1700' : '#191919',
      }}
    >
      {text}
    </span>
  )
}
