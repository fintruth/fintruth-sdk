declare module '@reach/menu-button' {
  import {
    ComponentType,
    CSSProperties,
    FunctionComponent,
    HTMLProps,
    KeyboardEvent,
    MouseEvent,
    ReactElement,
    ReactNode,
  } from 'react'

  export type MenuButtonProps = {
    children?: ReactNode
    onClick?: (e: MouseEvent<HTMLElement>) => void
    onKeyDown?: (e: KeyboardEvent<HTMLElement>) => void
  } & HTMLProps<HTMLButtonElement>

  export type MenuItemProps = {
    _ref?: (node: HTMLElement) => void
    index?: number
    onClick?: (e: MouseEvent<HTMLElement>) => void
    onKeyDown?: (e: KeyboardEvent<HTMLElement>) => void
    onMouseMove?: (e: MouseEvent<HTMLElement>) => void
    onSelect?: () => void
    role?: string
    setState?: (s: State) => Partial<State>
    state?: State
  } & HTMLProps<HTMLDivElement>

  export type MenuLinkProps<
    T extends SupportedMenuLinkComponent
  > = ResolvedMenuLinkProps<T> & {
    _ref?: (node: HTMLElement) => void
    as?: any
    component?: ResolvedMenuLinkComponent<T>
    index?: number
    onClick?: (e: MouseEvent<HTMLElement>) => void
    onKeyDown?: (e: KeyboardEvent<HTMLElement>) => void
    setState?: (s: State) => Partial<State>
    state?: State
    style?: CSSProperties
    to?: string
  }

  export type MenuListProps = JSX.IntrinsicElements['div'] & {
    children?: ReactNode
  }

  export type ResolvedMenuLinkComponent<
    T
  > = T extends keyof JSX.IntrinsicElements ? T : ComponentType<T>

  export type ResolvedMenuLinkProps<T> = T extends keyof JSX.IntrinsicElements
    ? JSX.IntrinsicElements[T]
    : T

  export type SupportedMenuLinkComponent = object | keyof JSX.IntrinsicElements

  export interface ButtonRect {
    height: number
    left: number
    top: number
    width: number
  }

  export interface State {
    buttonId: string
    buttonRect: undefined | ButtonRect
    closingWithClick: boolean
    isOpen: boolean
    selectionIndex: number
  }

  export interface MenuProps {
    children?: ReactNode
  }

  export const Menu: FunctionComponent<MenuProps>
  export const MenuButton: FunctionComponent<MenuButtonProps>
  export const MenuItem: FunctionComponent<MenuItemProps>
  export const MenuList: FunctionComponent<MenuListProps>

  export function MenuLink<T extends SupportedMenuLinkComponent>(
    props: MenuLinkProps<T>
  ): ReactElement<MenuLinkProps<T>>
}
