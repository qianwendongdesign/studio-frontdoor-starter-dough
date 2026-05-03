/**
 * CustomPillRow — horizontally scrollable row of filter pills.
 *
 * Preview: assets/component-previews/custom-chip-row.png
 *
 * Built on @doordash/prism-react Button (tertiary, small, isToggleable).
 * Custom styling: white background, gray border, DashPass brand teal icon.
 * For use in Prism-based templates only (requires PrismShell).
 *
 * Usage:
 *   import { CustomPillRow } from '@shared/components/prism/CustomPillRow'
 *   <CustomPillRow pills={[
 *     { label: 'DashPass', leadingIcon: ButtonIconType.LogoDashpassNew, isDashPass: true },
 *     { label: 'Offers', leadingIcon: ButtonIconType.DealsFill },
 *     { label: 'Ratings', leadingIcon: ButtonIconType.StarFill, trailingIcon: ButtonIconType.ChevronDown },
 *   ]} />
 */
import styled from 'styled-components'
import {
  Button,
  ButtonType,
  ButtonSize,
  ButtonIconType,
} from '@doordash/prism-react'

type ButtonIconTypeValue = (typeof ButtonIconType)[keyof typeof ButtonIconType]

export interface PillConfig {
  label: string
  leadingIcon?: ButtonIconTypeValue
  trailingIcon?: ButtonIconTypeValue
  isDashPass?: boolean
}

interface CustomPillRowProps {
  pills: PillConfig[]
  onToggle?: (index: number, toggled: boolean) => void
}

export function CustomPillRow({ pills, onToggle }: CustomPillRowProps) {
  return (
    <Row>
      {pills.map((pill, i) => (
        <PillWrap key={pill.label} $isDashPass={pill.isDashPass}>
          <Button
            type={ButtonType.tertiary}
            size={ButtonSize.small}
            isInline
            leadingIcon={pill.leadingIcon}
            trailingIcon={pill.trailingIcon}
            isToggleable
            isToggled={false}
            onClick={() => onToggle?.(i, true)}
          >
            {pill.label}
          </Button>
        </PillWrap>
      ))}
    </Row>
  )
}

const Row = styled.div`
  display: flex;
  gap: 8px;
  padding: 16px 16px 4px;
  overflow-x: auto;
  background: white;
  &::-webkit-scrollbar { display: none; }
  scrollbar-width: none;

  button {
    background: white !important;
    border: 1px solid #d6d6d6 !important;
    flex-shrink: 0 !important;
    width: auto !important;
    min-width: 0 !important;
  }
`

const PillWrap = styled.div<{ $isDashPass?: boolean }>`
  flex-shrink: 0;

  ${p => p.$isDashPass && `
    button svg {
      color: #00838A !important;
    }
  `}
`
